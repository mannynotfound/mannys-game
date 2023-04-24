import { useEffect, useMemo, useRef, useState } from 'react';
import { Group, Object3D } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import type { Offset, Slot } from '@/fixtures/accessories';
import { allAccessories, slot2BoneMap, slots } from '@/fixtures/accessories';
import { ACCESSORIES_HOST } from '@/utils/constants';

interface ModelsCache {
  [accessoryId: string]: Group;
}

interface ModelsState {
  [accessoryId: string]: {
    model: Group;
    slot: Slot;
  };
}

export default function useAccessories(
  mannyObj: Object3D,
  accessories?: {
    [slot: string]: string[];
  },
  datData?: Offset
) {
  const selectedAccessories = useMemo(
    () =>
      Object.values(accessories ?? {}).reduce(
        (a, b) => a.concat(b),
        [] as string[]
      ),
    [accessories]
  );

  const modelsCache = useRef<ModelsCache>({});
  const [models, setModels] = useState<ModelsState>({});

  useEffect(() => {
    selectedAccessories.forEach((accId) => {
      const accCfg = allAccessories.find((a) => a.id === accId);
      if (accCfg === undefined) return;

      const { offset = {}, id, slot } = accCfg;
      const { scale = {}, position = {}, rotation = {} } = offset;

      const handleModel = (model: Group) => {
        model.scale.set(scale.x ?? 100, scale.y ?? 100, scale.z ?? 100);
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

        return model;
      };

      // already loaded, just apply new offset if any
      if (modelsCache.current[accId] !== undefined) {
        const model = handleModel(modelsCache.current[accId]);
        setModels((prev) => ({
          ...prev,
          [accId]: {
            model,
            slot,
          },
        }));
      } else {
        // load model for first time
        const loader = new GLTFLoader();
        loader.load(`${ACCESSORIES_HOST}/${id}.gltf`, (gltf) => {
          const innerModel = gltf.scene;
          const model = handleModel(innerModel);
          // save in cache
          modelsCache.current[accId] = model;
          setModels((prev) => ({
            ...prev,
            [accId]: {
              model,
              slot,
            },
          }));
        });
      }
    });
  }, [selectedAccessories, datData]);

  // add remove / accessories to bones as they're changed
  // TODO: bake a lot of this functionality into Manny module
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
