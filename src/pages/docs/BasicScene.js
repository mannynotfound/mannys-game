import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import manny from 'manny';

const Manny = () => (
  <group position={[0, -90, 0]}>
    <primitive object={manny()} dispose={null} />
  </group>
);

const BasicScene = () => (
  <div className="w-full h-0 relative" style={{ paddingBottom: '100%' }}>
    <div className="absolute inset-0">
      <Canvas flat camera={{ fov: 45, position: [25, 100, 200] }}>
        <Suspense fallback={null}>
          <Manny />
        </Suspense>
        <hemisphereLight groundColor={0x444444} />
        <directionalLight
          castShadow
          intensity={0.25}
          position={[0, 200, 100]}
        />
      </Canvas>
    </div>
  </div>
);

export default BasicScene;
