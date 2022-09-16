import { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { useSpring } from '@react-spring/three';
import { useFrame } from '@react-three/fiber';
import { useFBX } from '@react-three/drei';

export const DAO_LOGO_FBX = '/misc/mannyDAOlogomark.fbx';

const DAOLogo = ({ onLoad, scale, rotation }) => {
  const groupRef = useRef();
  const [loaded, setLoaded] = useState(false);
  const fbx = useFBX(DAO_LOGO_FBX);

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      if (onLoad) onLoad(fbx);
    }
  }, [fbx]);

  const styles = useSpring({
    loop: { reverse: true },
    from: { y: 45 },
    to: { y: 35 },
    config: { duration: 3000 },
  });

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.y = styles.y.get();
    }
  });

  return (
    <group ref={groupRef} rotation={rotation} scale={scale}>
      <primitive
        object={fbx}
        dispose={null}
        children-0-material-color={new THREE.Color(
          0x70bf44
        ).convertSRGBToLinear()}
      />
    </group>
  );
};

export default DAOLogo;
