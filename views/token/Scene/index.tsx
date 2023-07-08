import { Suspense, useCallback, useMemo, useState } from 'react';
import { Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useRouter } from 'next/router';
import { NoToneMapping, Vector3, sRGBEncoding } from 'three';
import { CameraZoom, Controls, Lighting, Manny } from '@/components/three';
import type { Offset } from '@/fixtures/accessories';
import { useAppDispatch } from '@/views/token/hooks';
import { getTextureURL } from '@/utils';
import type { TokenId } from '@/utils/types';
import { updateSceneCamera } from '@/views/token/reducer';
import { AccessoryGUI } from '../Debug';

type Props = {
  initialCameraPosition?: { x: number; y: number; z: number };
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
  onMannyLoad: () => void;
};

const zoomedInCameraPosition = [5, 72, 52];
const ogTarget = [0, 0, 0];
const zoomedInTarget = [0, 70, 0];

export default function Scene({
  initialCameraPosition,
  accessories,
  textureUrl,
  mood,
  bgColor,
  paused,
  textureHD,
  zoomedIn,
  onMannyLoad,
}: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { debug } = router.query;
  const [datData, setDatData] = useState<Offset>({});
  const cameraPosition = useMemo(() => {
    if (initialCameraPosition === undefined) {
      return undefined;
    }

    return zoomedIn
      ? new Vector3(...zoomedInCameraPosition)
      : new Vector3(...Object.values(initialCameraPosition));
  }, [zoomedIn, initialCameraPosition]);

  const controlsTarget = useMemo(
    () => (zoomedIn ? zoomedInTarget : ogTarget),
    [zoomedIn]
  );

  const onCameraChange = useCallback(
    (value: Vector3) => {
      dispatch(
        updateSceneCamera({
          value: {
            position: {
              x: value.x,
              y: value.y,
              z: value.z,
            },
          },
        })
      );
    },
    [dispatch]
  );

  if (cameraPosition === undefined) {
    return null;
  }

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
            key={textureUrl}
            scale={1}
            position={[0, -85, 0]}
            paused={paused}
            animation={mood}
            textureUrl={getTextureURL(textureUrl, textureHD)}
            accessories={accessories}
            datData={datData}
            onLoad={onMannyLoad}
          />
        </Suspense>
        <Controls
          target={controlsTarget}
          onChange={onCameraChange}
          enablePan={false}
        />
        <CameraZoom zoomedIn={zoomedIn} ogCameraPosition={cameraPosition} />
        <Lighting />
        <Environment preset="warehouse" />
      </Canvas>
      {debug !== undefined && (
        <AccessoryGUI setDatData={setDatData} datData={datData} />
      )}
    </div>
  );
}
