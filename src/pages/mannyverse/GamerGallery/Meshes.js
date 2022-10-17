import * as THREE from 'three';
import { Geometry } from 'three-stdlib';
import { useMemo } from 'react';
import { useConvexPolyhedron, useBox } from '@react-three/cannon';

function toConvexProps(bufferGeometry) {
  const geo = new Geometry().fromBufferGeometry(bufferGeometry);

  // Merge duplicate vertices resulting from glTF export.
  // Cannon assumes contiguous, closed meshes to work
  geo.mergeVertices();

  return [
    geo.vertices.map((v) => [v.x, v.y, v.z]),
    geo.faces.map((f) => [f.a, f.b, f.c]),
    [],
  ];
}

const colliderProps = {
  type: 'Static',
  mass: 0,
  collisionFilterGroup: 2,
  material: {
    friction: 0,
    name: 'gallery-bounds',
  },
};

const transparent = new THREE.MeshPhongMaterial({
  opacity: 0,
  transparent: true,
});

export const Mesh = (props) => <mesh castShadow receiveShadow {...props} />;

export const ColliderMesh = (props) => {
  const { geometry, position, rotation } = props;
  const meshGeo = useMemo(() => toConvexProps(geometry), []);

  const [colliderRef] = useConvexPolyhedron(() => ({
    ...colliderProps,
    position: position ?? [0, 0, 0],
    rotation: rotation ?? [0, 0, 0],
    args: meshGeo,
  }));

  return <mesh ref={colliderRef} material={transparent} {...props} />;
};

export const TriggerMesh = ({
  args,
  position,
  onCollideEnd,
  onCollideBegin,
}) => {
  const [ref] = useBox(() => ({
    ...colliderProps,
    position,
    args,
    isTrigger: true,
    onCollideBegin,
    onCollideEnd,
  }));

  return (
    <mesh ref={ref} position={position} material={transparent}>
      <boxGeometry args={args} />
    </mesh>
  );
};
