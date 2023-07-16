import { Fragment, Suspense, useCallback, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import useSWR from 'swr';
import { NoToneMapping, sRGBEncoding } from 'three/src/constants';
import Chat from '@/components/Chat';
import Loader from '@/components/Loader';
import { Controls, Lighting, Manny, Text3D } from '@/components/three';
import { fetcher, findRarestManny, getTokenProps } from '@/utils';
import { API_URL } from '@/utils/constants';
import { AppProps, Gamer } from '@/utils/types';

type SceneProps = {
  topThree:
    | {
        name: string;
        rarestManny: number;
      }[]
    | undefined;
};

const Scene = ({ topThree }: SceneProps) => {
  const [, setMannysLoaded] = useState(0);
  const [loadingMannys, setLoadingMannys] = useState(true);

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

  const onMannyLoad = useCallback(() => {
    setMannysLoaded((prev: number) => {
      if (prev >= 2) {
        setLoadingMannys(false);
      }
      return prev + 1;
    });
  }, []);

  if (topThree == undefined) {
    return null;
  }

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
          onCreated={({ gl }) => {
            gl.toneMapping = NoToneMapping;
            gl.outputEncoding = sRGBEncoding;
          }}
        >
          {topThree.map((gamer, idx) => (
            <Fragment key={gamer.rarestManny}>
              <Suspense fallback={null}>
                <Text3D
                  text={`${idx + 1}. ${gamer.name}`}
                  position={textPositions[idx]}
                />
                <Manny
                  scale={1}
                  position={mannyPositions[idx]}
                  textureUrl={getTokenProps(gamer.rarestManny)?.textureUrl}
                  onLoad={onMannyLoad}
                  paused
                />
              </Suspense>
            </Fragment>
          ))}
          <Controls target={[0, 15, 0]} />
          <Lighting />
        </Canvas>
      </div>
      {loadingMannys && <Loader />}
    </>
  );
};

export default function Home({ web3, mannys }: AppProps) {
  const { data: leaderboard } = useSWR(`${API_URL}/leaderboard`, fetcher);

  const topThree = leaderboard?.data?.slice(0, 3).map((gamer: Gamer) => ({
    name: gamer.name,
    rarestManny: findRarestManny(gamer.tokens),
  }));

  return (
    <>
      <Scene topThree={topThree} />
      <div className="fixed bottom-0 p-8 w-full flex h-[200px]">
        <div className="flex-1 select-none">
          <Chat account={web3.account} mannys={mannys} />
        </div>
      </div>
    </>
  );
}
