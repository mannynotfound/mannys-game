import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
// @ts-expect-error: add types to manny module
import manny from 'manny';

const Manny = () => {
  const newManny = manny({});
  return (
    <group position={[0, -90, 0]}>
      <primitive object={newManny} dispose={null} />
    </group>
  );
};

export default function BasicScene() {
  return (
    <div className="w-full h-0 relative pb-[100%]">
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
}
