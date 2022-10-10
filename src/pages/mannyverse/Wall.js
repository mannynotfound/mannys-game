import { useBox } from '@react-three/cannon';

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

export default Wall;
