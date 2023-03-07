import { useEffect, forwardRef, ForwardedRef, MutableRefObject } from 'react';
import { Vector3 } from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { OrbitControls } from '@react-three/drei';

type Props = {
  target: number[];
  minDistance: number;
  maxDistance: number;
  enableDamping: boolean;
};

export default forwardRef(function Controls(
  props: Props,
  orbitRef: ForwardedRef<OrbitControlsImpl>
) {
  useEffect(() => {
    const orbControls = orbitRef as MutableRefObject<OrbitControlsImpl>;
    if (orbControls.current) {
      orbControls.current.reset();
      orbControls.current.target.set(
        props.target[0],
        props.target[1],
        props.target[2]
      );
      orbControls.current.update();
    }
  }, [orbitRef, props.target]);

  return <OrbitControls ref={orbitRef} target={new Vector3(...props.target)} />;
});
