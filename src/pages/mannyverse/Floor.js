import { useBox } from '@react-three/cannon';

const Floor = () => {
  const [ref] = useBox(() => ({
    type: 'Static',
    args: [50, 0.2, 50],
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
      <gridHelper args={[50, 50]} />
    </group>
  );
};

export default Floor;
