import { useMemo, useRef, useLayoutEffect, useEffect, useState } from 'react';
import * as THREE from 'three';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils';
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry';
import { useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import manny from 'manny';

import { parseToken } from 'utils';

const MannyTattoo = ({
  tokenId,
  decalTextureUrl,
  setTattooPosition,
  coordinates,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  controlsRef,
  existing,
}) => {
  const { scene, gl, camera } = useThree();
  const domElement = gl.domElement;
  const [mesh, setMesh] = useState(null);
  const { textureUrl } = parseToken(tokenId);
  const ogManny = manny({
    // TODO: figure out why 3.0.0 model doesnt work with .pose()
    modelPath: 'https://d2tm2f4d5v0kas.cloudfront.net/Manny.fbx',
    textureUrl,
  });

  // make a new fbx clone of manny model, resetting any animation pose
  const mannyObj = useMemo(() => {
    const _clone = clone(ogManny);

    _clone.name = `tattoo-${tokenId}`;

    _clone.traverse((child) => {
      if (child.isSkinnedMesh) {
        child.pose();
      }
    });

    return _clone;
  }, [ogManny]);

  // set "mesh" in state to be the body mesh of manny model
  useEffect(() => {
    if (!mannyObj?.children) {
      return;
    }
    const body = mannyObj.children.find((c) =>
      c.name.startsWith('DGSOH_45544')
    );
    setMesh(body);
  }, [mannyObj?.children]);

  // used for the mouse helper box to visualize tattoo placement
  const bufferRef = useRef(new THREE.BufferGeometry());
  useLayoutEffect(() => {
    if (bufferRef.current) {
      bufferRef.current.setFromPoints([
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]);
    }
  }, []);

  // these are used when placing a new tattoo
  const decals = useRef([]);
  const decalTexture = useTexture(decalTextureUrl);
  const initialSize = 10;
  const maxTattooSize = useRef(20);
  const size = useRef(new THREE.Vector3(initialSize, initialSize, initialSize));
  const tattooPosition = useRef(new THREE.Vector3());
  const orientation = useRef(new THREE.Euler());
  const tattooSet = useRef(false);
  const moved = useRef(false);
  const lineRef = useRef();
  const mouseHelperRef = useRef();
  const mouseRef = useRef(new THREE.Vector2());
  const raycasterRef = useRef(new THREE.Raycaster());
  const intersects = useRef([]);
  const intersection = useRef({
    intersects: false,
    point: new THREE.Vector3(),
    normal: new THREE.Vector3(),
  });

  // create decal material which acts as our tattoo
  const decalMaterial = new THREE.MeshPhongMaterial({
    map: decalTexture,
    normalScale: new THREE.Vector2(1, 1),
    transparent: true,
    depthTest: true,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -4,
    wireframe: false,
  });

  const setSize = (w, h) => {
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
    if (!decals.current.length) return;

    const activeDecal = decals.current[0];
    const material = activeDecal.material.clone();
    const { height, width } = activeDecal.material.map.image;
    setSize(width, height);
    decals.current.forEach((decal) => scene.remove(decal));
    const m = new THREE.Mesh(
      new DecalGeometry(
        mesh,
        tattooPosition.current,
        orientation.current,
        size.current
      ),
      material
    );

    setTattooPosition({
      position: position.current,
      orientation: orientation.current,
      size: size.current,
    });
    decals.current.push(m);
    scene.add(m);
  };

  // place new tattoo or reset position of current tattoo
  const shoot = () => {
    if (!mesh) return;
    if (tattooSet.current) resetTattoo();

    tattooPosition.current.copy(intersection.current.point);
    orientation.current.copy(mouseHelperRef.current.rotation);
    const { height, width } = decalMaterial.map.image;
    setSize(width, height);

    const material = decalMaterial.clone();
    const m = new THREE.Mesh(
      new DecalGeometry(
        mesh,
        tattooPosition.current,
        orientation.current,
        size.current
      ),
      material
    );

    setTattooPosition({
      position: tattooPosition.current,
      orientation: orientation.current,
      size: size.current,
    });

    decals.current.push(m);
    scene.add(m);
    tattooSet.current = true;
  };

  const checkIntersection = (x, y) => {
    if (!mesh) return;

    mouseRef.current.x = (x / domElement.clientWidth) * 2 - 1;
    mouseRef.current.y = -(y / domElement.clientHeight) * 2 + 1;

    raycasterRef.current.setFromCamera(mouseRef.current, camera);
    raycasterRef.current.intersectObject(mesh, false, intersects.current);

    if (intersects.current.length > 0) {
      const p = intersects.current[0].point;

      mouseHelperRef?.current?.position.copy(p);
      intersection.current.point.copy(p);

      const n = intersects.current[0].face.normal.clone();
      n.transformDirection(mesh.matrixWorld);
      n.multiplyScalar(10);
      n.add(intersects.current[0].point);

      intersection.current.normal.copy(intersects.current[0].face.normal);
      mouseHelperRef.current.lookAt(n);

      const positions = lineRef.current.geometry.attributes.position;
      positions.setXYZ(0, p.x, p.y, p.z);
      positions.setXYZ(1, n.x, n.y, n.z);

      intersection.current.intersects = true;
      intersects.current.length = 0;
    } else {
      intersection.current.intersects = false;
    }
  };

  const onPointerMove = (event) => {
    if (event.isPrimary) {
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

  const onPointerUp = (event) => {
    if (!moved.current) {
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      checkIntersection(x, y);
      if (intersection.current.intersects) shoot();
    }
  };

  const onKeyDown = (event) => {
    if (event.ctrlKey && event.key === 'z') {
      resetTattoo();
      setTattooPosition(null);
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

  // this useEffect adds listeners for tattoo editing if setTattooPosition passed
  useEffect(() => {
    if (!setTattooPosition || !mesh) return;

    domElement.addEventListener('pointermove', onPointerMove);
    controlsRef?.current?.addEventListener('change', onControlsChange);
    domElement.addEventListener('pointerdown', onPointerDown);
    domElement.addEventListener('pointerup', onPointerUp);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      domElement.removeEventListener('pointermove', onPointerMove);
      domElement.removeEventListener('pointerdown', onPointerDown);
      domElement.removeEventListener('pointerup', onPointerDown);
      controlsRef?.current?.removeEventListener('change', onControlsChange);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [domElement, mesh, controlsRef?.current, setTattooPosition]);

  // this useEffect will take passed in coordinates and load the tattoo in with no editing
  useEffect(() => {
    if (!coordinates || !mesh) return;
    const { height, width } = decalMaterial.map.image;
    setSize(width, height);

    const material = decalMaterial.clone();
    const { position: cPos, orientation: cOrient, size: cSize } = coordinates;
    const posVec = new THREE.Vector3(cPos.x, cPos.y, cPos.z);
    const orEuler = new THREE.Euler(cOrient.x, cOrient.y, cOrient.z, 'XYZ');
    const sizeVec = new THREE.Vector3(cSize.x, cSize.y, cSize.z);
    const m = new THREE.Mesh(
      new DecalGeometry(mesh, posVec, orEuler, sizeVec),
      material
    );

    decals.current.push(m);
    scene.add(m);
    tattooSet.current = true;
  }, [coordinates, mesh]);

  useEffect(() => {
    if (!existing?.length || !mesh) return;

    const loader = new THREE.TextureLoader();
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
          const posVec = new THREE.Vector3(ePos.x, ePos.y, ePos.z);
          const orEuler = new THREE.Euler(
            eOrient.x,
            eOrient.y,
            eOrient.z,
            'XYZ'
          );
          const sizeVec = new THREE.Vector3(eSize.x, eSize.y, eSize.z);
          const m = new THREE.Mesh(
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
  }, [existing, mesh]);

  return (
    <>
      <group position={position} rotation={rotation} scale={scale}>
        <primitive object={mannyObj} dispose={null} />
      </group>
      {setTattooPosition && (
        <>
          <mesh ref={mouseHelperRef} dispose={null}>
            <boxGeometry args={[1, 1, 10]} />
            <meshNormalMaterial attach="material" />
          </mesh>
          <line ref={lineRef}>
            <bufferGeometry attach="geometry" ref={bufferRef} />
          </line>
        </>
      )}
    </>
  );
};

export default MannyTattoo;
