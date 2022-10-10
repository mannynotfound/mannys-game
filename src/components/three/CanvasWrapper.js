import { Canvas } from '@react-three/fiber';
import { Lighting } from 'components/three';

const CanvasWrapper = ({ canvasProps = {}, children }) => {
  const canvasOptions = {
    flat: true,
    ...canvasProps,
    camera: {
      fov: 75,
      near: 0.1,
      far: 3800,
      ...(canvasProps?.camera ?? {}),
    },
  };

  return (
    <div className="fixed inset-0 z-10">
      <Canvas {...canvasOptions}>
        {children}
        <Lighting />
      </Canvas>
    </div>
  );
};

export default CanvasWrapper;
