export const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_ID;
export const ETHERSCAN_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_KEY;
export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const MANNY_CONTRACT = '0x2bd58A19C7E4AbF17638c5eE6fA96EE5EB53aed9';
export const MANNY_DAO = '0xd0fA4e10b39f3aC9c95deA8151F90b20c497d187';
export { default as MANNY_ABI } from '@/fixtures/contracts/MANNYSGAMEabi';

const AWS_BASE = 'https://mannys-game.s3.us-east-1.amazonaws.com';
export const TEXTURES_HOST = `${AWS_BASE}/textures-small`;
export const MODELS_HOST = `${AWS_BASE}/models`;
export const ACCESSORIES_HOST = `${AWS_BASE}/accessories`;
export const MANNY_TEXTURE_DEFAULT = `${TEXTURES_HOST}/1.jpg`;
export const MANNY_FBX =
  'https://d2tm2f4d5v0kas.cloudfront.net/Manny_3.0.0.fbx';
const CLIPS_HOST = 'https://d2tm2f4d5v0kas.cloudfront.net/clips';

const inwardslash = `${CLIPS_HOST}/inwardslash.fbx`;
const downwardswing = `${CLIPS_HOST}/downwardswing.fbx`;
const horizontalswing = `${CLIPS_HOST}/horizontalswing.fbx`;
const thrust = `${CLIPS_HOST}/thrust.fbx`;
const swordrun = `${CLIPS_HOST}/swordrun.fbx`;
const spellcast = `${CLIPS_HOST}/spellcast.fbx`;
const spellcast2h = `${CLIPS_HOST}/spellcast2h.fbx`;
const battlecry = `${CLIPS_HOST}/battlecry.fbx`;
const holdingHands = `${CLIPS_HOST}/holdinghandsv2.fbx`;
const sitidle = `${CLIPS_HOST}/sitidle.fbx`;

export const LIBRARY: {
  [name: string]: {
    url: string;
    async?: boolean;
  };
} = {
  'inward slash': {
    url: inwardslash,
    async: true,
  },
  'downward swing': {
    url: downwardswing,
    async: true,
  },
  thrust: {
    url: thrust,
    async: true,
  },
  'horizontal swing': {
    url: horizontalswing,
    async: true,
  },
  'sword run': { url: swordrun, async: true },
  spellcast: { url: spellcast, async: true },
  'spellcast 2h': { url: spellcast2h, async: true },
  battlecry: { url: battlecry, async: true },
  holdingHands: { url: holdingHands, async: true },
  sitidle: { url: sitidle, async: true },
};
