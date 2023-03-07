import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

type Props = {
  zoomedIn: boolean;
  zoomedInCameraPosition: number[];
  ogCameraPosition: number[];
};

export default function CameraZoom({
  zoomedIn,
  zoomedInCameraPosition,
  ogCameraPosition,
}: Props) {
  const { camera } = useThree();

  useEffect(() => {
    if (zoomedIn) {
      camera.position.set(
        zoomedInCameraPosition[0],
        zoomedInCameraPosition[1],
        zoomedInCameraPosition[2]
      );
    } else {
      camera.position.set(
        ogCameraPosition[0],
        ogCameraPosition[1],
        ogCameraPosition[2]
      );
    }
  }, [zoomedIn, ogCameraPosition, zoomedInCameraPosition, camera.position]);

  return null;
}
