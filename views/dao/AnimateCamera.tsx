import { useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useSpring } from '@react-spring/three';
import { Group, MathUtils } from 'three';

type Props = {
  logoRef: Group;
  groupRef: Group;
  animatedIn: boolean;
  onRest: () => void;
};

export default function AnimateCamera({
  logoRef,
  groupRef,
  animatedIn,
  onRest,
}: Props) {
  const { camera } = useThree();
  const [styles, api] = useSpring(() => ({
    from: { y: camera.position.y, z: camera.position.z },
    to: { y: 65, z: 346 },
    config: { duration: 3000 },
    onRest,
  }));

  // animate camera in while also forcing logo orientation + lookAt camera
  useFrame(() => {
    if (!animatedIn) {
      camera.position.y = styles.y.get();
      camera.position.z = styles.z.get();
    }
    if (logoRef?.position) {
      camera.lookAt(logoRef?.position);
      logoRef.lookAt(camera.position);
      logoRef.rotateX(MathUtils.degToRad(90));
    }
    if (animatedIn && groupRef) {
      groupRef.rotation.y -= -0.001;
    }
  });

  useEffect(() => {
    api.start();
  }, []);

  return null;
}
