import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { NoToneMapping, sRGBEncoding, Vector3 } from 'three';
import { Manny, Controls, Lighting, CameraZoom } from '@/components/three';
import AsciiRenderer from '@/views/token/Quests/AsciiRenderer';
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

const getTextureURL = (textureUrl: string, textureHD: boolean) => {
  if (textureUrl.includes('textures-small') && textureHD) {
    return textureUrl.replace('textures-small', 'textures-hd');
  }
  return textureUrl;
};

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
  const zoomedInCameraPosition = [5, 72, 52];
  const ogCameraPosition = [25, 100, 300];
  const cameraPosition = zoomedIn
    ? new Vector3(...zoomedInCameraPosition)
    : new Vector3(...ogCameraPosition);
  const ogTarget = [0, 0, 0];
  const zoomedInTarget = [0, 70, 0];
  const controlsTarget = zoomedIn ? zoomedInTarget : ogTarget;

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
      </Canvas>
    </div>
  );
}
