import { BufferGeometryNode, extend } from '@react-three/fiber';
import { Color, CubeTexture, Euler, Vector3 } from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import Helvetiker from '@/components/three/helvetiker_regular.typeface.json';

extend({ TextGeometry });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      textGeometry: BufferGeometryNode<TextGeometry, typeof TextGeometry>;
    }
  }
}

const font = new FontLoader().parse(Helvetiker);

type Props = {
  text: string;
  color?: Color;
  position?: number[];
  rotation?: number[];
  size?: number;
  height?: number;
  curveSegments?: number;
  envMap?: CubeTexture;
};

export default function Text3D({
  text,
  color = new Color(0x70bf44).convertSRGBToLinear(),
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  size = 6,
  height = 2,
  curveSegments = 12,
  envMap,
}: Props) {
  return (
    <mesh position={new Vector3(...position)} rotation={new Euler(...rotation)}>
      <textGeometry args={[text, { font, size, height, curveSegments }]} />
      {envMap === undefined ? (
        <meshBasicMaterial
          attach="material"
          color={color}
          reflectivity={0}
          refractionRatio={0}
        />
      ) : (
        <meshLambertMaterial attach="material" color={color} envMap={envMap} />
      )}
    </mesh>
  );
}
