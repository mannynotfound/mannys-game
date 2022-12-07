import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { ForwardControls, Lighting } from 'components/three';
import MannyTattoo from './MannyTattoo';

const TattooEditor = ({ tokenId, textureUrl, setTattooPosition }) => {
  const controlsRef = useRef();
  return (
    <div className="absolute inset-0 overflow-hidden z-10">
      <Canvas
        linear
        camera={{
          fov: 45,
          near: 1,
          far: 2000,
          position: [25, 100, 210],
        }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.NoToneMapping;
          gl.outputEncoding = THREE.sRGBEncoding;
        }}
      >
        <Suspense fallback={null}>
          <MannyTattoo
            position={[0, -45, 0]}
            tokenId={tokenId}
            decalTextureUrl={textureUrl}
            controlsRef={controlsRef}
            setTattooPosition={setTattooPosition}
          />
        </Suspense>
        <ForwardControls
          ref={controlsRef}
          target={[0, 45, 0]}
          minDistance={100}
          maxDistance={1000}
          enableDamping={false}
        />
        <Lighting />
      </Canvas>
    </div>
  );
};

export default TattooEditor;
