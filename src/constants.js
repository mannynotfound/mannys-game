export const INFURA_ID = process.env.REACT_APP_INFURA_ID;
export const ETHERSCAN_KEY = process.env.REACT_APP_ETHERSCAN_KEY;
export const API_HOST = window.location.host.includes('localhost')
  ? 'http://localhost:3001'
  : 'https://mannys-game-server.herokuapp.com';
export const MANNY_CONTRACT = '0x2bd58A19C7E4AbF17638c5eE6fA96EE5EB53aed9';
export { default as MANNY_ABI } from './contracts/MannysGame.abi';

const AWS_BASE = 'https://mannys-game.s3.us-east-1.amazonaws.com';
export const TEXTURES_HOST = `${AWS_BASE}/textures-small`;
export const MODELS_HOST = `${AWS_BASE}/models`;
export const MANNY_TEXTURE_DEFAULT = `${TEXTURES_HOST}/1.jpg`;
export const MANNY_FBX =
  'https://d2tm2f4d5v0kas.cloudfront.net/Manny_3.0.0.fbx';
const CLIPS_HOST = 'https://d2tm2f4d5v0kas.cloudfront.net/clips';

const idle = `${CLIPS_HOST}/idle_stand.fbx`;
const cheering = `${CLIPS_HOST}/cheer.fbx`;
const agony = `${CLIPS_HOST}/agony.fbx`;
const bored = `${CLIPS_HOST}/bored.fbx`;
const ecstatic = `${CLIPS_HOST}/ecstatic.fbx`;
const drunk = `${CLIPS_HOST}/drunk.fbx`;
const thankful = `${CLIPS_HOST}/thankful.fbx`;
const bashful = `${CLIPS_HOST}/bashful.fbx`;
const cocky = `${CLIPS_HOST}/cocky.fbx`;
const victory = `${CLIPS_HOST}/cheer.fbx`;
const spellcast = `${CLIPS_HOST}/spellcast.fbx`;
const inwardslash = `${CLIPS_HOST}/inwardslash.fbx`;
const downwardswing = `${CLIPS_HOST}/downwardswing.fbx`;
const horizontalswing = `${CLIPS_HOST}/horizontalswing.fbx`;
const thrust = `${CLIPS_HOST}/thrust.fbx`;
const swordrun = `${CLIPS_HOST}/swordrun.fbx`;
const spellcast2h = `${CLIPS_HOST}/spellcast2h.fbx`;
const battlecry = `${CLIPS_HOST}/battlecry.fbx`;
const holdingHands = `${CLIPS_HOST}/holdinghandsv2.fbx`;
const sitidle = `${CLIPS_HOST}/sitidle.fbx`;
const float = `${CLIPS_HOST}/float.fbx`;
const teeter = `${CLIPS_HOST}/teeter.fbx`;
const waving = `${CLIPS_HOST}/waving.fbx`;

export const LIBRARY = {
  idle,
  cheering,
  agony,
  bored,
  ecstatic,
  spellcast,
  drunk,
  thankful,
  bashful,
  cocky,
  victory,
  'inward slash': inwardslash,
  'downward swing': downwardswing,
  thrust,
  'horizontal swing': horizontalswing,
  'sword run': swordrun,
  'spellcast 2h': spellcast2h,
  battlecry,
  holdingHands,
  sitidle,
  float,
  teeter,
  waving,
};
