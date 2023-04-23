import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { LinearToneMapping, sRGBEncoding } from 'three';
import { Controls, Lighting } from '@/components/three';
import { fetcher } from '@/utils';
import { API_URL } from '@/utils/constants';
import { TattooAPIObject, TattooAPIResponse } from '@/views/tattoo-shop/types';
import MannyTattooView from '@/views/tattoo-view/MannyTattooView';

type Props = {
  tokenId: number;
  existing: TattooAPIObject[];
};

const TattooViewer = ({ tokenId, existing }: Props) => (
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
        gl.toneMapping = LinearToneMapping;
        gl.outputEncoding = sRGBEncoding;
      }}
    >
      <Suspense fallback={null}>
        <MannyTattooView
          position={[0, -45, 0]}
          tokenId={tokenId}
          existing={existing}
        />
      </Suspense>
      <Controls target={[0, 45, 0]} minDistance={100} maxDistance={1000} />
      <Lighting />
    </Canvas>
  </div>
);

const TattooView = () => {
  const router = useRouter();
  const tokenId = router.query.tokenId;
  const { data: tattooData } = useSWR<TattooAPIResponse>(
    tokenId ? `${API_URL}/tattoo-shop/view/${tokenId}` : null,
    fetcher
  );

  if (tokenId === undefined) {
    return null;
  }

  return (
    <div className="three-container fixed inset-0">
      {tattooData?.data && (
        <TattooViewer
          key={tokenId.toString()}
          tokenId={parseInt(tokenId.toString(), 10)}
          existing={tattooData?.data}
        />
      )}
    </div>
  );
};

export default TattooView;
