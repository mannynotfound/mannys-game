import { Suspense, useEffect, useRef, useReducer } from 'react';
import { withRouter } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

import { Chat } from 'components';
import { Backpack, Camera } from 'components/Svg';
import { Manny, Controls, Lighting } from 'components/three';
import { parseToken } from 'utils';
import reducer from './reducer';
import AsciiRenderer from './AsciiRenderer';
import ImageUpload from './ImageUpload';
import TokenInfo from './Info';
import CameraTools from './CameraTools';
import Bag from './Bag';

const storageKey = 'manny-accessories';

const initialState = {
  bagOpen: false,
  cameraOpen: false,
  imageUploadOpen: false,
  questMode: null,
  accessories: {},
  camera: {},
  useTextureHD: {},
};

const TokenTools = ({ state, dispatch }) => {
  const { bagOpen, cameraOpen } = state;
  const baseClasses = [
    'inline-block p-1 rounded-md relative',
    'border',
    'hover:text-yellow hover:border-yellow cursor-pointer',
  ];
  const bagClasses = [
    ...baseClasses,
    bagOpen ? 'border-yellow' : 'border-green',
    bagOpen ? 'text-yellow' : 'text-green',
  ];

  const cameraClasses = [
    'mr-2',
    ...baseClasses,
    cameraOpen ? 'border-yellow' : 'border-green',
    cameraOpen ? 'text-yellow' : 'text-green',
  ];

  return (
    <div className="w-full flex items-center justify-end">
      <div
        className={cameraClasses.join(' ')}
        onClick={() => {
          dispatch({ type: 'SET_CAMERA_OPEN', payload: !cameraOpen });
        }}
        style={{ minWidth: 50, minHeight: 50 }}
      >
        <div className="flex items-center absolute inset-0">
          <Camera height={30} width={30} className="mx-auto" />
        </div>
      </div>
      <div
        className={bagClasses.join(' ')}
        onClick={() => dispatch({ type: 'SET_BAG_OPEN', payload: !bagOpen })}
        style={{ minWidth: 50, minHeight: 50 }}
      >
        <Backpack height={40} width={20} className="mx-auto" />
      </div>
    </div>
  );
};

function Token(props) {
  const [state, dispatch] = useReducer(reducer, [], (initial) => ({
    ...initial,
    ...initialState,
    accessories: JSON.parse(localStorage.getItem(storageKey)) || {},
  }));
  const { camera, bagOpen, cameraOpen, accessories, imageUploadOpen } = state;
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(accessories));
  }, [accessories]);
  const { tokenId, textureUrl } = parseToken(props, state);
  const tokenAccessories = accessories?.[tokenId] ?? {};
  const tokenCamera = camera?.[tokenId] ?? {};
  const { zoomedIn, paused } = tokenCamera;
  const mood = tokenCamera?.mood ?? 'idle';
  const bgColor = tokenCamera?.bgColor ?? '#0e0e0e';
  const cameraRef = useRef();

  return (
    <>
      <div
        className="three-container fixed inset-0"
        style={{
          backgroundColor: bgColor,
        }}
      >
        <Canvas
          linear
          ref={cameraRef}
          camera={{
            fov: 45,
            near: 1,
            far: 2000,
            position: [25, 100, 300],
          }}
          gl={{
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true,
          }}
          onCreated={({ gl, scene }) => {
            gl.toneMapping = THREE.NoToneMapping;
            gl.outputEncoding = THREE.sRGBEncoding;
            window.THREE = THREE;
            window.scene = scene;
          }}
        >
          <Suspense fallback={null}>
            <Manny
              tokenId={tokenId}
              scale={1}
              position={[0, -85, 0]}
              paused={imageUploadOpen || paused}
              animation={mood}
              textureUrl={textureUrl}
              useTextureHD={state?.useTextureHD?.[tokenId]}
              accessories={tokenAccessories}
            />
          </Suspense>
          <Controls zoomedIn={zoomedIn} maxDistance={100000} />
          <Lighting />
          {state?.questMode === 'corruption' && <AsciiRenderer invert />}
        </Canvas>
      </div>
      {imageUploadOpen && <ImageUpload tokenId={tokenId} dispatch={dispatch} />}
      <div className="fixed bottom-0 p-8 w-full flex" style={{ height: 200 }}>
        <div className="flex-1 pr-8 select-none">
          {!zoomedIn && <Chat {...props} />}
        </div>
        {/* Use opacity here so dont need to re-request owner */}
        <div
          className={`flex-1 flex items-center justify-center text-center select-none ${
            zoomedIn && 'opacity-0 pointer-events-none'
          }`}
        >
          <TokenInfo {...props} />
        </div>
        <div className="flex-1 flex items-center text-right">
          <TokenTools state={state} dispatch={dispatch} />
        </div>
      </div>
      {bagOpen && (
        <Bag {...props} tokenId={tokenId} state={state} dispatch={dispatch} />
      )}
      {cameraOpen && (
        <CameraTools
          {...props}
          mood={mood}
          bgColor={bgColor}
          zoomedIn={zoomedIn}
          paused={paused}
          tokenId={tokenId}
          state={state}
          dispatch={dispatch}
        />
      )}
      {state.questMode === 'toadz' && (
        <div
          id="frogger-game"
          className={`fixed inset-0 flex items-center justify-center ${
            state.questMode === 'toadz'
              ? 'z-10'
              : 'z-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="relative" style={{ width: 480, height: 640 }}>
            <canvas
              id="frogger-canvas"
              className="absolute top-0 left-0 z-10"
              style={{ width: 480, height: 640 }}
              height={1280}
              width={960}
            />
            <canvas
              id="frogger-background-canvas"
              className="absolute top-0 left-0 z-0"
              style={{ width: 480, height: 640 }}
              height={1280}
              width={960}
            />
            <div
              className="absolute left-0 w-full text-center opacity-50 text-white"
              style={{ bottom: -30 }}
            >
              Use Arrow Keys or WASD to Move.
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default withRouter((props) => <Token {...props} />);
