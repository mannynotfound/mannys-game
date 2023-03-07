import { Dispatch, Suspense, useRef } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/utils';
import { API_URL } from '@/utils/constants';
import { Canvas } from '@react-three/fiber';
import { NoToneMapping, sRGBEncoding } from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { ForwardControls, Lighting } from '@/components/three';
import MannyTattoo from '@/views/tattoo-shop/MannyTattoo';
import { TattooCoordinates, TattooAPIResponse } from './types';

type Props = {
  tokenId: number;
  textureUrl: string;
  setTattooCoords: Dispatch<TattooCoordinates | undefined>;
  showExisting?: boolean;
};

const TattooEditor = ({
  tokenId,
  textureUrl,
  setTattooCoords,
  showExisting,
}: Props) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { data: tattooData } = useSWR<TattooAPIResponse>(
    showExisting ? `${API_URL}/tattoo-shop/view/${tokenId}` : null,
    fetcher
  );

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
          gl.toneMapping = NoToneMapping;
          gl.outputEncoding = sRGBEncoding;
        }}
      >
        <Suspense fallback={null}>
          <MannyTattoo
            position={[0, -45, 0]}
            tokenId={tokenId}
            decalTextureUrl={textureUrl}
            controlsRef={controlsRef}
            setTattooCoords={setTattooCoords}
            existing={tattooData?.data}
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
