import { Suspense, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

import { Manny, Controls, Lighting } from 'components/three';
import { parseToken } from 'utils';

const View = (props) => {
  const [zoomedIn, setZoomedIn] = useState(false);
  const { tokenId, textureUrl, bonusAnimName } = parseToken(props);
  const [mood, setMood] = useState('idle');

  return (
    <>
      <div className="three-container fixed inset-0">
        <Canvas
          linear
          camera={{
            fov: 45,
            near: 1,
            far: 2000,
            position: [25, 100, 200],
          }}
          gl={{
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true,
          }}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.NoToneMapping;
            gl.outputEncoding = THREE.sRGBEncoding;
          }}
        >
          <Suspense fallback={null}>
            <Manny
              paused={zoomedIn}
              tokenId={tokenId}
              scale={1}
              position={[0, -75, 0]}
              animation={zoomedIn ? 'idle' : mood}
              textureUrl={textureUrl}
            />
          </Suspense>
          <Controls
            zoomedIn={zoomedIn}
            maxDistance={zoomedIn ? 100 : 1000}
            target={[0, 15, 0]}
            zoomedInTarget={[0, 80, 0]}
            zoomedInCameraPosition={[5, 82, 60]}
          />
          <Lighting />
        </Canvas>
      </div>
      <div className="fixed bottom-0 p-5 w-full flex justify-between">
        <div
          className={zoomedIn ? 'opacity-0 pointer-events-none' : ''}
          onClick={() => setMood(mood === 'idle' ? bonusAnimName : 'idle')}
        >
          {bonusAnimName.toUpperCase()}
        </div>
        <div
          onClick={() => {
            setZoomedIn(!zoomedIn);
          }}
        >
          {zoomedIn ? 'EXIT' : 'PORTRAIT MODE'}
        </div>
      </div>
    </>
  );
};

export default withRouter((props) => <View {...props} />);
