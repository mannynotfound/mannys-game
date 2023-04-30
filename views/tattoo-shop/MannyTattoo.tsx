import {
  Dispatch,
  RefObject,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTexture } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import manny from 'manny';
import {
  BufferAttribute,
  BufferGeometry,
  Euler,
  Intersection,
  Line,
  Material,
  Mesh,
  MeshPhongMaterial,
  Object3D,
  Raycaster,
  SkinnedMesh,
  TextureLoader,
  Vector2,
  Vector3,
} from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry';
import { getTokenProps } from '@/utils';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils';
import { TattooAPIObject, TattooCoordinates } from '@/views/tattoo-shop/types';

type Props = {
  tokenId: number;
  decalTextureUrl: string;
  setTattooCoords?: Dispatch<TattooCoordinates | undefined>;
  coordinates?: TattooCoordinates;
  position: number[];
  controlsRef: RefObject<OrbitControlsImpl>;
  existing?: TattooAPIObject[];
};

type IntersectionRef = {
  intersects: boolean;
  point: Vector3;
  normal: Vector3;
};

const MannyTattoo = ({
  tokenId,
  decalTextureUrl,
  setTattooCoords,
  coordinates,
  position = [0, 0, 0],
  controlsRef,
  existing,
}: Props) => {
  const { scene, gl, camera } = useThree();
  const domElement = gl.domElement;
  const [mesh, setMesh] = useState<Mesh>();
  const textureUrl = getTokenProps(tokenId)?.textureUrl;
  const ogManny = manny({
    // TODO: figure out why 3.0.0 model doesnt work with .pose()
    modelPath: 'https://d2tm2f4d5v0kas.cloudfront.net/Manny.fbx',
    textureUrl,
  });

  // make a new fbx clone of manny model, resetting any animation pose
  const mannyObj = useMemo(() => {
    const _clone = clone(ogManny);

    _clone.name = `tattoo-${tokenId}`;

    _clone.traverse((child: Object3D) => {
      const skinnedChild = child as SkinnedMesh;
      if (skinnedChild.isSkinnedMesh) {
        skinnedChild.pose();
      }
    });

    return _clone;
  }, [ogManny, tokenId]);

  // set "mesh" in state to be the body mesh of manny model
  useEffect(() => {
    if (!mannyObj?.children) {
      return;
    }
    const body = mannyObj.children.find((c) =>
      c.name.startsWith('DGSOH_45544')
    );
    setMesh(body as Mesh);
  }, [mannyObj?.children]);

  // used for the mouse helper box to visualize tattoo placement
  const bufferRef = useRef<BufferGeometry>(new BufferGeometry());
  useLayoutEffect(() => {
    if (bufferRef.current) {
      bufferRef.current.setFromPoints([new Vector3(), new Vector3()]);
    }
  }, []);

  // these are used when placing a new tattoo
  const decals = useRef<Mesh[]>([]);
  const decalTexture = useTexture(decalTextureUrl);
  const initialSize = 10;
  const maxTattooSize = useRef(20);
  const size = useRef(new Vector3(initialSize, initialSize, initialSize));
  const tattooPosition = useRef(new Vector3());
  const orientation = useRef(new Euler());
  const tattooSet = useRef(false);
  const moved = useRef(false);
  const lineRef = useRef<Line>();
  const mouseHelperRef = useRef<Mesh>();
  const mouseRef = useRef(new Vector2());
  const raycasterRef = useRef(new Raycaster());
  const intersects = useRef<Intersection<Object3D>[]>([]);
  const intersection = useRef<IntersectionRef>({
    intersects: false,
    point: new Vector3(),
    normal: new Vector3(),
  });

  // create decal material which acts as our tattoo
  const decalMaterial = useMemo(
    () =>
      new MeshPhongMaterial({
        map: decalTexture,
        normalScale: new Vector2(1, 1),
        transparent: true,
        depthTest: true,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -4,
        wireframe: false,
      }),
    [decalTexture]
  );

  const setSize = (w: number, h: number) => {
    const proportion = w / h;
    if (proportion < 1) {
      size.current.set(
        maxTattooSize.current * proportion,
        maxTattooSize.current,
        maxTattooSize.current
      );
    } else {
      size.current.set(
        maxTattooSize.current,
        maxTattooSize.current * (h / w),
        maxTattooSize.current
      );
    }
  };

  const resetTattoo = () => {
    tattooSet.current = false;
    decals.current.forEach((decal) => scene.remove(decal));
    decals.current = [];
  };

  const resizeTat = () => {
    if (!decals.current.length || mesh === undefined) return;

    const activeDecal = decals.current[0];
    const material = (activeDecal.material as Material).clone();
    const meshPhongMat = activeDecal.material as MeshPhongMaterial;
    if (meshPhongMat?.map?.image === undefined) {
      return;
    }
    const { height, width } = meshPhongMat?.map?.image;
    setSize(width, height);
    decals.current.forEach((decal) => scene.remove(decal));
    const m = new Mesh(
      new DecalGeometry(
        mesh,
        tattooPosition.current,
        orientation.current,
        size.current
      ),
      material
    );

    setTattooCoords?.({
      position: tattooPosition.current,
      orientation: orientation.current,
      size: size.current,
    });
    decals.current.push(m);
    scene.add(m);
  };

  // place new tattoo or reset position of current tattoo
  const shoot = () => {
    if (
      !mesh ||
      mouseHelperRef?.current === undefined ||
      decalMaterial.map === null
    ) {
      return;
    }
    if (tattooSet.current) resetTattoo();

    tattooPosition.current.copy(intersection.current.point);
    orientation.current.copy(mouseHelperRef.current.rotation);
    const { height, width } = decalMaterial.map.image;
    setSize(width, height);

    const material = decalMaterial.clone();
    const m = new Mesh(
      new DecalGeometry(
        mesh,
        tattooPosition.current,
        orientation.current,
        size.current
      ),
      material
    );

    setTattooCoords?.({
      position: tattooPosition.current,
      orientation: orientation.current,
      size: size.current,
    });

    decals.current.push(m);
    scene.add(m);
    tattooSet.current = true;
  };

  const checkIntersection = (x: number, y: number) => {
    if (!mesh || lineRef.current === undefined) return;

    mouseRef.current.x = (x / domElement.clientWidth) * 2 - 1;
    mouseRef.current.y = -(y / domElement.clientHeight) * 2 + 1;

    raycasterRef.current.setFromCamera(mouseRef.current, camera);
    raycasterRef.current.intersectObject(mesh, false, intersects.current);

    if (intersects.current.length > 0) {
      const p = intersects.current[0].point;

      mouseHelperRef?.current?.position.copy(p);
      intersection.current.point.copy(p);

      const n = intersects.current[0].face?.normal.clone();
      if (n === undefined) {
        return console.warn('Couldnt get interesection face normal clone :(');
      }
      n.transformDirection(mesh.matrixWorld);
      n.multiplyScalar(10);
      n.add(intersects.current[0].point);

      const faceNormal = intersects.current?.[0].face?.normal;
      if (faceNormal === undefined) {
        return console.warn('Couldnt get interesection face normal :(');
      }
      intersection.current.normal.copy(faceNormal);
      mouseHelperRef.current?.lookAt(n);

      const positions = lineRef.current.geometry.attributes.position;
      (positions as BufferAttribute).setXYZ(0, p.x, p.y, p.z);
      (positions as BufferAttribute).setXYZ(1, n.x, n.y, n.z);

      intersection.current.intersects = true;
      intersects.current.length = 0;
    } else {
      intersection.current.intersects = false;
    }
  };

  const onPointerMove = (event: PointerEvent) => {
    if (event.isPrimary && event.target instanceof Element) {
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      checkIntersection(x, y);
    }
  };

  const onControlsChange = () => {
    moved.current = true;
  };

  const onPointerDown = () => {
    moved.current = false;
  };

  const onPointerUp = (event: PointerEvent) => {
    if (!moved.current && event.target instanceof Element) {
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      checkIntersection(x, y);
      if (intersection.current.intersects) shoot();
    }
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === 'z') {
      resetTattoo();
      setTattooCoords?.(undefined);
    }

    if (event.key === 'Subtract' || event.key === '-') {
      maxTattooSize.current = Math.max(10, maxTattooSize.current - 1);
      resizeTat();
    }
    if (event.key === 'Add' || event.key === '+') {
      maxTattooSize.current = Math.min(40, maxTattooSize.current + 1);
      resizeTat();
    }
  };

  // this useEffect adds listeners for tattoo editing if setTattooCoords passed
  useEffect(() => {
    if (!setTattooCoords || !mesh) return;
    const ctrlRef = controlsRef?.current;

    domElement.addEventListener('pointermove', onPointerMove);
    ctrlRef?.addEventListener('change', onControlsChange);
    domElement.addEventListener('pointerdown', onPointerDown);
    domElement.addEventListener('pointerup', onPointerUp);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      domElement.removeEventListener('pointermove', onPointerMove);
      domElement.removeEventListener('pointerdown', onPointerDown);
      domElement.removeEventListener('pointerup', onPointerDown);
      ctrlRef?.removeEventListener('change', onControlsChange);
      document.removeEventListener('keydown', onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domElement, mesh, controlsRef?.current, setTattooCoords]);

  // this useEffect will take passed in coordinates and load the tattoo in with no editing
  useEffect(() => {
    if (!coordinates || !mesh || decalMaterial?.map?.image === undefined)
      return;
    const { height, width } = decalMaterial.map.image;
    setSize(width, height);

    const material = decalMaterial.clone();
    const { position: cPos, orientation: cOrient, size: cSize } = coordinates;
    const posVec = new Vector3(cPos.x, cPos.y, cPos.z);
    const orEuler = new Euler(cOrient.x, cOrient.y, cOrient.z, 'XYZ');
    const sizeVec = new Vector3(cSize.x, cSize.y, cSize.z);
    const m = new Mesh(
      new DecalGeometry(mesh, posVec, orEuler, sizeVec),
      material
    );

    decals.current.push(m);
    scene.add(m);
    tattooSet.current = true;
  }, [coordinates, mesh, scene, decalMaterial]);

  useEffect(() => {
    if (!existing?.length || !mesh) return;

    const loader = new TextureLoader();
    existing.forEach((existingTat) => {
      loader.load(
        existingTat.tattoo_url,
        (texture) => {
          const material = decalMaterial.clone();
          material.map = texture;
          const existingCords = JSON.parse(existingTat.coordinates);
          const {
            position: ePos,
            orientation: eOrient,
            size: eSize,
          } = existingCords;
          const posVec = new Vector3(ePos.x, ePos.y, ePos.z);
          const orEuler = new Euler(eOrient.x, eOrient.y, eOrient.z, 'XYZ');
          const sizeVec = new Vector3(eSize.x, eSize.y, eSize.z);
          const m = new Mesh(
            new DecalGeometry(mesh, posVec, orEuler, sizeVec),
            material
          );

          scene.add(m);
        },
        undefined,
        (err) => {
          console.error('Error loading existing tattoo', err);
        }
      );
    });
  }, [existing, mesh, decalMaterial, scene]);

  return (
    <>
      <group position={new Vector3(...position)}>
        <primitive object={mannyObj} dispose={null} />
      </group>
      {setTattooCoords !== undefined && (
        <>
          {/* TODO: clean these refs up */}
          {/* eslint-disable @typescript-eslint/ban-ts-comment*/}
          {/* @ts-ignore */}
          <mesh ref={mouseHelperRef} dispose={null}>
            <boxGeometry args={[1, 1, 10]} />
            <meshNormalMaterial attach="material" />
          </mesh>
          {/* @ts-ignore */}
          <line ref={lineRef}>
            {/* @ts-ignore */}
            <bufferGeometry attach="geometry" ref={bufferRef} />
          </line>
        </>
      )}
    </>
  );
};

export default MannyTattoo;
