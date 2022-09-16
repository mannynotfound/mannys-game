import { useEffect, useState, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const Controls = ({
  enableZoom = true,
  enablePan = true,
  autoRotate = false,
  autoRotateSpeed = 0.5,
  maxDistance = 1000,
  minDistance = 20,
  zoomedIn,
  target = [0, 0, 0],
  zoomedInTarget = [0, 70, 0],
  zoomedInCameraPosition = [5, 72, 52],
}) => {
  const { camera } = useThree();
  const orbitRef = useRef();
  const [ogCameraPosition, setOgCameraPosition] = useState(null);

  useEffect(() => {
    if (zoomedIn && orbitRef?.current) {
      orbitRef.current.reset();
      orbitRef.current.target.set(
        zoomedInTarget[0],
        zoomedInTarget[1],
        zoomedInTarget[2]
      );
      camera.position.set(
        zoomedInCameraPosition[0],
        zoomedInCameraPosition[1],
        zoomedInCameraPosition[2]
      );
      orbitRef.current.maxDistance = maxDistance;
      orbitRef.current.update();
    } else if (orbitRef?.current) {
      orbitRef.current.reset();
      orbitRef.current.target.set(target[0], target[1], target[2]);
      if (ogCameraPosition) {
        camera.position.set(
          ogCameraPosition.x,
          ogCameraPosition.y,
          ogCameraPosition.z
        );
      }
      orbitRef.current.maxDistance = maxDistance;
      orbitRef.current.update();
    }
  }, [zoomedIn]);

  useEffect(() => {
    if (orbitRef?.current) {
      orbitRef.current.reset();
      orbitRef.current.target.set(...target);
      orbitRef.current.update();
    }
  }, []);

  useEffect(() => {
    if (!ogCameraPosition && camera.position) {
      setOgCameraPosition(camera.position);
    }
  }, [camera]);

  return (
    <OrbitControls
      ref={orbitRef}
      rotateSpeed={1}
      autoRotate={autoRotate}
      autoRotateSpeed={autoRotateSpeed}
      target={target}
      minDistance={minDistance}
      maxDistance={maxDistance}
      enableZoom={enableZoom}
      enablePan={enablePan}
    />
  );
};

export default Controls;
