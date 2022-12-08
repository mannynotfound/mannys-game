import { useState, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { withRouter } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';

import { Controls, Lighting } from 'components/three';
import MannyTattooView from './MannyTattooView';

const TattooViewer = ({ tokenId, existing }) => (
  <div className="absolute inset-0 overflow-hidden z-10">
    <Canvas
      linear
      camera={{
        fov: 45,
        near: 1,
        far: 2000,
        position: [25, 100, 310],
      }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.LinearToneMapping;
        gl.outputEncoding = THREE.sRGBEncoding;
      }}
    >
      <Suspense fallback={null}>
        <MannyTattooView
          position={[0, -45, 0]}
          tokenId={tokenId}
          existing={existing}
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
  const tokenId = parseInt(match?.params?.tokenId, 10);

  const fetchTattoos = async () => {
    setFetchingTattoos(true);

    const fetchUrl = window.location.host.includes('localhost')
      ? 'http://localhost:3001'
      : 'https://mannys-game-server.herokuapp.com';
    fetch(`${fetchUrl}/api/tattoo-shop/view/${tokenId}`, { mode: 'cors' })
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

  return (
    <div className="three-container fixed inset-0">
      {tattooData && (
        <TattooViewer key={tokenId} tokenId={tokenId} existing={tattooData} />
      )}
    </div>
  );
};

export default withRouter((props) => <TattooView {...props} />);
