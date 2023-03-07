import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3, Mesh } from 'three';

type Props = {
  positionY: number;
  positionZ: number;
};

export default function Podium({ positionY, positionZ }: Props) {
  const podiumRef = useRef();

  useFrame(() => {
    const vec = new Vector3(0, positionY, positionZ);
    // if y changes, just copy position, but if z changes lerp the position
    if (podiumRef.current === undefined) return;
    const podiumMesh = podiumRef.current as Mesh;
    if (vec.y !== podiumMesh.position.y) {
      podiumMesh.position.copy(vec);
    } else if (vec.z !== podiumMesh.position.z) {
      podiumMesh.position.lerp(vec, 0.25);
    }
  });

  return (
    <mesh position={[0, -500, -10]} scale={[80, 20, 40]} ref={podiumRef}>
      <boxGeometry name="podium" />
      <meshStandardMaterial wireframe />
    </mesh>
  );
}
