import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { usePrevious } from '@/utils';

type Props = {
  zoomedIn: boolean;
};

const zoomedInCameraPosition = { x: 5, y: 72, z: 52 };
export const defaultCameraPosition = { x: 25, y: 100, z: 300 };

export default function CameraZoom({ zoomedIn }: Props) {
  const { camera } = useThree();
  const previousZoomIn = usePrevious(zoomedIn, zoomedIn);

  useEffect(() => {
    if (zoomedIn) {
      camera.position.set(
        zoomedInCameraPosition.x,
        zoomedInCameraPosition.y,
        zoomedInCameraPosition.z
      );
    } else if (previousZoomIn && !zoomedIn) {
      camera.position.set(
        defaultCameraPosition.x,
        defaultCameraPosition.y,
        defaultCameraPosition.z
      );
    }
  }, [zoomedIn, previousZoomIn, camera.position]);

  return null;
}
