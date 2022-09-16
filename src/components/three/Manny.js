import { useEffect, useState } from 'react';
import manny from 'manny';

import { useAccessories } from 'hooks';
import { MANNY_TEXTURE_DEFAULT, MANNY_FBX, LIBRARY } from 'constants';

const Manny = ({
  tokenId = 1,
  textureUrl = MANNY_TEXTURE_DEFAULT,
  useTextureHD = false,
  animation = 'idle',
  paused = false,
  accessories = {},
  onLoad = undefined,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}) => {
  const [hdTexture, setHdTexture] = useState({});
  const [loaded, setLoaded] = useState(false);

  const animationOptions = {
    active: animation,
    paused,
    // only pass in selected path so initial load doesnt take forever
    paths: {
      [animation]: LIBRARY[animation],
    },
  };

  const mannyObj = manny({
    modelPath: MANNY_FBX,
    textureUrl: hdTexture?.[tokenId] || textureUrl,
    animationOptions,
  });

  useAccessories(mannyObj, accessories);

  useEffect(() => {
    if (useTextureHD && !hdTexture?.[tokenId]) {
      setHdTexture({
        ...hdTexture,
        [tokenId]: textureUrl.replace('textures-small', 'textures-hd'),
      });
    }
  }, [useTextureHD, tokenId]);

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      if (onLoad) onLoad(mannyObj);
    }
  }, [mannyObj]);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <primitive object={mannyObj} dispose={null} />
    </group>
  );
};

export default Manny;
