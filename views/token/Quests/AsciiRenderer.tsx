import { useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { AsciiEffect } from 'three-stdlib';

const AsciiRenderer = ({
  renderIndex = 1,
  characters = ' .:-+*=%@#',
  ...options
}) => {
  const { size, gl, scene, camera } = useThree();

  const effect = useMemo(() => {
    const effect = new AsciiEffect(gl, characters, options);
    effect.domElement.style.position = 'absolute';
    effect.domElement.style.top = '0px';
    effect.domElement.style.left = '0px';
    effect.domElement.style.color = '#FF44B7';
    effect.domElement.style.backgroundColor = 'black';
    effect.domElement.style.pointerEvents = 'none';
    return effect;
  }, [characters, options.invert]);

  useEffect(() => {
    gl.domElement.parentNode?.appendChild(effect.domElement);
    return () => {
      gl.domElement.parentNode?.removeChild(effect.domElement);
    };
  }, [effect]);

  useEffect(() => {
    effect.setSize(size.width, size.height);
  }, [effect, size]);

  useFrame(() => {
    effect.render(scene, camera);
  }, renderIndex);

  return null;
};

export default AsciiRenderer;
