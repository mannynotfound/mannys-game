import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { useFBX } from '@react-three/drei';

import { MODELS_HOST } from 'constants';
import { allAccessories } from 'fixtures/accessories';

const accessoryModels = {};

export default function useAccessories(fbxClone, accessories) {
  // load any selected accessories
  const selectedAccessories = Object.keys(accessories ?? {}).reduce(
    (a, b) => a.concat(accessories[b]),
    []
  );

  const models = useMemo(() => {
    selectedAccessories.forEach((accId) => {
      if (accessoryModels[accId]) {
        return;
      }

      const accCfg = allAccessories.find((a) => a.id === accId);
      const model =
        accCfg.format === 'glb'
          ? useLoader(GLTFLoader, `${MODELS_HOST}/${accId}.glb`, (loader) => {
              const dracoLoader = new DRACOLoader();
              dracoLoader.setDecoderPath('/draco/gltf/');
              loader.setDRACOLoader(dracoLoader);
            }).scene
          : useFBX(`${MODELS_HOST}/${accId}.fbx`);

      let _clone = model.clone();
      const { scale = {} } = accCfg.armature;
      const { position = {}, rotation = {} } = accCfg.armature.offset;

      Object.keys(position).forEach((k) => {
        _clone.position[k] = position[k];
      });
      Object.keys(rotation).forEach((k) => {
        _clone.rotation[k] = rotation[k];
      });
      if (accCfg.format === 'glb') {
        _clone.children[0].scale.set(1, 1, 1);
      }
      Object.keys(scale).forEach((k) => {
        _clone.scale[k] = scale[k] || 1;
      });

      if (accCfg.textureUrl) {
        const texture = useLoader(
          TextureLoader,
          `${MODELS_HOST}/${accCfg.textureUrl}`
        );
        _clone.traverse((child) => {
          if (child.isMesh) {
            child.material = new THREE.MeshPhongMaterial({ map: texture });
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
    const childrenToRemove = [];

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
      fbxClone.traverse((child) => {
        if (child.name.includes(`accessory-${slot}`)) {
          childrenToRemove.push(child);
        }
      });
    });

    childrenToRemove.forEach((child) => {
      child.removeFromParent();
    });

    Object.keys(accessories ?? {}).forEach((category) => {
      const selectedAccessories = accessories[category] ?? [];

      selectedAccessories.forEach((acc) => {
        let boneToAdd = null;

        const { object, bone, slot } = models[acc];
        if (!object) {
          return;
        }
        object.name = `accessory-${slot}`;

        const mannyArm = fbxClone.children.find((c) => c.type === 'Group'); // armature will always be the group
        const name = (n) => (c) => c.name === n;
        const spine = mannyArm.children[0].children
          .find((c) => c.name === 'Spine')
          .children.find(name('Spine1'))
          .children.find(name('Spine2'));

        if (bone === 'Head') {
          boneToAdd = spine.children
            .find(name('Neck'))
            .children.find(name('Head'))
            .children.find(name('Head'));
        } else if (bone === 'LeftHand') {
          boneToAdd = spine.children
            .find(name('LeftShoulder'))
            .children.find(name('LeftArm'))
            .children.find(name('LeftForeArm'))
            .children.find(name('LeftHand'))
            .children.find(name('LeftHand'));
        } else if (bone === 'RightHand') {
          boneToAdd = spine.children
            .find(name('RightShoulder'))
            .children.find(name('RightArm'))
            .children.find(name('RightForeArm'))
            .children.find(name('RightHand'))
            .children.find(name('RightHand'));
        } else if (bone === 'Back') {
          boneToAdd = spine;
        }

        boneToAdd?.add(object);
      });
    });
  }, [fbxClone, accessories, models]);

  return true;
}
