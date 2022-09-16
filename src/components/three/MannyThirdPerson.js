import ThirdPersonCharacterControls from 'react-three-third-person';
import manny from 'manny';

import { useAccessories } from 'hooks';

const HOST = 'https://mannys-game.s3.amazonaws.com';
const BASE_ANIMATIONS_PATH = `${HOST}/third-person/animations`;

const animationPaths = {
  idle: `${BASE_ANIMATIONS_PATH}/idle.glb`,
  walk: `${BASE_ANIMATIONS_PATH}/walk.glb`,
  run: `${BASE_ANIMATIONS_PATH}/run.glb`,
  jump: `${BASE_ANIMATIONS_PATH}/jump.glb`,
  landing: `${BASE_ANIMATIONS_PATH}/landing.glb`,
  inAir: `${BASE_ANIMATIONS_PATH}/falling_idle.glb`,
  backpedal: `${BASE_ANIMATIONS_PATH}/backpedal.glb`,
  turnLeft: `${BASE_ANIMATIONS_PATH}/turn_left.glb`,
  turnRight: `${BASE_ANIMATIONS_PATH}/turn_right.glb`,
  strafeLeft: `${BASE_ANIMATIONS_PATH}/strafe_left.glb`,
  strafeRight: `${BASE_ANIMATIONS_PATH}/strafe_right.glb`,
};

const MannyThirdPerson = ({ textureUrl, accessories }) => {
  // load mannny fbx with chosen texture
  const mannyObj = manny({
    modelPath: `${HOST}/third-person/manny.fbx`, // use special model scaled to fit smaller world
    textureUrl,
  });
  // add any chosen accessories
  useAccessories(mannyObj, accessories);

  return (
    <ThirdPersonCharacterControls
      cameraOptions={{
        yOffset: 1.6,
        minDistance: 0.6,
        maxDistance: 7,
        collisionFilterMask: 2,
      }}
      characterObj={mannyObj}
      animationPaths={animationPaths}
    />
  );
};

export default MannyThirdPerson;
