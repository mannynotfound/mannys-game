import { Suspense } from 'react';
import type { Props } from '@/pages/plaque/[tokenId]';
import { useFBX } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import {
  Color,
  CubeTextureLoader,
  LinearEncoding,
  LinearToneMapping,
  Mesh,
  MeshLambertMaterial,
} from 'three';
import { Controls, Text3D } from 'components/three';
import useHasMounted from '@/hooks/useHasMounted';
import { MODELS_HOST } from '@/utils/constants';
import { getFormattedDate } from '@/views/plaque/utils';
import Lighting from '@/views/plaque/Lighting';

const Scene = ({ name, address, dateEarned, posX, posY, size }: Props) => {
  const path = `${MODELS_HOST}/skybox/default-sky/`;
  const urls = [
    path + 'px.jpg',
    path + 'nx.jpg',
    path + 'py.jpg',
    path + 'ny.jpg',
    path + 'pz.jpg',
    path + 'nz.jpg',
  ];
  const cubeTextureLoader = new CubeTextureLoader();
  const plaqueModel = useFBX(`${MODELS_HOST}/plaque.fbx`);
  const envMap = cubeTextureLoader.load(urls);
  plaqueModel.children.forEach((mesh) => {
    envMap.flipY = true;
    (mesh as Mesh).material = new MeshLambertMaterial({
      color: 0xffee00,
      envMap,
    });
  });

  const gold = new Color(0xdcc100);

  return (
    <Canvas
      linear
      camera={{
        fov: 45,
        near: 1,
        far: 2000,
        position: [0, 100, 300],
      }}
      onCreated={({ gl }) => {
        gl.toneMapping = LinearToneMapping;
        gl.outputEncoding = LinearEncoding;
      }}
    >
      <group position={[0, 0, 0]}>
        <group scale={5} position={[0, 5, 0]} rotation={[0, -Math.PI / 2, 0.1]}>
          <primitive object={plaqueModel} dispose={null} />
        </group>
        <Suspense fallback={null}>
          {envMap && (
            <Text3D
              position={[posX || -15, posY || 25, 7]}
              rotation={[-0.1, 0, 0]}
              text={name}
              size={size || 8}
              envMap={envMap}
              color={gold}
            />
          )}
          <Text3D
            position={[22, 25, -12]}
            text="Presented To"
            size={5}
            envMap={envMap}
            color={gold}
            rotation={[-0.1, Math.PI, 0]}
          />
          <Text3D
            position={[42, 15, -11]}
            text={address.slice(0, 21)}
            size={5}
            envMap={envMap}
            color={gold}
            rotation={[-0.1, Math.PI, 0]}
          />
          <Text3D
            position={[42, 7, -10]}
            text={address.slice(21, address.length)}
            size={5}
            envMap={envMap}
            color={gold}
            rotation={[-0.1, Math.PI, 0]}
          />
          <Text3D
            position={[38, -7, -9]}
            text="For Passing 1,000 Points"
            size={5}
            envMap={envMap}
            color={gold}
            rotation={[-0.1, Math.PI, 0]}
          />
          <Text3D
            position={[25, -15, -8]}
            text={`On ${getFormattedDate(new Date(dateEarned * 1000))}`}
            size={5}
            envMap={envMap}
            color={gold}
            rotation={[-0.1, Math.PI, 0]}
          />
        </Suspense>
      </group>
      <Controls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.5}
        minDistance={undefined}
        maxDistance={undefined}
      />
      <Lighting />
    </Canvas>
  );
};

export default function Plaque(plaqueProps: Props) {
  const hasMounted = useHasMounted();
  if (plaqueProps.address === undefined || !hasMounted) {
    console.warn(`route token is invalid`);
    return null;
  }

  return (
    <div className="three-container fixed inset-0 bg-[rgb(14 14 14)]">
      <div className="w-full h-full mx-auto flex items-center max-w-[1800px]">
        <div className="w-full h-0 relative pb-[100%]">
          <div className="absolute inset-0">
            <Scene {...plaqueProps} />
          </div>
        </div>
      </div>
    </div>
  );
}
