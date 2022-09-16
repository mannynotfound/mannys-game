import { Suspense, useMemo } from 'react';
import * as THREE from 'three';
import { withRouter } from 'react-router-dom';
import { Canvas, extend, useLoader } from '@react-three/fiber';
import { useFBX } from '@react-three/drei';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

import { Controls, Helvetiker } from 'components/three';
import { MODELS_HOST } from 'constants';
import gamerPlaques from 'fixtures/gamer-plaques';

extend({ TextGeometry });
const font = new FontLoader().parse(Helvetiker);

function getFormattedDate(date) {
  const year = date.getFullYear();

  let month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;

  let day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;

  return month + '-' + day + '-' + year;
}

const Lighting = () => (
  <>
    <pointLight
      color={0xffffff}
      position={[0, 40, 80]}
      power={14}
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
    />
    <pointLight
      color={0xffffff}
      position={[0, 40, -80]}
      power={14}
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
    />
    <directionalLight
      color={0xffffff}
      intensity={0.25}
      castShadow
      shadow-camera-top={180}
      shadow-camera-right={120}
      shadow-camera-bottom={-100}
      shadow-camera-left={-120}
      position={[0, 240, 100]}
    />
  </>
);

const TextMesh = ({ rotation, position, size, text, envMap }) => (
  <mesh position={position} rotation={rotation || [-0.1, Math.PI, 0]}>
    <textGeometry args={[text, { font, size, height: 1, curveSegments: 12 }]} />
    <meshLambertMaterial
      attach="material"
      color={new THREE.Color('#DCC100')}
      envMap={envMap}
    />
  </mesh>
);

const Plaque = (props) => {
  const gamer = props?.match?.params?.gamer;
  const gamerMatch = Object.keys(gamerPlaques).find(
    (gm) => String(gm) === gamer
  );
  if (!gamerMatch) {
    console.warn(`${gamer} is invalid`);
    return;
  }
  const path = `${MODELS_HOST}/skybox/default-sky/`;
  const urls = [
    path + 'px.jpg',
    path + 'nx.jpg',
    path + 'py.jpg',
    path + 'ny.jpg',
    path + 'pz.jpg',
    path + 'nz.jpg',
  ];
  const [envMap] = useLoader(THREE.CubeTextureLoader, [urls]);
  const plaqueFBX = useFBX(`${MODELS_HOST}/plaque.fbx`);
  const plaqueModel = useMemo(() => plaqueFBX.clone(true), []);
  plaqueModel.children.forEach((mesh) => {
    envMap.flipY = true;
    mesh.material = new THREE.MeshLambertMaterial({
      color: 0xffee00,
      envMap,
    });
  });

  const sceneData = gamerPlaques[gamerMatch];
  const { name, address, dateEarned, size, posX, posY } = sceneData;

  return (
    <div
      className="three-container fixed inset-0"
      style={{ backgroundColor: 'rgb(14 14 14)' }}
    >
      <div
        style={{ maxWidth: 1800 }}
        className="w-full h-full mx-auto flex items-center"
      >
        <div style={{ paddingBottom: '100%' }} className="w-full h-0 relative">
          <div className="absolute inset-0">
            <Canvas
              linear
              camera={{
                fov: 45,
                near: 1,
                far: 2000,
                position: [0, 100, 300],
              }}
              onCreated={({ gl }) => {
                gl.toneMapping = THREE.LinearToneMapping;
                gl.outputEncoding = THREE.LinearEncoding;
              }}
            >
              <group position={[0, 0, 0]}>
                <group
                  scale={5}
                  position={[0, 5, 0]}
                  rotation={[0, -Math.PI / 2, 0.1]}
                >
                  <primitive object={plaqueModel} dispose={null} />
                </group>
                {envMap && (
                  <TextMesh
                    position={[posX || -15, posY || 25, 7]}
                    rotation={[-0.1, 0, 0]}
                    text={name}
                    size={size || 8}
                    envMap={envMap}
                  />
                )}
                <TextMesh
                  position={[22, 25, -12]}
                  text="Presented To"
                  size={5}
                  envMap={envMap}
                />
                <TextMesh
                  position={[42, 15, -11]}
                  text={address.slice(0, 21)}
                  size={5}
                  envMap={envMap}
                />
                <TextMesh
                  position={[42, 7, -10]}
                  text={address.slice(21, address.length)}
                  size={5}
                  envMap={envMap}
                />
                <TextMesh
                  position={[38, -7, -9]}
                  text="For Passing 1,000 Points"
                  size={5}
                  envMap={envMap}
                />
                <TextMesh
                  position={[25, -15, -8]}
                  text={`On ${getFormattedDate(new Date(dateEarned * 1000))}`}
                  size={5}
                  envMap={envMap}
                />
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter((props) => (
  <Suspense fallback={null}>
    <Plaque {...props} />
  </Suspense>
));
