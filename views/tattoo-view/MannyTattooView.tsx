import { useEffect, useMemo, useState } from 'react';
import { useThree } from '@react-three/fiber';
// TODO: add types to manny module
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import manny from 'manny';
import {
  Euler,
  Mesh,
  MeshPhongMaterial,
  Object3D,
  SkinnedMesh,
  TextureLoader,
  Vector2,
  Vector3,
} from 'three';
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry';
import { getTokenProps } from '@/utils';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils';
import { TattooAPIObject } from '@/views/tattoo-shop/types';

type Props = {
  tokenId: number;
  position: number[];
  existing?: TattooAPIObject[];
};

const MannyTattooView = ({ tokenId, position, existing }: Props) => {
  const { scene } = useThree();
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
      const skinnedMesh = child as SkinnedMesh;
      if (skinnedMesh.isSkinnedMesh) {
        skinnedMesh.pose();
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

  // create decal material which acts as our tattoo
  const decalMaterial = useMemo(
    () =>
      new MeshPhongMaterial({
        normalScale: new Vector2(1, 1),
        transparent: true,
        depthTest: true,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -4,
        wireframe: false,
      }),
    []
  );

  useEffect(() => {
    if (!existing?.length || !mesh) return;

    const loader = new TextureLoader();
    existing.forEach((existingTat) => {
      loader.load(
        existingTat.tattoo_url,
        (texture) => {
          const material = decalMaterial.clone();
          material.map = texture;
          const existingCords = JSON.parse(existingTat.coordinates) || {};
          if (
            !existingCords?.position ||
            !existingCords?.orientation ||
            !existingCords?.size
          ) {
            console.log('missing coordinates for ', existingTat);
            return;
          }

          const {
            position: ePos,
            orientation: eOrient,
            size: eSize,
          } = existingCords;
          const posVec = new Vector3(ePos?.x || 0, ePos?.y || 0, ePos?.z || 0);
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
  }, [existing, mesh, scene, decalMaterial]);

  return (
    <group position={new Vector3(...position)} scale={1}>
      <primitive object={mannyObj} dispose={null} />
    </group>
  );
};

export default MannyTattooView;
