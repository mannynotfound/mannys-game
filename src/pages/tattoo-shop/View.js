import { useState, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { withRouter } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';

import { Controls, Lighting } from 'components/three';
import MannyTattoo from './MannyTattoo';

const TattooScene = ({
  tokenId,
  textureUrl,
  setTattooPosition,
  coordinates,
}) => (
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
        gl.toneMapping = THREE.LinearToneMapping;
        gl.outputEncoding = THREE.sRGBEncoding;
      }}
    >
      <Suspense fallback={null}>
        <MannyTattoo
          position={[0, -45, 0]}
          tokenId={tokenId}
          decalTextureUrl={textureUrl}
          coordinates={coordinates}
          setTattooPosition={setTattooPosition}
        />
      </Suspense>
      <Controls
        target={[0, 45, 0]}
        minDistance={100}
        maxDistance={1000}
        enableDamping={false}
      />
      <Lighting />
    </Canvas>
  </div>
);

const TattooView = ({ match }) => {
  const [tattooData, setTattooData] = useState(null);
  const [fetchingTattoos, setFetchingTattoos] = useState(false);
  const tokenId = match?.params?.tokenId;
  const address = match?.params?.address;

  const fetchTattoos = async () => {
    setFetchingTattoos(true);

    const fetchUrl = window.location.host.includes('localhost')
      ? 'http://localhost:3001'
      : 'https://mannys-game-server.herokuapp.com';
    let baseFetchUrl = `${fetchUrl}/api/tattoo-shop/view/${tokenId}`;
    if (address) {
      baseFetchUrl += `/${address}`;
    }
    fetch(baseFetchUrl, { mode: 'cors' })
      .then((resp) => resp.json())
      .then((json) => {
        setTattooData(json.data);
        setFetchingTattoos(false);
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (!tattooData && !fetchingTattoos) {
      fetchTattoos();
    }
  }, []);

  let tattooMatch = null;
  if (tattooData && tattooData.length) {
    tattooMatch = tattooData.find(
      (td) => String(td.token_id) === String(tokenId)
    );
  }

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <div className="h-auto" id="scroll">
        <div
          style={{
            position: 'relative',
            height: 900,
            width: 600,
            margin: '0 auto',
          }}
        >
          {tattooMatch && (
            <TattooScene
              key={tattooMatch.token_id}
              tokenId={tattooMatch.token_id}
              textureUrl={tattooMatch.tattoo_url}
              setTattooPosition={null}
              coordinates={JSON.parse(tattooMatch.coordinates)}
            />
          )}
          {tattooMatch && (
            <h2
              className="text-green"
              style={{
                position: 'absolute',
                bottom: '0',
                left: '50%',
                zIndex: 10000,
              }}
            >
              {tattooMatch.token_id}
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter((props) => <TattooView {...props} />);
