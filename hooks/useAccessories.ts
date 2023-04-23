// TODO: bake a lot of this functionality into Manny module
import { useEffect, useMemo } from 'react';
import { useFBX } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { Mesh, MeshPhongMaterial, Object3D } from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import type { Offset, Slot } from '@/fixtures/accessories';
import { allAccessories, slot2BoneMap, slots } from '@/fixtures/accessories';
import { MODELS_HOST } from '@/utils/constants';

// cache for loaded models
const accessoryModels: {
  [accessoryId: string]: {
    model: Object3D;
    slot: Slot;
  };
} = {};

export default function useAccessories(
  mannyObj: Object3D,
  accessories?: {
    [slot: string]: string[];
  },
  datData?: Offset
) {
  const selectedAccessories = Object.values(accessories ?? {}).reduce(
    (a, b) => a.concat(b),
    [] as string[]
  );

  // load any selected accessories
  const models = useMemo(() => {
    selectedAccessories.forEach((accId) => {
      const accCfg = allAccessories.find((a) => a.id === accId);
      if (accCfg === undefined) return;

      const { offset = {}, fileName, slot } = accCfg;
      const { scale = {}, position = {}, rotation = {} } = offset;

      // TODO: remove fbx loader, rewrite to not be inside callback
      /* eslint-disable react-hooks/rules-of-hooks */
      let model;
      if (accessoryModels[accId]) {
        model = accessoryModels[accId].model;
      } else {
        model = fileName.endsWith('fbx')
          ? useFBX(`${MODELS_HOST}/${fileName}`)
          : useLoader(
              GLTFLoader,
              fileName
                ? `https://mannys-game.s3.amazonaws.com/accessories/${fileName}`
                : `${MODELS_HOST}/${accId}.glb`,
              (loader) => {
                const dracoLoader = new DRACOLoader();
                dracoLoader.setDecoderPath('/draco/gltf/');
                (loader as GLTFLoader).setDRACOLoader(dracoLoader);
              }
            ).scene;
      }

      model.position.set(
        datData?.position?.x ?? position.x ?? 0,
        datData?.position?.y ?? position.y ?? 0,
        datData?.position?.z ?? position.z ?? 0
      );
      model.rotation.set(
        datData?.rotation?.x ?? rotation.x ?? 0,
        datData?.rotation?.y ?? rotation.y ?? 0,
        datData?.rotation?.z ?? rotation.z ?? 0
      );

      // TODO: remove logic, default to 100
      const defaultScale = accCfg.fileName.endsWith('gltf') ? 100 : 1;
      model.scale.set(
        scale.x ?? defaultScale,
        scale.y ?? defaultScale,
        scale.z ?? defaultScale
      );

      // TODO: remove
      if (accCfg.textureUrl) {
        const texture = useLoader(
          TextureLoader,
          `${MODELS_HOST}/${accCfg.textureUrl}`
        );
        model.traverse((child) => {
          const childMesh = child as Mesh;
          if (childMesh.isMesh) {
            childMesh.material = new MeshPhongMaterial({ map: texture });
          }
        });
      }

      accessoryModels[accId] = {
        model,
        slot,
      };
    });

    return accessoryModels;
  }, [selectedAccessories, datData]);

  // add remove / accessories to bones as they're changed
  useEffect(() => {
    const childrenToRemove: Object3D[] = [];
    slots.forEach((slot) => {
      mannyObj.traverse((child) => {
        if (child.name.includes(`accessory-${slot}`)) {
          childrenToRemove.push(child);
        }
      });
    });

    childrenToRemove.forEach((child) => {
      child.removeFromParent();
    });

    selectedAccessories.forEach((acc) => {
      const { model, slot } = models[acc] ?? {};
      const bone = slot2BoneMap[slot];
      if (!model) {
        return;
      }
      model.name = `accessory-${slot}`;

      const mannyArm = mannyObj.children.find((c) => c.type === 'Group'); // armature will always be the group
      const name = (n: string) => (c: Object3D) => c.name === n;
      const mannyArmChildren = mannyArm?.children[0]?.children;
      const spine = mannyArmChildren
        ?.find((c) => c.name === 'Spine')
        ?.children?.find(name('Spine1'))
        ?.children?.find(name('Spine2'));

      let boneToAdd = null;
      if (bone === 'Head') {
        boneToAdd = spine?.children
          ?.find(name('Neck'))
          ?.children.find(name('Head'))
          ?.children.find(name('Head'));
      } else if (bone === 'LeftHand') {
        boneToAdd = spine?.children
          .find(name('LeftShoulder'))
          ?.children.find(name('LeftArm'))
          ?.children.find(name('LeftForeArm'))
          ?.children.find(name('LeftHand'))
          ?.children.find(name('LeftHand'));
      } else if (bone === 'RightHand') {
        boneToAdd = spine?.children
          .find(name('RightShoulder'))
          ?.children.find(name('RightArm'))
          ?.children.find(name('RightForeArm'))
          ?.children.find(name('RightHand'))
          ?.children.find(name('RightHand'));
      } else if (bone === 'Back') {
        boneToAdd = spine;
      }

      boneToAdd?.add(model);
    });
  }, [mannyObj, selectedAccessories, models]);

  return;
}
