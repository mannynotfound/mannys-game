import { useEffect, useRef } from 'react';
import { Color, Float32BufferAttribute } from 'three';
import { useHeightfield } from '@react-three/cannon';

/* Generates a 2D array using Worley noise. */
function generateHeightmap({ width, height, scale }) {
  const data = [];

  // use these static points to get predictable terrain
  const seedPoints = [
    [0.5951425652916382, 0.6336768553745298],
    [0.3109170747843124, 0.15687355656755275],
    [0.21477405042198017, 0.040280113281258245],
    [0.7565920339052294, 0.8040028839250799],
    [0.8624807375757535, 0.9366370434287525],
    [0.6816870707842415, 0.1563044084610581],
    [0.5239545109820556, 0.042950706958355456],
    [0.6924577046222378, 0.8529873350180708],
    [0.1214185301450208, 0.9859915045703571],
    [0.5201720475837974, 0.9214715448428954],
  ];

  // uncomment to generate a new terrain
  // const seedPoints = [];
  // for (let i = 0; i < 10; i++) {
  //   seedPoints.push([Math.random(), Math.random()]);
  // }

  let max = 0;
  for (let i = 0; i < width; i++) {
    const row = [];
    for (let j = 0; j < height; j++) {
      let min = Infinity;
      seedPoints.forEach((p) => {
        const distance2 = (p[0] - i / width) ** 2 + (p[1] - j / height) ** 2;
        if (distance2 < min) {
          min = distance2;
        }
      });
      const d = Math.sqrt(min);
      if (d > max) {
        max = d;
      }
      row.push(d);
    }
    data.push(row);
  }

  /* Normalize and scale. */
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      data[i][j] *= scale / max;
    }
  }
  return data;
}

const terrainColor = new Color('green');

const HeightmapGeometry = ({ elementSize, heights }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const dx = elementSize;
    const dy = elementSize;

    /* Create the vertex data from the heights. */
    const vertices = heights.flatMap((row, i) =>
      row.flatMap((z, j) => [i * dx, j * dy, z])
    );

    /* Create the faces. */
    const indices = [];
    for (let i = 0; i < heights.length - 1; i++) {
      for (let j = 0; j < heights[i].length - 1; j++) {
        const stride = heights[i].length;
        const index = i * stride + j;
        indices.push(index + 1, index + stride, index + stride + 1);
        indices.push(index + stride, index + 1, index);
      }
    }

    ref.current.setIndex(indices);
    ref.current.setAttribute(
      'position',
      new Float32BufferAttribute(vertices, 3)
    );
    ref.current.computeVertexNormals();
    ref.current.computeBoundingBox();
    ref.current.computeBoundingSphere();
  }, [heights]);

  return <bufferGeometry ref={ref} />;
};

const Terrain = ({ scale = 100 }) => {
  const elementSize = (scale * 1) / 128;
  const heights = generateHeightmap({
    height: 256,
    scale: 10,
    width: 256,
  });
  const position = [-scale / 2, -5.2, scale / 2];
  const rotation = [-Math.PI / 2, 0, 0];

  const [ref] = useHeightfield(
    () => ({
      args: [
        heights,
        {
          elementSize,
        },
      ],
      type: 'Static',
      mass: 0,
      collisionFilterGroup: 2,
      material: {
        friction: 0,
        name: 'terrain',
      },
      position,
      rotation,
    }),
    useRef(null)
  );

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <meshPhongMaterial color={terrainColor} />
      <HeightmapGeometry heights={heights} elementSize={elementSize} />
    </mesh>
  );
};

export default Terrain;
