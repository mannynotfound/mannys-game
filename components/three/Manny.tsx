import { useEffect, useState } from 'react';
import manny from 'manny';
import {
  AnimationAction,
  AnimationMixer,
  Euler,
  Object3D,
  Vector3,
} from 'three';
import type { Offset } from '@/fixtures/accessories';
import useAccessories from '@/hooks/useAccessories';
import { LIBRARY, MANNY_FBX, MANNY_TEXTURE_DEFAULT } from '@/utils/constants';

type Props = {
  textureUrl?: string;
  accessories?: {
    [slot: string]: string[];
  };
  animation?: string;
  paused?: boolean;
  onLoad?: (props: MannyProps) => void;
  scale?: number;
  position?: number[];
  rotation?: number[];
  datData?: Offset;
};

export type MannyProps = {
  manny: Object3D;
  actions: Record<string, AnimationAction> | undefined;
  mixer: AnimationMixer;
};

function Manny({
  textureUrl = MANNY_TEXTURE_DEFAULT,
  animation = 'idle',
  paused = false,
  accessories = {},
  onLoad,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  datData,
}: Props) {
  const [loaded, setLoaded] = useState(false);

  const animationOptions = {
    animation,
    paused,
    library: {
      ...LIBRARY,
    },
  };

  const mannyProps = manny({
    modelPath: MANNY_FBX,
    textureUrl,
    ...animationOptions,
  });

  useAccessories(mannyProps.manny, accessories, datData);

  useEffect(() => {
    if (!loaded && mannyProps.actions?.[animation] !== undefined) {
      setLoaded(true);
      if (onLoad) onLoad(mannyProps);
    }
  }, [mannyProps, loaded, onLoad, animation]);

  return (
    <group
      position={new Vector3(...position)}
      rotation={new Euler(...rotation)}
      scale={scale}
    >
      <primitive object={mannyProps.manny} dispose={null} />
    </group>
  );
}

export default Manny;
