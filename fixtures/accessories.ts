import { calculateAchievementPoints } from '@/utils';

// slot is where accessory appears visually on model, 1 accessory per slot allowed
export type Slot =
  | 'Head'
  | 'Mouth'
  | 'Ears'
  | 'Nose'
  | 'Right Hand'
  | 'Left Hand'
  | 'Eyes'
  | 'Back';

export const slots: Slot[] = [
  'Head',
  'Eyes',
  'Back',
  'Right Hand',
  'Left Hand',
  'Ears',
  'Nose',
  'Mouth',
];

// bone is where accessory is placed in model skeleton, multiple per bone allowed
export type Bone = 'Head' | 'LeftHand' | 'RightHand' | 'Back';
// map which bone should be used for a given slot
export const slot2BoneMap: Record<Slot, Bone> = {
  Head: 'Head',
  Mouth: 'Head',
  Ears: 'Head',
  Nose: 'Head',
  Eyes: 'Head',
  'Right Hand': 'RightHand',
  'Left Hand': 'LeftHand',
  Back: 'Back',
};
// category is how accessories are grouped in the UI
type Category = 'hats' | 'eyes' | 'face' | 'weapons';

export type Offset = {
  scale?: {
    x?: number;
    y?: number;
    z?: number;
  };
  position?: {
    x?: number;
    y?: number;
    z?: number;
  };
  rotation?: {
    x?: number;
    y?: number;
    z?: number;
  };
};

export type Accessory = {
  id: string;
  description: string;
  category: Category;
  level: number;
  label: string;
  slot: Slot;
  stats: Record<string, number>;
  offset?: Offset;
  rarity?: 'rare' | 'legendary';
  requirement?: string;
  // TODO: make this less chaotic
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validator?: (args: any) => boolean;
};

const partyHat: Accessory = {
  id: 'hats_head_partyhat',
  description:
    'One of the rarest and most valuable items from Runescape, partyhats were obtained by opening crackers during the 2001 Christmas event.',
  level: 40,
  label: 'Partyhat',
  category: 'hats',
  slot: 'Head',
  stats: {
    vibes: 10,
    wealth: 50,
  },
  offset: {
    position: {
      y: -0.4,
      z: 1,
    },
    rotation: {
      x: -0.1,
    },
  },
};

const propellerHat: Accessory = {
  id: 'hats_head_propeller_cap',
  description:
    'Originally created in 1947 by Ray Faraday, the propeller beanie became an icon for science fiction fans and beyond around the world.',
  label: 'Propeller Hat',
  level: 22,
  stats: {
    beanie: 20,
  },
  category: 'hats',
  slot: 'Head',
  offset: {
    position: {
      y: -0.4,
    },
    rotation: {
      x: -0.05,
    },
  },
};

const roseCrown: Accessory = {
  id: 'hats_head_roses_crown',
  description: 'A headdress made of the blitmap rose.',
  label: 'Rose Crown',
  category: 'hats',
  slot: 'Head',
  level: 14,
  stats: {
    basic: 20,
    cuteness: 10,
  },
  offset: {
    position: {
      z: 0.5,
    },
    rotation: {
      x: -0.1,
    },
  },
};

const leatherHat: Accessory = {
  id: 'hats_head_leather_hat',
  description:
    'A high-crowned, wide brimmed hat adorned with the teeth of market bears.',
  label: 'Cowboy Hat',
  category: 'hats',
  slot: 'Head',
  level: 34,
  stats: {
    'badass mf': 50,
    'hell ya brother': 1,
  },
  offset: {
    position: {
      z: 1,
    },
    rotation: {
      x: -0.1,
    },
  },
};

const fwbHat: Accessory = {
  id: 'hats_head_fwb_cap',
  description:
    'A hat commemorating Friends With Benefits, where Manny gained a lot of his early NFT knowledge.',
  category: 'hats',
  slot: 'Head',
  label: 'FWB Hat',
  level: 75,
  stats: {
    friendship: 50,
    benefits: 50,
  },
  requirement: 'Requires owning any FWB PRO tokens.',
  validator: ({ hasFWB }) => hasFWB,
  rarity: 'rare',
  offset: {
    position: {
      z: 0.75,
    },
    rotation: {
      x: -0.1,
    },
  },
};

const stupidHat: Accessory = {
  id: 'hats_head_stupid',
  description:
    "Omg did you see Manny's stupid fucking hat? It's a fedora with flaps on the back...",
  label: 'Stupid Hat',
  category: 'hats',
  slot: 'Head',
  level: 100,
  rarity: 'legendary',
  stats: {
    sad: 100,
    sosad: 100,
    sosososad: 100,
  },
  offset: {
    position: {
      z: 2,
    },
    rotation: {
      x: -0.2,
    },
  },
};

const vape: Accessory = {
  id: 'face_mouth_vape',
  description:
    'A device so well designed Manny had to quit them forever to avoid vaping non-stop.',
  label: 'Vape',
  category: 'face',
  slot: 'Mouth',
  level: 11,
  stats: {
    addicted: 50,
    nicotine: 20,
    'time lost looking for vape': -20,
  },
  offset: {
    position: {
      x: 0.25,
      y: 1.5,
    },
  },
};

const cig: Accessory = {
  id: 'face_mouth_cigarette',
  description: 'An analogue vape popular among boomers.',
  label: 'Cigarette',
  category: 'face',
  slot: 'Mouth',
  level: 10,
  stats: {
    death: 50,
    health: -50,
  },
  offset: {
    position: {
      y: 1.5,
    },
  },
};

const pipe: Accessory = {
  id: 'face_mouth_pipe',
  description: "Ceci n'est pas une pipe.",
  label: 'Pipe',
  category: 'face',
  slot: 'Mouth',
  level: 20,
  stats: {
    surrealism: 20,
    class: 20,
  },
  offset: {
    position: {
      y: 1.5,
    },
  },
};

const joint: Accessory = {
  id: 'face_mouth_joint',
  description: 'A nicely rolled cone complete with a paper filter.',
  label: 'Joint',
  category: 'face',
  slot: 'Mouth',
  rarity: 'legendary',
  level: 100,
  requirement: 'Requires 420+ achievement points.',
  validator: ({ achievements }) => {
    const points = calculateAchievementPoints(achievements);
    return points >= 420;
  },
  stats: {
    based: 20,
    high: 100,
  },
  offset: {
    position: {
      y: 1.5,
    },
  },
};

const facemask: Accessory = {
  id: 'face_mouth_mask_n40',
  description:
    'A surgical face mask that can prevent the spread of droplets and particles.',
  label: 'Face Mask',
  category: 'face',
  level: 10,
  stats: {
    comfort: -10,
    superspreading: -10,
  },
  slot: 'Mouth',
  offset: {
    position: {
      z: 0.5,
    },
    rotation: {
      x: -0.1,
    },
  },
};

const earrings: Accessory = {
  id: 'face_ears_ring_ear',
  description: 'Golden hoop earrings to instantly turn into a hot guy.',
  label: 'Earrings',
  category: 'face',
  level: 72,
  rarity: 'rare',
  requirement: 'Requires 202+ achievement points.',
  validator: ({ achievements }) => {
    const points = calculateAchievementPoints(achievements);
    return points >= 202;
  },
  stats: {
    swag: 32,
    hottie: 47,
  },
  slot: 'Ears',
  offset: {
    position: {
      y: 0.5,
    },
  },
};

const nosering: Accessory = {
  id: 'face_nose_ring_nose',
  description: 'A septum ring to channel your inner bull.',
  label: 'Nose Ring',
  level: 24,
  category: 'face',
  stats: {
    bull: 31,
    punk: 18,
  },
  slot: 'Nose',
  offset: {
    position: {
      y: 1.3,
      z: 0.3,
    },
  },
};

const lipring: Accessory = {
  id: 'face_mouth_ring_lip',
  description: 'A silver lip ring shoplifted from Hot Topic.',
  label: 'Lip Ring',
  category: 'face',
  slot: 'Mouth',
  level: 24,
  stats: {
    emo: 33,
    conformity: -15,
  },
  offset: {
    position: {
      y: 1.15,
      z: 1,
    },
  },
};

const book: Accessory = {
  id: 'weapons_left_hand_book',
  description: 'An analogue website popular among boomers',
  label: 'Book',
  level: 50,
  requirement: 'Requires owning mLoot or Loot NFT.',
  validator: ({ hasMLoot, hasLoot }) => hasMLoot || hasLoot,
  stats: {
    intellect: 55,
    dexterity: 55,
  },
  category: 'weapons',
  slot: 'Left Hand',
  offset: {
    rotation: {
      z: -1.5,
      x: 0.5,
    },
    position: {
      y: 14,
      z: 6,
      x: -4,
    },
  },
};

const sword: Accessory = {
  id: 'weapons_right_hand_sword',
  description: 'A bladed weapon stolen from Toan of Dark Cloud.',
  label: 'Sword',
  rarity: 'rare',
  level: 60,
  requirement: 'Requires owning mLoot or Loot NFT.',
  validator: ({ hasMLoot, hasLoot }) => hasMLoot || hasLoot,
  stats: {
    badass: 66,
    attack: 66,
  },
  category: 'weapons',
  slot: 'Right Hand',
  offset: {
    rotation: {
      z: -1,
    },
    position: {
      x: 3,
      y: 7,
      z: 2.5,
    },
  },
};

const wand: Accessory = {
  id: 'weapons_right_hand_wand',
  description: 'A thin rod used to conjure supernatural headassery.',
  label: 'Wand',
  level: 50,
  requirement: 'Requires owning mLoot or Loot NFT.',
  validator: ({ hasMLoot, hasLoot }) => hasMLoot || hasLoot,
  stats: {
    fanfic: 55,
    magic: 55,
  },
  category: 'weapons',
  slot: 'Right Hand',
  offset: {
    rotation: {
      z: -1,
    },
    position: {
      x: 3,
      y: 7,
      z: 2.5,
    },
  },
};

const scimitar: Accessory = {
  id: 'weapons_right_hand_scimitar',
  description: 'A curvy boi sword popularized by Euros in the 13th century.',
  label: 'Scimitar',
  rarity: 'rare',
  level: 60,
  requirement: 'Requires owning mLoot or Loot NFT.',
  validator: ({ hasMLoot, hasLoot }) => hasMLoot || hasLoot,
  stats: {
    badass: 66,
    attack: 66,
  },
  category: 'weapons',
  slot: 'Right Hand',
  offset: {
    rotation: {
      z: -1,
    },
    position: {
      x: 2,
      y: 5.5,
      z: 2.5,
    },
  },
};

const katana: Accessory = {
  id: 'weapons_right_hand_katana',
  description: 'Japanese sword used by anime characters.',
  label: 'Katana',
  rarity: 'rare',
  level: 70,
  requirement: 'Requires owning mLoot or Loot NFT.',
  validator: ({ hasMLoot, hasLoot }) => hasMLoot || hasLoot,
  stats: {
    badass: 77,
    attack: 77,
  },
  category: 'weapons',
  slot: 'Right Hand',
  offset: {
    rotation: {
      x: -1.6,
      y: 0.5,
      z: -1,
    },
    position: {
      x: -4,
      y: 10,
      z: 8,
    },
  },
};

const quarterstaff: Accessory = {
  id: 'weapons_back_staff',
  description: 'A long stave for conjuring supernatural headassery.',
  label: 'Quarterstaff',
  rarity: 'legendary',
  level: 90,
  requirement: 'Requires owning mLoot or Loot NFT.',
  validator: ({ hasLoot, hasMLoot }) => hasLoot || hasMLoot,
  stats: {
    magic: 99,
    headassery: 99,
  },
  category: 'weapons',
  slot: 'Back',
  offset: {
    rotation: {
      x: 1.1,
      y: 3.14,
      z: 1.6,
    },
    position: {
      x: 75,
      y: -10,
      z: 10,
    },
  },
};

const warhammer: Accessory = {
  id: 'weapons_right_hand_hammer',
  description: 'A weapon for the finest Manny foot soldiers.',
  label: 'Warhammer',
  rarity: 'legendary',
  level: 90,
  category: 'weapons',
  slot: 'Right Hand',
  requirement: 'Requires owning mLoot or Loot NFT.',
  validator: ({ hasLoot, hasMLoot }) => hasLoot || hasMLoot,
  stats: {
    strength: 99,
    attack: 99,
  },
  offset: {
    rotation: {
      x: -2.7,
      y: -0.3,
      z: -2,
    },
    position: {
      x: 2,
      y: 5.5,
      z: 2.5,
    },
  },
};

const cloutGoggle: Accessory = {
  id: 'eyes_eyes_glasses_cool_1',
  description: 'Eskeddittt',
  label: 'Clout Goggles',
  level: 26,
  category: 'eyes',
  slot: 'Eyes',
  stats: {
    swag: 20,
    clout: 1,
  },
  offset: {
    position: {
      z: 0.75,
    },
    rotation: {
      x: -0.08,
    },
  },
};

const fashionGlasses: Accessory = {
  id: 'eyes_eyes_glasses_cool_2',
  description: 'A fashionable pair of red glasses.',
  label: 'Fashion Glasses',
  level: 26,
  category: 'eyes',
  slot: 'Eyes',
  stats: {
    fashion: 20,
    mystique: 10,
  },
  offset: {
    position: {
      y: 0.3,
      z: 0.5,
    },
    rotation: {
      x: -0.07,
    },
  },
};

const rondoGlasses: Accessory = {
  id: 'eyes_eyes_glasses_funny',
  description: 'Evil pepe emoji.',
  label: 'Rondo Glasses',
  level: 26,
  category: 'eyes',
  slot: 'Eyes',
  stats: {
    evil: 50,
    mystery: 10,
  },
  offset: {
    position: {
      y: 0.3,
      z: 0.6,
    },
    rotation: {
      x: -0.1,
    },
  },
};

const hackerGlasses: Accessory = {
  id: 'eyes_eyes_glasses_hacker',
  description: 'Booting into the mainframe...',
  label: 'Hacker Glasses',
  level: 33,
  category: 'eyes',
  slot: 'Eyes',
  stats: {
    cyber: 20,
    punk: 20,
  },
  offset: {
    position: {
      y: 0.3,
      z: 0.6,
    },
    rotation: {
      x: -0.1,
    },
  },
};

const holoLens: Accessory = {
  id: 'eyes_eyes_holovisor',
  description: 'Unlock mixed reality experiences with this 5lb headset.',
  label: 'Hololens',
  level: 42,
  category: 'eyes',
  slot: 'Eyes',
  rarity: 'rare',
  stats: {
    XR: 50,
    comfort: -20,
  },
};

const monocle: Accessory = {
  id: 'eyes_eyes_monocle',
  description: 'Hmm.....',
  label: 'Monocle',
  level: 42,
  category: 'eyes',
  slot: 'Eyes',
  stats: {
    thinking: 48,
    posh: 10,
  },
  rarity: 'rare',
  offset: {
    position: {
      y: 1,
    },
  },
};

const nounish: Accessory = {
  id: 'eyes_eyes_nounish',
  description: '!vibe',
  label: 'Nounish Glasses',
  level: 100,
  category: 'eyes',
  slot: 'Eyes',
  stats: {
    vibes: 100,
    clout: 100,
  },
  rarity: 'legendary',
  requirement: 'Requires owning a Nouns/Lil Nouns/CrypToadz NFT.',
  validator: ({ hasNouns }) => hasNouns,
  offset: {
    position: {
      y: 1.25,
    },
  },
};

const overTheTops: Accessory = {
  id: 'eyes_eyes_overthetop',
  description: 'The hardest sunglasses design of all time.',
  label: 'Over The Tops',
  rarity: 'legendary',
  level: 101,
  category: 'eyes',
  slot: 'Eyes',
  stats: {
    based: 100,
    hardness: 100,
  },
  offset: {
    position: {
      y: 0.3,
      z: 1.15,
    },
    rotation: {
      x: -0.15,
    },
  },
};

export const allAccessories = [
  propellerHat,
  leatherHat,
  roseCrown,
  partyHat,
  fwbHat,
  stupidHat,
  cloutGoggle,
  fashionGlasses,
  rondoGlasses,
  hackerGlasses,
  monocle,
  holoLens,
  nounish,
  overTheTops,
  facemask,
  vape,
  cig,
  pipe,
  nosering,
  lipring,
  earrings,
  joint,
  book,
  wand,
  sword,
  scimitar,
  katana,
  quarterstaff,
  warhammer,
];
