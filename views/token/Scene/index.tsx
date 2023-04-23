import { useRouter } from 'next/router';
import { Suspense, useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { NoToneMapping, sRGBEncoding, Vector3 } from 'three';
import { Environment } from '@react-three/drei';
import type { Offset } from '@/fixtures/accessories';
import { AccessoryGUI } from '../Debug';
import { Manny, Controls, Lighting, CameraZoom } from '@/components/three';
import AsciiRenderer from '@/views/token/Quests/AsciiRenderer';
import { getTextureURL } from '@/utils';
import type { TokenId } from '@/utils/types';

type Props = {
  accessories?: {
    [slot: string]: string[];
  };
  tokenId: TokenId;
  textureUrl: string;
  mood: string;
  bgColor: string;
  paused: boolean;
  textureHD: boolean;
  zoomedIn: boolean;
  questMode: string | undefined;
};

const zoomedInCameraPosition = [5, 72, 52];
const ogCameraPosition = [25, 100, 300];
const ogTarget = [0, 0, 0];
const zoomedInTarget = [0, 70, 0];

export default function Scene({
  accessories,
  textureUrl,
  mood,
  bgColor,
  paused,
  textureHD,
  zoomedIn,
  questMode,
}: Props) {
  const router = useRouter();
  const { debug } = router.query;
  const [datData, setDatData] = useState<Offset>({});
  const cameraPosition = useMemo(
    () =>
      zoomedIn
        ? new Vector3(...zoomedInCameraPosition)
        : new Vector3(...ogCameraPosition),
    [zoomedIn]
  );
  const controlsTarget = useMemo(
    () => (zoomedIn ? zoomedInTarget : ogTarget),
    [zoomedIn]
  );

  return (
    <div
      className="three-container fixed inset-0"
      style={{ backgroundColor: bgColor }}
    >
      <Canvas
        linear
        camera={{
          fov: 45,
          near: 1,
          far: 2000,
          position: cameraPosition,
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
        <Suspense fallback={null}>
          <Manny
            scale={1}
            position={[0, -85, 0]}
            paused={paused}
            animation={mood}
            textureUrl={getTextureURL(textureUrl, textureHD)}
            accessories={accessories}
            datData={datData}
          />
        </Suspense>
        <Controls target={controlsTarget} />
        <CameraZoom
          zoomedIn={zoomedIn}
          zoomedInCameraPosition={zoomedInCameraPosition}
          ogCameraPosition={ogCameraPosition}
        />
        <Lighting />
        {questMode === 'corruption' && <AsciiRenderer invert />}
        <Environment preset="warehouse" />
      </Canvas>
      {debug !== undefined && (
        <AccessoryGUI setDatData={setDatData} datData={datData} />
      )}
    </div>
  );
}
