import { useEffect, useState } from 'react';
// @ts-expect-error: add types to manny module
import manny from 'manny';
import { Euler, Group, Vector3 } from 'three';
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
  onLoad?: (manny: Group) => void;
  scale?: number;
  position?: number[];
  rotation?: number[];
  datData?: Offset;
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
    active: animation,
    paused,
    // only pass in selected path so initial load doesnt take forever
    paths: {
      [animation]: LIBRARY[animation],
    },
  };

  const mannyObj = manny({
    modelPath: MANNY_FBX,
    textureUrl,
    animationOptions,
  });

  useAccessories(mannyObj, accessories, datData);

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      if (onLoad) onLoad(mannyObj);
    }
  }, [mannyObj, loaded, onLoad]);

  return (
    <group
      position={new Vector3(...position)}
      rotation={new Euler(...rotation)}
      scale={scale}
    >
      <primitive object={mannyObj} dispose={null} />
    </group>
  );
}

export default Manny;
