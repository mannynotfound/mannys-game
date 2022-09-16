import { useEffect, forwardRef } from 'react';
import { OrbitControls } from '@react-three/drei';

const Controls = forwardRef((props, orbitRef) => {
  useEffect(() => {
    if (orbitRef?.current) {
      orbitRef.current.reset();
      orbitRef.current.target.set(...(props.target ?? [0, 0, 0]));
      orbitRef.current.update();
    }
  }, []);

  return <OrbitControls ref={orbitRef} {...props} />;
});

export default Controls;
