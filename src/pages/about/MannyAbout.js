import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import manny from 'manny';

import { parseToken } from 'utils';
import { useAccessories } from 'hooks';
import { MANNY_FBX, LIBRARY } from 'constants';

const Manny = ({
  tokenId = 1,
  animation = 'float',
  accessories = {},
  scale = 1,
  position = [0, 0, 0],
}) => {
  const mannyRef = useRef();

  const animationOptions = {
    active: animation,
    paths: {
      float: LIBRARY.float,
      teeter: LIBRARY.teeter,
      victory: LIBRARY.victory,
    },
  };

  const { textureUrl } = parseToken(tokenId);

  const mannyObj = manny({
    modelPath: MANNY_FBX,
    textureUrl,
    animationOptions,
  });

  useAccessories(mannyObj, accessories);

  useFrame(() => {
    const vec = new THREE.Vector3(position[0], position[1], position[2]);
    const lerpSpeed = animation === 'idle' ? 0.25 : 0.1;
    mannyRef.current.position.lerp(vec, lerpSpeed);
  });

  return (
    <group
      position={[0, -110, 0]}
      rotation={[0, 0, 0]}
      scale={scale}
      ref={mannyRef}
    >
      <primitive object={mannyObj} dispose={null} />
    </group>
  );
};

export default Manny;
