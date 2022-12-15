import { useState, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';

import { Controls, Lighting } from 'components/three';
import MannyTattooView from 'pages/tattoo-shop/MannyTattooView';

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
        gl.toneMapping = THREE.NoToneMapping;
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

const TattooViewParty = () => {
  const [tattooData, setTattooData] = useState(null);
  const [fetchingTattoos, setFetchingTattoos] = useState(false);

  const fetchTattoos = async () => {
    setFetchingTattoos(true);

    const fetchUrl = window.location.host.includes('localhost')
      ? 'http://localhost:3001'
      : 'https://mannys-game-server.herokuapp.com';
    fetch(`${fetchUrl}/api/tattoo-shop/view/84`, { mode: 'cors' })
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

  if (tattooData?.length) {
    console.log(tattooData.length);
    tattooData.forEach((td) => {
      console.log(td.tattoo_url);
    });
  }

  return (
    <div className="three-container fixed inset-0">
      {tattooData && <TattooViewer tokenId={84} existing={tattooData} />}
      <div className="absolute bottom-0 w-full z-10">
        <div className="max-width-lg p-8 mx-auto">
          <div
            className="border-4 border-green p-8 rounded-md text-white flex justify-between items-center"
            style={{
              backgroundImage: `url(https://v2.partybid.app/images/cursors-flying.png)`,
              backgroundSize: 'contain',
              backgroundPosition: '100px center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="text-2xl flex items-center">
              <span
                className="live-icon"
                style={{ position: 'relative', top: -2.5 }}
              />
              <span className="ml-3">LIVE NOW</span>
            </div>
            <a
              className="text-2xl party-btn px-4 py-2"
              href="https://v2.partybid.app/join/0x4523fb71ec20f63928541c48cfc236219bd7700d"
            >
              Join The Party!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TattooViewParty;
