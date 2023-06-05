import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

type Props = {
  zoomedIn: boolean;
  ogCameraPosition: { x: number; y: number; z: number };
};

const zoomedInCameraPosition = { x: 5, y: 72, z: 52 };

export default function CameraZoom({ zoomedIn, ogCameraPosition }: Props) {
  const { camera } = useThree();

  useEffect(() => {
    if (zoomedIn) {
      camera.position.set(
        zoomedInCameraPosition.x,
        zoomedInCameraPosition.y,
        zoomedInCameraPosition.z
      );
    } else {
      camera.position.set(
        ogCameraPosition.x,
        ogCameraPosition.y,
        ogCameraPosition.z
      );
    }
  }, [zoomedIn, ogCameraPosition, camera.position]);

  return null;
}
