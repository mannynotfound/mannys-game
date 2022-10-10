import * as THREE from 'three';
import { useEffect, useMemo } from 'react';
import { useConvexPolyhedron } from '@react-three/cannon';
import { useGLTF } from '@react-three/drei';
import { MODELS_HOST } from 'constants';
import { Geometry } from 'three-stdlib';

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

const Mesh = (props) => <mesh castShadow receiveShadow {...props} />;

const ColliderMesh = (props) => {
  const { geometry, position, rotation } = props;
  const meshGeo = useMemo(() => toConvexProps(geometry), []);

  const [colliderRef] = useConvexPolyhedron(() => ({
    ...colliderProps,
    position: position ?? [0, 0, 0],
    rotation: rotation ?? [0, 0, 0],
    args: meshGeo,
  }));

  return <mesh ref={colliderRef} {...props} />;
};

const GamerGallery = ({ onLoad, ...props }) => {
  const { nodes, materials } = useGLTF(`${MODELS_HOST}/gallery_404_v2.glb`);

  useEffect(() => {
    onLoad();
  }, []);

  const transparent = new THREE.MeshPhongMaterial({
    opacity: 0,
    transparent: true,
  });

  return (
    <group {...props} dispose={null}>
      <group position={[0, 0, 0]}>
        <Mesh
          geometry={nodes.b_22_gamer_room_cables_mesh.geometry}
          material={materials.gamer_room_cable}
          position={[-8.25, 7.45, -5.2]}
        />
        <Mesh
          geometry={nodes.b_22_gamer_room_computer_glass_pbr.geometry}
          material={materials['Material.007']}
          position={[-8.54, 7.61, -4.18]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <Mesh
          geometry={nodes.b_22_reception_rinse_table_faucet_pbr.geometry}
          material={materials['Material.008']}
          position={[-16.62, -0.09, -10.77]}
          scale={0.84}
        />
        <Mesh
          geometry={
            nodes.b_22_reception_soylent_distribution_glass_pbr.geometry
          }
          material={materials['Material.007']}
          position={[-14.12, 0.79, -10.54]}
          scale={0.86}
        />
        <Mesh
          geometry={nodes.b_22_roof_bis_dome_pbr.geometry}
          material={materials['Material.007']}
          position={[-4.04, 0.11, 2.1]}
        />
        <Mesh
          geometry={nodes.b_22_reception_soylent.geometry}
          material={materials.soylent}
          position={[-14.54, 1.07, -9.97]}
          scale={0.86}
        />
        <Mesh
          geometry={nodes.b_22_reception_soylent001.geometry}
          material={materials.soylent}
          position={[-14.54, 1.07, -10.11]}
          scale={0.86}
        />
        <Mesh
          geometry={nodes.b_22_reception_soylent002.geometry}
          material={materials.soylent}
          position={[-14.54, 1.07, -10.24]}
          scale={0.86}
        />
        <Mesh
          geometry={nodes.b_22_reception_soylent003.geometry}
          material={materials.soylent}
          position={[-14.54, 1.07, -10.38]}
          scale={0.86}
        />
        <Mesh
          geometry={nodes.b_22_reception_soylent004.geometry}
          material={materials.soylent}
          position={[-14.54, 1.07, -10.53]}
          scale={0.86}
        />
        <Mesh
          geometry={nodes.b_5_404_Baked.geometry}
          material={materials.BG5_Baked}
          position={[3.18, 1.55, -11.31]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <Mesh
          geometry={nodes.b_7_game_room_computer_mouse_Baked.geometry}
          material={materials.BG7_Baked}
          position={[-8.74, 6.97, -5.53]}
          rotation={[-0.06, 0.31, 0.01]}
        />
        <Mesh
          geometry={nodes.b_7_gamer_room_bin_Baked.geometry}
          material={materials.BG7_Baked}
          position={[-8.37, 6.02, -8.42]}
        />
        <Mesh
          geometry={nodes.b_7_gamer_room_power_plugs_Baked.geometry}
          material={materials.BG7_Baked}
          position={[-8.28, 6.04, -3.11]}
        />
        <Mesh
          geometry={nodes.b_7_gamer_room_screen_stand_Baked.geometry}
          material={materials.BG7_Baked}
          position={[-8.05, 7.01, -5.83]}
        />
        <Mesh
          geometry={nodes.b_1_roof_bis_Baked.geometry}
          material={materials.BG1_Baked}
          position={[-4.04, -0.07, 2.1]}
        />
        <Mesh
          geometry={nodes.b_1_roof_bis_luiffels_Baked.geometry}
          material={materials.BG1_Baked}
          position={[-4.04, -0.07, 2.1]}
        />
        <Mesh
          geometry={nodes.b_4_gamer_room_stairs_grip_Baked.geometry}
          material={materials.BG4_Baked}
          position={[-12.54, 6.05, -6.41]}
        />
        <Mesh
          geometry={nodes.b_4_general_i_beam_gamer_room_bis_Baked.geometry}
          material={materials.BG4_Baked}
          position={[-11.94, 5.31, -1.07]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
        />
        <Mesh
          geometry={nodes.b_4_general_i_beams_Baked.geometry}
          material={materials.BG4_Baked}
          position={[-17.27, 10.77, 2.11]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <Mesh
          geometry={nodes.b_4_general_pillars_Baked.geometry}
          material={materials.BG4_Baked}
          position={[20.75, -0.01, -11.3]}
        />
        <Mesh
          geometry={nodes.b_4_roof_bars_Baked.geometry}
          material={materials.BG4_Baked}
          position={[-4.04, 0.1, 2.1]}
        />
        <Mesh
          geometry={nodes.b_4_roof_bis_luiffels_bars_Baked.geometry}
          material={materials.BG4_Baked}
          position={[-4.04, 2.9, 2.1]}
        />
        <Mesh
          geometry={nodes.b_6_gamer_room_chair_Baked.geometry}
          material={materials.BG6_Baked}
          position={[-10.03, 6.01, -5.8]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={1.31}
        />
        <Mesh
          geometry={nodes.b_6_gamer_room_computer_Baked.geometry}
          material={materials.BG6_Baked}
          position={[-8.55, 7.61, -4.18]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <Mesh
          geometry={nodes.b_6_gamer_room_keyboard_Baked.geometry}
          material={materials.BG6_Baked}
          position={[-8.78, 7.01, -6.22]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <Mesh
          geometry={nodes.b_6_gamer_room_monitor_1_Baked.geometry}
          material={materials.BG6_Baked}
          position={[-8.22, 7.69, -6.38]}
          rotation={[-Math.PI / 2, 0, 0.22]}
        />
        <Mesh
          geometry={nodes.b_6_gamer_room_monitor_2_Baked.geometry}
          material={materials.BG6_Baked}
          position={[-8.3, 7.69, -5.18]}
          rotation={[0, -0.33, 0]}
        />
        <Mesh
          geometry={nodes.b_6_gamer_room_reception_soylent_Baked.geometry}
          material={materials.BG6_Baked}
          position={[-8.37, 6.11, -8.35]}
          rotation={[-2.22, 0.66, 2.47]}
        />
        <Mesh
          geometry={nodes.b_8_gamer_room_bed_pillow_Baked.geometry}
          material={materials.BG8_Baked}
          position={[-15.96, 6.31, -4.92]}
          rotation={[0, 0, -Math.PI]}
          scale={-1}
        />
        <Mesh
          geometry={nodes.b_8_gamer_room_bed_power_plug_Baked.geometry}
          material={materials.BG8_Baked}
          position={[-13.96, 6.06, -3.16]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <Mesh
          geometry={nodes.b_8_gamer_room_blanket_Baked.geometry}
          material={materials.BG8_Baked}
          position={[-16.09, 6.43, -6.93]}
          rotation={[-0.07, 0, -Math.PI]}
          scale={-1}
        />
        <Mesh
          geometry={nodes.b_9_reception_bagel_plate_Baked.geometry}
          material={materials.BG9_Baked}
          position={[-16.53, 1.25, -10.74]}
          rotation={[0, 0.79, 0]}
        />
        <Mesh
          geometry={nodes.b_9_reception_bagels_Baked.geometry}
          material={materials.BG9_Baked}
          position={[-16.58, 1.32, -10.76]}
        />
        <Mesh
          geometry={nodes.b_9_reception_bagels_Baked001.geometry}
          material={materials.BG9_Baked}
          position={[-16.47, 1.37, -10.7]}
        />
        <Mesh
          geometry={nodes.b_9_reception_rinse_table_Baked.geometry}
          material={materials.BG9_Baked}
          position={[-16.62, -0.09, -10.77]}
          scale={0.84}
        />
        <Mesh
          geometry={nodes.b_9_reception_room_cables_mesh_Baked.geometry}
          material={materials.BG9_Baked}
          position={[-13.8, 1.78, -11.2]}
          scale={0.86}
        />
        <Mesh
          geometry={nodes.b_9_reception_room_power_plug_Baked.geometry}
          material={materials.BG9_Baked}
          position={[-14.65, 0.36, -11.58]}
          scale={0.86}
        />
        <Mesh
          geometry={nodes.b_9_reception_soylent_distribution_Baked.geometry}
          material={materials.BG9_Baked}
          position={[-14.12, 0.79, -10.54]}
          scale={0.86}
        />
        <Mesh
          geometry={nodes.b_11_door_Baked.geometry}
          material={materials.BG11_Baked}
          position={[-17.65, 2.45, -0.55]}
        />
        <Mesh
          geometry={nodes.b_11_gamer_room_stairs_Baked.geometry}
          material={materials.BG11_Baked}
          position={[-3.22, 3.11, -10.17]}
        />
        <Mesh
          geometry={nodes.b_22_gamer_room_screen_2.geometry}
          material={materials.gamer_room_screen_image_right}
          position={[-8.3, 7.69, -5.18]}
          rotation={[0, -0.33, 0]}
        />
        <Mesh
          geometry={nodes.b_22_gamer_room_screen_1.geometry}
          material={materials.gamer_room_screen_image}
          position={[-8.22, 7.69, -6.38]}
        />
        <Mesh
          geometry={nodes.b_3_reception_divider_wall_bis_Baked.geometry}
          material={materials.BG3_Baked}
          position={[-15.34, 0.3, -7.2]}
        />
      </group>
      <group position={[0, 0, 0]}>
        <Mesh
          geometry={nodes.b_5_chill_sofa_Baked.geometry}
          material={materials.BG5_Baked}
          position={[-7.82, -2.98, 8.68]}
        />
        <Mesh
          geometry={nodes.b_5_chill_tubes_Baked.geometry}
          material={materials.BG5_Baked}
          position={[-7.81, 11.05, 8.7]}
          rotation={[-Math.PI, 0, 0]}
        />
        <Mesh
          geometry={nodes.b_7_gamer_room_desk_Baked.geometry}
          material={materials.BG7_Baked}
          position={[-8.52, 5.88, -5.7]}
        />
        <Mesh
          geometry={nodes.b_8_gamer_room_bed_Baked.geometry}
          material={materials.BG8_Baked}
          position={[-16.3, 5.31, -6.59]}
          rotation={[0, 0, -Math.PI]}
          scale={-1}
        />
        <ColliderMesh
          geometry={nodes.b_3_gallery_divider_wall_Baked.geometry}
          material={materials.BG3_Baked}
          position={[29.98, -0.15, -4.68]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <Mesh
          geometry={nodes.b_3_gamer_room_wall_Baked.geometry}
          material={materials.BG3_Baked}
          position={[-9.12, 6.79, -2.98]}
        />
        <ColliderMesh
          receiveShadow
          geometry={nodes.b_2_chill_floor_round_Baked_collider.geometry}
          material={materials.BG2_Baked}
          position={[-7.82, -0.84, 8.63]}
        />
        <ColliderMesh
          receiveShadow
          geometry={nodes.b_2_floor_display_bis_Baked_collider.geometry}
          material={materials.BG2_Baked}
          position={[10.35, -0.06, -1.22]}
        />
        <Mesh
          geometry={nodes.b_2_gamer_room_floor_bis_Baked.geometry}
          material={materials.BG2_Baked}
          position={[-12.54, 5.83, -6.41]}
        />
        <ColliderMesh
          geometry={nodes.b_0_walls_bis_Baked.geometry}
          material={materials.b_0_walls_bis_Baked}
          position={[-4.04, -0.06, 2.1]}
        />
      </group>
      <group position={[0, 0, 0]}>
        <ColliderMesh
          geometry={nodes.collider_reception_refrigerator.geometry}
          material={transparent}
          position={[-12.4, 0.02, -10.49]}
        />
        <ColliderMesh
          geometry={nodes.collider_reception_sink.geometry}
          material={transparent}
          position={[-15.01, 0.02, -10.49]}
        />
        <ColliderMesh
          geometry={nodes.collider_reception_table.geometry}
          material={transparent}
          position={[-15.01, 0.02, -7.05]}
        />
        <ColliderMesh
          geometry={nodes.collider_stairs.geometry}
          material={transparent}
          position={[-2.17, 1.25, -10.06]}
        />
        <ColliderMesh
          geometry={nodes.collider_upper_floor.geometry}
          material={transparent}
          position={[-12.54, 5.83, -6.41]}
        />
        <ColliderMesh
          geometry={nodes.collider_upper_floor_bed.geometry}
          material={transparent}
          position={[-14.82, 6.84, -6.77]}
        />
        <ColliderMesh
          geometry={nodes.collider_upper_floor_desk.geometry}
          material={transparent}
          position={[-8.17, 6.84, -6.77]}
        />
        <ColliderMesh
          geometry={nodes.collider_upper_floor_wall.geometry}
          material={transparent}
          position={[-9.12, 6.79, -2.98]}
        />
      </group>
      {/* hide canvases for now
      <group position={[0, 0.49, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={nodes.Cube.material}
          position={[-7.83, 3.96, 8.69]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane.geometry}
          material={nodes.Plane.material}
          position={[15.13, 3.41, 1.77]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane001.geometry}
          material={nodes.Plane001.material}
          position={[7.47, 3.41, 1.77]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane002.geometry}
          material={nodes.Plane002.material}
          position={[44.59, 3.41, 23.6]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane003.geometry}
          material={nodes.Plane003.material}
          position={[34.83, 3.41, 23.6]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane004.geometry}
          material={nodes.Plane004.material}
          position={[25.09, 3.41, 23.65]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane005.geometry}
          material={nodes.Plane005.material}
          position={[44.33, 3.41, -11.43]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane006.geometry}
          material={nodes.Plane006.material}
          position={[34.86, 3.41, -11.43]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane007.geometry}
          material={nodes.Plane007.material}
          position={[25.09, 3.41, -11.55]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane008.geometry}
          material={nodes.Plane008.material}
          position={[29.92, 3.41, 20.16]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009.geometry}
          material={nodes.Plane009.material}
          position={[29.9, 3.41, 4.64]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane010.geometry}
          material={nodes.Plane010.material}
          position={[29.89, 3.41, -6.41]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane011.geometry}
          material={nodes.Plane011.material}
          position={[30.34, 3.41, 5.09]}
          rotation={[0, 1.57, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane012.geometry}
          material={nodes.Plane012.material}
          position={[30.34, 3.41, -6.81]}
          rotation={[0, 1.57, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane013.geometry}
          material={nodes.Plane013.material}
          position={[49.16, 3.41, 16.51]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane014.geometry}
          material={nodes.Plane014.material}
          position={[49.16, 3.41, -3.87]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane015.geometry}
          material={nodes.Plane015.material}
          position={[49.16, 3.41, 6.42]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane016.geometry}
          material={nodes.Plane016.material}
          position={[29.89, 3.41, -0.82]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane017.geometry}
          material={nodes.Plane017.material}
          position={[20.67, 3.41, 18.32]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane018.geometry}
          material={nodes.Plane018.material}
          position={[20.67, 3.41, 12.4]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane019.geometry}
          material={nodes.Plane019.material}
          position={[20.67, 3.41, 6.83]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane020.geometry}
          material={normal}
          position={[0, -0.07, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane021.geometry}
          material={nodes.Plane021.material}
          position={[-8.35, 3.91, 15.75]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane022.geometry}
          material={nodes.Plane022.material}
          position={[-17.7, 3.91, 8.36]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane023.geometry}
          material={nodes.Plane023.material}
          position={[2.43, 3.91, 8.36]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane024.geometry}
          material={nodes.Plane024.material}
          position={[30.34, 3.41, -0.77]}
          rotation={[0, 1.57, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane025.geometry}
          material={nodes.Plane025.material}
          position={[30.34, 3.41, 20.16]}
          rotation={[0, 1.57, 0]}
        />
      </group>
      */}
    </group>
  );
};

useGLTF.preload(`${MODELS_HOST}/mannys_game_oncyber.glb`);

export default GamerGallery;
