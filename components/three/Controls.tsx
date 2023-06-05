import { useCallback, useMemo } from 'react';
import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { Vector3 } from 'three';

type Props = {
  enableZoom?: boolean;
  enablePan?: boolean;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  maxDistance?: number;
  minDistance?: number;
  target?: number[];
  onChange?: (position: Vector3) => void;
};

export default function Controls({
  enableZoom = true,
  enablePan = true,
  autoRotate = false,
  autoRotateSpeed = 0.5,
  maxDistance = 100000,
  minDistance = 20,
  target = [0, 0, 0],
  onChange,
}: Props) {
  const camTarget = useMemo(() => new Vector3(...target), [target]);
  const { camera } = useThree();
  const onControlsChange = useCallback(() => {
    onChange?.(camera.position);
  }, [onChange, camera]);

  return (
    <OrbitControls
      target={camTarget}
      rotateSpeed={1}
      autoRotate={autoRotate}
      autoRotateSpeed={autoRotateSpeed}
      minDistance={minDistance}
      maxDistance={maxDistance}
      enableZoom={enableZoom}
      enablePan={enablePan}
      onEnd={onControlsChange}
    />
  );
}
