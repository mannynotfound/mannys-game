import { Suspense, useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { useSpring } from '@react-spring/three';
import { useHistory } from 'react-router-dom';
import { useBalance } from 'wagmi';

import { parseToken } from 'utils';
import { Manny, Controls, Lighting } from 'components/three';
import mannyTokens from 'fixtures/tokens';
import { Page, Button } from 'components';
import { useExchangePrice, useFloorPrice } from 'hooks';
import DAOLogo from './DAOLogo';

const getRandomSix = () => {
  const randomMannys = [];
  const rareMannys = [];
  const baseMannys = [];

  mannyTokens.forEach((token) => {
    let isBase = false;
    token.attributes.forEach((attribute) => {
      if (attribute.trait_type === 'skin') {
        if (
          attribute.value === 'Base Common' ||
          attribute.value === 'Base Rare'
        ) {
          isBase = true;
        }
      }
    });
    if (isBase) {
      baseMannys.push(token);
    } else {
      rareMannys.push(token);
    }
  });

  for (let i = 0; i < 6; i++) {
    const arrToChoose = i % 2 === 0 ? baseMannys : rareMannys;
    let randIdx = Math.floor(Math.random() * arrToChoose.length);
    // choose manny #1 as first one always
    if (i === 0) {
      randIdx = 0;
    }
    const nextManny = arrToChoose.splice(randIdx, 1)[0];
    randomMannys.push(nextManny);
  }

  return randomMannys;
};

const AnimateCamera = ({ logoRef, groupRef, animatedIn, onRest }) => {
  const { camera } = useThree();
  const [styles, api] = useSpring(() => ({
    from: { y: camera.position.y, z: camera.position.z },
    to: { y: 65, z: 346 },
    config: { duration: 3000 },
    onRest,
  }));

  // animate camera in while also forcing logo orientation + lookAt camera
  useFrame(() => {
    if (!animatedIn) {
      camera.position.y = styles.y.get();
      camera.position.z = styles.z.get();
    }
    if (logoRef?.position) {
      camera.lookAt(logoRef?.position);
      logoRef.lookAt(camera.position);
      logoRef.rotateX(THREE.MathUtils.degToRad(90));
    }
    if (animatedIn && groupRef?.current) {
      groupRef.current.rotation.y -= -0.001;
    }
  });

  useEffect(() => {
    api.start();
  }, []);

  return null;
};

const DaoScene = () => {
  const [randomSix, setRandomSix] = useState(null);
  const [animatedIn, setAnimatedIn] = useState(false);
  const [mannysToLoad, setMannysToLoad] = useState(1);
  const [mannysLoaded, setMannysLoaded] = useState(false);
  const [logoRef, setLogoRef] = useState(null);
  const groupRef = useRef();

  useEffect(() => {
    if (!randomSix) {
      setRandomSix(getRandomSix());
    }
  }, [randomSix]);

  if (!randomSix) {
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
          gl.toneMapping = THREE.NoToneMapping;
          gl.outputEncoding = THREE.sRGBEncoding;
        }}
      >
        <group ref={groupRef}>
          {randomSix.slice(0, mannysToLoad).map((randomManny, idx) => (
            <Suspense fallback={null} key={randomManny.token_id}>
              <Manny
                tokenId={randomManny.token_id}
                position={[
                  mannyPositions[idx].posX,
                  -80,
                  mannyPositions[idx].posZ,
                ]}
                rotation={[0, mannyPositions[idx].rotY, 0]}
                scale={1}
                textureUrl={parseToken(randomManny.token_id).textureUrl}
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
        {mannysLoaded && (
          <AnimateCamera
            onRest={() => setAnimatedIn(true)}
            logoRef={logoRef}
            groupRef={groupRef}
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
};

const Dao = () => {
  const { data } = useBalance({
    addressOrName: 'mannydao.eth',
  });
  const balance = parseFloat(data?.formatted) || 0;
  const history = useHistory();
  const exchangePrice = useExchangePrice();
  const floorPrices = useFloorPrice([
    ['cryptoadz-by-gremplin', 1],
    ['alpacadabraz-3d', 1],
    ['turfnft', 3],
    ['mannys-game', 28],
    ['okpc', 1],
    ['adworld', 1],
    ['silk-road-by-ezra-miller', 1],
  ]);

  const calculateHoldings = () => {
    const assets = [
      10000, // exodia head
      2750, // mario pikachu
    ].reduce((a, b) => a + b, 0);

    const totalFloorPrices = Object.keys(floorPrices).reduce(
      (a, b) => a + floorPrices[b],
      0
    );
    const totalBalance = balance + totalFloorPrices;
    return (assets + totalBalance * exchangePrice).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <Page className="text-white">
      <div className="h-full overflow-y-scroll">
        <div className="h-full flex items-center">
          <section className="flex flex-col-reverse md:flex-row w-full px-0">
            <div className="w-full md:w-2/5 h-auto relative flex flex-col justify-center items-center">
              <div className="p-8 text-left">
                <div className="mb-4">
                  <img
                    className="w-4/5"
                    alt="manny dao logo"
                    src="/misc/mannyDAOlogo.svg"
                  />
                </div>
                <h2 style={{ color: 'darkgray' }}>
                  The treasury for Mannys holders everywhere, focused on
                  collecting and curating the most headass pieces of culture.
                </h2>
                {balance > 0 && (
                  <div className="mt-4">
                    <h3 className="text-3xl font-bold">
                      Holdings:{' '}
                      <span className="text-green">
                        <span className="text-yellow">$</span>
                        {calculateHoldings()}
                      </span>
                      <small className="block mt-1 text-xs">
                        Combined Liquid + Assets Value
                      </small>
                    </h3>
                  </div>
                )}
                <div className="border-t border-b border-white py-6 text-2xl mt-4">
                  <div className="flex">
                    <Button
                      className="flex-1 flex text-center items-center justify-center"
                      color="green"
                      large
                      onClick={() => {
                        history.push('/dao/assets');
                      }}
                      style={{ marginRight: 20 }}
                    >
                      See Assets
                    </Button>
                    <Button
                      className="flex-1 flex text-center items-center justify-center"
                      color="yellow"
                      large
                      onClick={() => {
                        history.push('/dao/assets/mario-pikachu');
                      }}
                    >
                      Latest Acquisition
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-full md:w-3/5 h-0 relative"
              style={{ paddingBottom: '58%' }}
            >
              <DaoScene />
            </div>
          </section>
        </div>
      </div>
    </Page>
  );
};

export default Dao;
