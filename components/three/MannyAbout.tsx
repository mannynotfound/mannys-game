import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import manny from 'manny';
import { Mesh, Vector3 } from 'three';
import { getTokenProps } from '@/utils';
import { LIBRARY, MANNY_FBX } from '@/utils/constants';
import type { TokenId } from '@/utils/types';

export type AboutAnim = 'idle' | 'float' | 'teeter' | 'victory';

type Props = {
  tokenId: TokenId;
  animation: AboutAnim;
  position: number[];
};

function Manny({ tokenId, animation, position }: Props) {
  const mannyRef = useRef(null);

  const textureUrl = getTokenProps(tokenId)?.textureUrl;

  const mannyObj = manny({
    modelPath: MANNY_FBX,
    textureUrl,
    animation,
  });

  useFrame(() => {
    const vec = new Vector3(position[0], position[1], position[2]);
    const lerpSpeed = animation === 'idle' ? 0.25 : 0.1;
    if (mannyRef.current === null) return;
    const mannyGroup = mannyRef.current as Mesh;
    mannyGroup.position.lerp(vec, lerpSpeed);
  });

  return (
    <group position={[0, -110, 0]} ref={mannyRef}>
      <primitive object={mannyObj} dispose={null} />
    </group>
  );
}

export default Manny;
