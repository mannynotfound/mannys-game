import { Suspense } from 'react';
import { LinearToneMapping, sRGBEncoding } from 'three';
import { Canvas } from '@react-three/fiber';
import { useFBX } from '@react-three/drei';

import { Controls, Lighting, Manny } from '@/components/three';
import { MODELS_HOST } from '@/utils/constants';

const Props = () => {
  const tattooChairFbx = useFBX(`${MODELS_HOST}/tattoochair.fbx`);
  const saddleFbx = useFBX(`${MODELS_HOST}/saddle.fbx`);

  return (
    <>
      <group position={[35, -29, 0]}>
        <primitive object={tattooChairFbx} dispose={null} />
      </group>
      <group position={[-30, -35, 0]} rotation={[0, -50, 0]}>
        <primitive object={saddleFbx} dispose={null} />
      </group>
    </>
  );
};

const IntroScene = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-10">
      <Canvas
        linear
        camera={{
          fov: 45,
          near: 1,
          far: 2000,
          position: [25, 100, 400],
        }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.toneMapping = LinearToneMapping;
          gl.outputEncoding = sRGBEncoding;
        }}
      >
        <Suspense fallback={null}>
          <Manny
            animation="sitidle"
            position={[-30, -30, 0]}
            rotation={[0, -50, 0]}
          />
        </Suspense>
        <Suspense fallback={null}>
          <Props />
        </Suspense>
        <Controls target={[0, 45, 0]} minDistance={100} maxDistance={1000} />
        <Lighting />
      </Canvas>
    </div>
  );
};

export default IntroScene;
