// TODO: bake a lot of this functionality into Manny module
import { useEffect, useMemo } from 'react';
import { MeshPhongMaterial, Object3D, Mesh } from 'three';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { useFBX } from '@react-three/drei';
import { MODELS_HOST } from '@/utils/constants';
import { allAccessories } from '@/fixtures/accessories';
import type { Bone, Slot } from '@/fixtures/accessories';

// cache for loaded models
const accessoryModels: {
  [accessoryId: string]: {
    object: Object3D;
    bone: Bone;
    slot: Slot;
  };
} = {};

export default function useAccessories(
  mannyObj: Object3D,
  accessories?: {
    [slot: string]: string[];
  }
) {
  const selectedAccessories = Object.values(accessories ?? {}).reduce(
    (a, b) => a.concat(b),
    [] as string[]
  );

  // load any selected accessories
  const models = useMemo(() => {
    selectedAccessories.forEach((accId) => {
      // already loaded
      if (accessoryModels[accId]) return;

      const accCfg = allAccessories.find((a) => a.id === accId);
      if (accCfg === undefined) return;

      const model =
        accCfg.format === 'glb'
          ? useLoader(GLTFLoader, `${MODELS_HOST}/${accId}.glb`, (loader) => {
              const dracoLoader = new DRACOLoader();
              dracoLoader.setDecoderPath('/draco/gltf/');
              (loader as GLTFLoader).setDRACOLoader(dracoLoader);
            }).scene
          : useFBX(`${MODELS_HOST}/${accId}.fbx`);

      let _clone = model.clone();
      const { scale = {}, offset } = accCfg.armature;
      const position = offset?.position ?? {};
      const rotation = offset?.rotation ?? {};
      _clone.position.set(position.x ?? 0, position.y ?? 0, position.z ?? 0);
      _clone.rotation.set(rotation.x ?? 0, rotation.y ?? 0, rotation.z ?? 0);
      // TODO: normalize scale so this is not necessary
      if (accCfg.format === 'glb') {
        _clone.children[0].scale.set(1, 1, 1);
      }

      _clone.scale.set(scale.x ?? 1, scale.y ?? 1, scale.z ?? 1);

      if (accCfg.textureUrl) {
        const texture = useLoader(
          TextureLoader,
          `${MODELS_HOST}/${accCfg.textureUrl}`
        );
        _clone.traverse((child) => {
          const childMesh = child as Mesh;
          if (childMesh.isMesh) {
            childMesh.material = new MeshPhongMaterial({ map: texture });
          }
        });
      }

      if (accCfg.material) {
        _clone = accCfg.material(_clone);
      }

      accessoryModels[accId] = {
        object: _clone,
        bone: accCfg.armature.bone,
        slot: accCfg.slot,
      };
    });

    return accessoryModels;
  }, [selectedAccessories]);

  // add remove / accessories to bones as they're changed
  useEffect(() => {
    const childrenToRemove: Object3D[] = [];

    const slots = [
      'Head',
      'Eyes',
      'Back',
      'Right Hand',
      'Left Hand',
      'Ears',
      'Nose',
      'Mouth',
    ];
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
      const { object, bone, slot } = models[acc];
      if (!object) {
        return;
      }
      object.name = `accessory-${slot}`;

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

      boneToAdd?.add(object);
    });
  }, [mannyObj, selectedAccessories, models]);

  return;
}
