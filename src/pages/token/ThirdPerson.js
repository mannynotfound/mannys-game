import { Suspense, useEffect, useReducer } from 'react';
import { withRouter } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Physics, Debug, useBox } from '@react-three/cannon';

import { Backpack } from 'components/Svg';
import { Lighting, MannyThirdPerson } from 'components/three';
import { parseToken } from 'utils';
import reducer from './reducer';
import Bag from './Bag';

const storageKey = 'manny-accessories';

const initialState = {
  bagOpen: false,
  accessories: {},
};

const TokenTools = ({ state, dispatch }) => {
  const { bagOpen } = state;
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

  return (
    <div className="w-full flex items-center justify-end">
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

const Floor = () => {
  const [ref] = useBox(() => ({
    type: 'Static',
    args: [25, 0.2, 25],
    mass: 0,
    material: {
      friction: 0,
      name: 'floor',
    },
    collisionFilterGroup: 2,
  }));
  return (
    <group>
      <mesh ref={ref}>
        <boxGeometry name="floor-box" />
        <meshPhongMaterial opacity={0} transparent />
      </mesh>
      <gridHelper args={[25, 25]} />
    </group>
  );
};

const Wall = ({ args, ...props }) => {
  const [ref] = useBox(() => ({
    type: 'Static',
    args,
    mass: 0,
    material: {
      friction: 0.3,
      name: 'wall',
    },
    collisionFilterGroup: 2,
    ...props,
  }));
  return (
    <mesh receiveShadow ref={ref} {...props}>
      <boxGeometry args={args} />
      <meshPhongMaterial color="white" opacity={0.8} transparent />
    </mesh>
  );
};

const Token = (props) => {
  const [state, dispatch] = useReducer(reducer, [], (initial) => ({
    ...initial,
    ...initialState,
    accessories: JSON.parse(localStorage.getItem(storageKey)) || {},
  }));

  const { bagOpen, accessories } = state;

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(accessories));
  }, [accessories]);

  const { tokenId, textureUrl } = parseToken(props, state);
  const tokenAccessories = accessories?.[tokenId] ?? {};

  return (
    <>
      <div className="three-container fixed inset-0">
        <Canvas
          camera={{
            fov: 75,
            near: 0.1,
            far: 3800,
            position: [0, 44, 44],
          }}
          gl={{ preserveDrawingBuffer: true }}
          flat
        >
          <Physics gravity={[0, -35, 0]}>
            <Debug color="lime">
              <Suspense fallback={null}>
                <MannyThirdPerson
                  textureUrl={textureUrl}
                  accessories={tokenAccessories}
                />
              </Suspense>
              <Wall args={[25, 3, 0.2]} position={[0, 1.4, -12.6]} />
              <Wall args={[25, 3, 0.2]} position={[0, 1.4, 12.6]} />
              <Wall
                args={[25, 3, 0.2]}
                rotation={[0, -Math.PI / 2, 0]}
                position={[12.6, 1.4, 0]}
              />
              <Wall
                args={[25, 3, 0.2]}
                rotation={[0, -Math.PI / 2, 0]}
                position={[-12.6, 1.4, 0]}
              />
              <Floor />
            </Debug>
          </Physics>
          <Lighting />
        </Canvas>
      </div>
      <div className="fixed bottom-0 p-8 w-full flex" style={{ height: 200 }}>
        <div className="flex-1 flex items-center text-right">
          <TokenTools state={state} dispatch={dispatch} />
        </div>
        <div
          className="absolute left-0 w-full text-center opacity-50 text-white"
          style={{ bottom: 30 }}
        >
          WASD = Move, Left Drag = Free Camera, Right Drag = Locked Camera
        </div>
      </div>
      {bagOpen && (
        <Bag {...props} tokenId={tokenId} state={state} dispatch={dispatch} />
      )}
    </>
  );
};

export default withRouter((props) => <Token {...props} />);
