import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Group, NoToneMapping, sRGBEncoding } from 'three';
import { Controls, DAOLogo, Lighting, Manny } from '@/components/three';
import { getTokenProps } from '@/utils';
import { TokenMetadata } from '@/utils/types';
import { getRandomSix } from '@/views/dao/utils';
import AnimateCamera from '@/views/dao/AnimateCamera';

export default function DaoScene() {
  const [randomSix, setRandomSix] = useState<TokenMetadata[]>([]);
  const [animatedIn, setAnimatedIn] = useState(false);
  const [mannysToLoad, setMannysToLoad] = useState(1);
  const [mannysLoaded, setMannysLoaded] = useState(false);
  const [logoRef, setLogoRef] = useState<Group>();
  // TODO: clean this up
  const groupRef = useRef(null);
  const groupRefGroup =
    groupRef.current !== null ? (groupRef.current as Group) : null;

  useEffect(() => {
    if (!randomSix.length) {
      setRandomSix(getRandomSix());
    }
  }, [randomSix]);

  if (!randomSix.length) {
    return null;
  }

  const onMannyLoad = () => {
    // wait a bit before loading in next manny for visual effect
    setTimeout(() => {
      const nextAmount = Math.min(mannysToLoad + 1, randomSix.length);
      setMannysToLoad(nextAmount);
      if (nextAmount === randomSix.length) {
        setMannysLoaded(true);
      }
    }, 100);
  };

  const mannyPositions = [
    { rotY: -0.05, posX: -5, posZ: -90 },
    { rotY: -1, posX: 85, posZ: -45 },
    { rotY: -2.3, posX: 85, posZ: 55 },
    { rotY: -3.2, posX: -5, posZ: 100 },
    { rotY: 2.15, posX: -95, posZ: 55 },
    { rotY: 0.85, posX: -95, posZ: -45 },
  ];

  return (
    <div className="three-container absolute overflow-hidden z-10 inset-0">
      <Canvas
        linear
        camera={{
          fov: 45,
          near: 1,
          far: 2000,
          position: [0, 350, 0],
        }}
        gl={{
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: true,
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = NoToneMapping;
          gl.outputEncoding = sRGBEncoding;
        }}
      >
        <group ref={groupRef}>
          {randomSix.slice(0, mannysToLoad).map((randomManny, idx) => (
            <Suspense fallback={null} key={randomManny.token_id}>
              <Manny
                position={[
                  mannyPositions[idx].posX,
                  -80,
                  mannyPositions[idx].posZ,
                ]}
                rotation={[0, mannyPositions[idx].rotY, 0]}
                scale={1}
                textureUrl={getTokenProps(randomManny.token_id)?.textureUrl}
                animation="holdingHands"
                onLoad={onMannyLoad}
                paused
              />
            </Suspense>
          ))}
        </group>
        <Suspense fallback={null}>
          <group>
            <DAOLogo onLoad={(obj) => setLogoRef(obj)} />
          </group>
        </Suspense>
        {mannysLoaded && logoRef !== undefined && groupRefGroup !== null && (
          <AnimateCamera
            onRest={() => setAnimatedIn(true)}
            logoRef={logoRef}
            groupRef={groupRefGroup}
            animatedIn={animatedIn}
          />
        )}
        {animatedIn && (
          <Controls target={[0, 0, 0]} enableZoom={false} enablePan={false} />
        )}
        <Lighting />
      </Canvas>
    </div>
  );
}
