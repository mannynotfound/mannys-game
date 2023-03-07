import { useEffect, useState, useRef } from 'react';
import { Group, Color } from 'three';
import { useSpring } from '@react-spring/three';
import { useFrame } from '@react-three/fiber';
import { useFBX } from '@react-three/drei';

export const DAO_LOGO_FBX = '/misc/mannyDAOlogomark.fbx';

type Props = {
  onLoad: (logo: Group) => void;
};

export default function DAOLogo({ onLoad }: Props) {
  const groupRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const fbx = useFBX(DAO_LOGO_FBX);

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      if (onLoad) onLoad(fbx);
    }
  }, [fbx, loaded, onLoad]);

  const styles = useSpring({
    loop: { reverse: true },
    from: { y: 45 },
    to: { y: 35 },
    config: { duration: 3000 },
  });

  useFrame(() => {
    if (groupRef.current) {
      const daoGroup = groupRef.current as Group;
      daoGroup.position.y = styles.y.get();
    }
  });

  return (
    <group ref={groupRef}>
      <primitive
        object={fbx}
        dispose={null}
        children-0-material-color={new Color(0x70bf44).convertSRGBToLinear()}
      />
    </group>
  );
}
