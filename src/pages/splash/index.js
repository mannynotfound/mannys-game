import { Suspense, Fragment, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, extend } from '@react-three/fiber';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

import { findRarestManny, parseToken } from 'utils';
import { Manny, Controls, Lighting, Helvetiker } from 'components/three';
import { Chat } from 'components';

extend({ TextGeometry });
const font = new FontLoader().parse(Helvetiker);

const Splash = (props) => {
  const { leaderboard } = props;
  useEffect(() => {
    if (!leaderboard?.data?.data && !leaderboard.loading) {
      leaderboard.load();
    }
  }, []);

  if (!leaderboard?.data?.data) {
    return (
      <div className="fixed bottom-0 p-8 w-full flex" style={{ height: 200 }}>
        <div className="flex-1 select-none">
          <Chat {...props} />
        </div>
      </div>
    );
  }

  const topThree = leaderboard?.data?.data.slice(0, 3).map((td) => ({
    ...td,
    rarestManny: findRarestManny(td.tokens),
  }));

  const mannyPositions = [
    [0, -80, 0],
    [-75, -80, -20],
    [75, -80, -40],
  ];

  const textPositions = [
    [-22, 100, 5],
    [-98, 100, -15],
    [50, 100, -35],
  ];

  return (
    <>
      <div className="three-container fixed inset-0">
        <Canvas
          linear
          camera={{
            fov: 45,
            near: 1,
            far: 2000,
            position: [25, 100, 300],
          }}
          gl={{
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true,
          }}
          onCreated={({ gl, scene }) => {
            gl.toneMapping = THREE.NoToneMapping;
            gl.outputEncoding = THREE.sRGBEncoding;
            window.THREE = THREE;
            window.scene = scene;
          }}
        >
          {topThree.map((topManny, idx) => (
            <Fragment key={topManny.rarestManny}>
              <mesh position={textPositions[idx]}>
                <textGeometry
                  args={[
                    `${idx + 1}. ${topManny.name}`,
                    { font, size: 6, height: 2, curveSegments: 12 },
                  ]}
                />
                <meshBasicMaterial
                  attach="material"
                  color={new THREE.Color(0x70bf44).convertSRGBToLinear()}
                  reflectivity={0}
                  refractionRatio={0}
                />
              </mesh>
              <Suspense fallback={null}>
                <Manny
                  tokenId={topManny.rarestManny}
                  scale={1}
                  position={mannyPositions[idx]}
                  textureUrl={parseToken(topManny.rarestManny).textureUrl}
                  paused
                />
              </Suspense>
            </Fragment>
          ))}
          <Controls target={[0, 15, 0]} />
          <Lighting />
        </Canvas>
      </div>
      <div className="fixed bottom-0 p-8 w-full flex" style={{ height: 200 }}>
        <div className="flex-1 select-none">
          <Chat {...props} />
        </div>
      </div>
    </>
  );
};

export default Splash;
