import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { NoToneMapping, sRGBEncoding } from 'three';
import { Lighting, Manny } from '@/components/three';

export default function Scene() {
  return (
    <div className="relative w-full h-0 pb-[100%]">
      <div className="absolute inset-0">
        <Canvas
          linear
          camera={{
            fov: 45,
            near: 1,
            far: 2000,
            position: [0, 0, 300],
          }}
          gl={{ antialias: true, alpha: true }}
          onCreated={({ gl }) => {
            gl.toneMapping = NoToneMapping;
            gl.outputEncoding = sRGBEncoding;
          }}
        >
          <Suspense fallback={null}>
            <Manny position={[0, -85, 0]} animation="waving" />
          </Suspense>
          <Lighting />
        </Canvas>
      </div>
    </div>
  );
}
