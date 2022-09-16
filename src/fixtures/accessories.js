import * as THREE from 'three';
import { calculateAchievementPoints } from 'utils';

const resetMaterial = (material) => {
  material.color = new THREE.Color('white');
  material.shininess = 0;
  material.specular = new THREE.Color('black');
  return material;
};

const partyHatProps = {
  id: 'phat',
  textureUrl: 'phat.jpg',
  level: 40,
  label: 'Partyhat',
  description:
    'One of the rarest and most valuable items from Runescape, partyhats were obtained by opening crackers during the 2001 Christmas event.',
  slot: 'Head',
  stats: {
    vibes: 10,
    wealth: 50,
  },
  armature: {
    bone: 'Head',
    offset: {
      position: {
        x: 1.08,
        y: 14,
        z: -2.64,
      },
      rotation: {
        x: -0.3,
      },
    },
  },
  material: (obj) => {
    obj.traverse((child) => {
      if (child.name === 'Party_Hat') {
        child.material = resetMaterial(child.material);
        child.material.map.encoding = THREE.sRGBEncoding;
      }
    });
    return obj;
  },
};

const propellerHatProps = {
  id: 'propellerhat',
  textureUrl: 'propellerhat.jpg',
  level: 22,
  label: 'Propeller Hat',
  description:
    'Originally created in 1947 by Ray Faraday, the propeller beanie became an icon for science fiction fans and beyond around the world.',
  slot: 'Head',
  stats: {
    beanie: 20,
  },
  armature: {
    bone: 'Head',
    offset: {
      position: {
        x: 0.71,
        y: 10.74,
        z: -0.47,
      },
      rotation: {
        x: -0.09,
      },
    },
  },
  material: (obj) => {
    obj.traverse((child) => {
      const mats2Fix = ['Propeller', 'Hat'];
      if (mats2Fix.includes(child?.name)) {
        child.material = resetMaterial(child.material);
        child.material.map.encoding = THREE.sRGBEncoding;
      }
    });
    return obj;
  },
};

const tiaraProps = {
  id: 'tiara',
  label: 'Tiara',
  description: 'A jeweled, ornamental crown traditionally worn by prom queens.',
  slot: 'Head',
  level: 14,
  stats: {
    cuteness: 30,
  },
  armature: {
    bone: 'Head',
    offset: {
      position: {
        x: 0.88,
        y: 13.14,
        z: 6.02,
      },
    },
  },
  material: (obj) => {
    obj.traverse((child) => {
      if (child?.material?.name === 'PrincessTiara') {
        child.material.color = new THREE.Color('white');
        child.material.shininess = 0;
      }
    });
    return obj;
  },
};

const flowerCrownProps = {
  id: 'flowercrown',
  label: 'Flower Crown',
  description:
    'A headdress made of leaves and flowers, perfect for your next Coachella look.',
  slot: 'Head',
  level: 14,
  stats: {
    basic: 20,
    cuteness: 10,
  },
  armature: {
    bone: 'Head',
    offset: {
      position: {
        x: 0.52,
        y: 13.14,
        z: 6.02,
      },
      rotation: {
        x: -0.18,
      },
    },
  },
  material: (obj) => {
    obj.traverse((child) => {
      if (child?.material?.name === 'FloralCrown') {
        child.material.color = new THREE.Color('white');
        child.material.shininess = 0;
      }
    });
    return obj;
  },
};

const leatherHatProps = {
  id: 'leatherhat',
  label: 'Cowboy Hat',
  description:
    'A high-crowned, wide brimmed hat adorned with the teeth of market bears.',
  slot: 'Head',
  level: 34,
  stats: {
    'badass mf': 50,
    'hell ya brother': 1,
  },
  armature: {
    bone: 'Head',
    offset: {
      position: {
        x: 1.09,
        y: 13.59,
        z: -3.51,
      },
      rotation: {
        x: -0.28,
      },
    },
  },
  material: (obj) => {
    obj.traverse((child) => {
      if (child?.material?.name === 'LeatherHat') {
        child.material = resetMaterial(child.material);
      }
    });
    return obj;
  },
};

const supremeHatProps = {
  id: 'supremehat',
  textureUrl: 'supremehat.jpg',
  label: 'Supreme Cap',
  slot: 'Head',
  level: 20,
  description:
    'A classic 5 panel cap with a floral pattern to unlock your inner fuccboi.',
  stats: {
    fuccboi: 50,
    headass: 25,
  },
  armature: {
    bone: 'Head',
    offset: {
      position: {
        x: 1.17,
        y: 13.87,
        z: 0.19,
      },
    },
  },
  material: (obj) => {
    obj.traverse((child) => {
      if (child.name === 'Hats_supreme_Tropical_') {
        child.material = resetMaterial(child.material);
        child.material.map.encoding = THREE.sRGBEncoding;
      }
    });
    return obj;
  },
};

const fwbHatProps = {
  id: 'fwbhat',
  textureUrl: 'fwbhat.jpg',
  slot: 'Head',
  label: 'FWB Hat',
  level: 75,
  description:
    'A hat commemorating Friends With Benefits, where Manny gained a lot of his early NFT knowledge.',
  stats: {
    friendship: 50,
    benefits: 50,
  },
  requirement: 'Requires owning any FWB PRO tokens.',
  validator: ({ hasFWB }) => hasFWB,
  rarity: 'rare',
  armature: {
    bone: 'Head',
    offset: {
      position: {
        x: 1,
        y: 15.19,
        z: -1.17,
      },
      rotation: {
        x: -0.13,
      },
    },
  },
  material: (obj) => {
    obj.traverse((child) => {
      if (child.name === 'Cylinder') {
        child.material = resetMaterial(child.material);
        child.material.map.encoding = THREE.sRGBEncoding;
      }
    });
    return obj;
  },
};

const stupidHatProps = {
  id: 'stupidhat',
  GTFO: true,
  mystery: true,
  STOP_LOOKING_HERE: true,
  textureUrl: 'stupidhat.jpg',
  label: 'Stupid Hat',
  slot: 'Head',
  level: 100,
  description:
    "Omg did you see Manny's stupid fucking hat? It's a fedora with flaps on the back...",
  requirement: 'Requires owning Stupid Hat NFT',
  validator: () => false,
  rarity: 'legendary',
  stats: {
    sad: 100,
    sosad: 100,
    sosososad: 100,
  },
  armature: {
    bone: 'Head',
    offset: {
      position: {
        x: 0.9,
        y: -0.5,
        z: -7,
      },
      rotation: {
        x: -0.28,
      },
    },
  },
};

const juulProps = {
  id: 'juul',
  format: 'glb',
  label: 'Juul',
  slot: 'Mouth',
  description:
    'A vape that is so well designed Manny had to quit them forever to avoid vaping non-stop.',
  level: 11,
  stats: {
    addicted: 50,
    nicotine: 20,
    'time lost looking for Juul': -20,
  },
  armature: {
    bone: 'Head',
    scale: {
      x: 80,
      y: 80,
      z: 80,
    },
    offset: {
      position: {
        x: 1.33,
        y: 1.28,
        z: 18,
      },
      rotation: {
        x: Math.PI / 2,
        y: Math.PI,
        z: Math.PI,
      },
    },
  },
};

const cigProps = {
  id: 'cigarette',
  textureUrl: 'cigarette.png',
  label: 'Cigarette',
  slot: 'Mouth',
  description: 'An analogue Juul popular among boomers.',
  level: 10,
  stats: {
    death: 50,
    health: -50,
  },
  armature: {
    bone: 'Head',
    offset: {
      position: {
        x: 1.33,
        y: 1.28,
        z: 13,
      },
      rotation: {
        z: Math.PI,
      },
    },
  },
  material: (obj) => {
    obj.traverse((child) => {
      if (child?.name === 'Cylinder') {
        child.material = resetMaterial(child.material);
        child.material.map.encoding = THREE.sRGBEncoding;
      }
    });
    return obj;
  },
};

const pipeProps = {
  id: 'pipe',
  format: 'glb',
  label: 'Pipe',
  slot: 'Mouth',
  description: "Ceci n'est pas une pipe.",
  level: 20,
  stats: {
    surrealism: 20,
    class: 20,
  },
  armature: {
    bone: 'Head',
    scale: {
      x: 1.2,
      y: 1.2,
      z: 1.2,
    },
    offset: {
      position: {
        x: 2,
        y: -2.8,
        z: 14,
      },
      rotation: {
        y: Math.PI / 2,
      },
    },
  },
  material: (obj) => {
    obj.traverse((child) => {
      if (child?.material?.name === 'Material.003') {
        child.material.metalness = 0.5;
      }
    });
    return obj;
  },
};

const jointProps = {
  id: 'joint',
  format: 'glb',
  label: 'Joint',
  slot: 'Mouth',
  rarity: 'legendary',
  level: 100,
  description: 'A nicely rolled cone complete with a paper filter.',
  requirement: 'Requires 420+ achievement points.',
  validator: ({ achievements }) => {
    const points = calculateAchievementPoints(achievements);
    return points >= 420;
  },
  stats: {
    based: 20,
    high: 100,
  },
  armature: {
    bone: 'Head',
    scale: {
      x: 70,
      y: 70,
      z: 70,
    },
    offset: {
      position: {
        x: 1.33,
        y: 1.1,
        z: 10.5,
      },
    },
  },
};

const facemaskProps = {
  id: 'facemask',
  textureUrl: 'facemask.jpg',
  label: 'Face Mask',
  slot: 'Mouth',
  level: 10,
  description:
    'A surgical face mask that can prevent the spread of droplets and particles.',
  stats: {
    comfort: -10,
    superspreading: -10,
  },
  armature: {
    bone: 'Head',
    offset: {
      position: {
        x: -0.07,
        y: 2.96,
        z: 5.44,
      },
      rotation: {
        x: -0.08,
      },
    },
  },
};

const earringsProps = {
  id: 'earrings',
  textureUrl: 'gold.png',
  label: 'Earrings',
  slot: 'Ears',
  level: 72,
  rarity: 'rare',
  description: 'Golden hoop earrings to instantly turn into a hot guy.',
  requirement: 'Requires 202+ achievement points.',
  validator: ({ achievements }) => {
    const points = calculateAchievementPoints(achievements);
    return points >= 202;
  },
  stats: {
    swag: 32,
    hottie: 47,
  },
  armature: {
    bone: 'Head',
    offset: {
      position: {
        x: 1,
        y: 1.4,
        z: -0.8,
      },
    },
  },
};

const noseringProps = {
  id: 'nosering',
  textureUrl: 'gold.png',
  label: 'Nose Ring',
  level: 24,
  slot: 'Nose',
  description: 'A septum ring to channel your inner bull.',
  stats: {
    bull: 31,
    punk: 18,
  },
  armature: {
    bone: 'Head',
    offset: {
      position: {
        x: 1.35,
        y: 3.5,
        z: 11.5,
      },
    },
  },
  material: (obj) => {
    obj.traverse((child) => {
      if (child?.name === 'Piercing_16') {
        child.material = resetMaterial(child.material);
        child.material.map.encoding = THREE.sRGBEncoding;
      }
    });
    return obj;
  },
};

const lipringProps = {
  id: 'lipring',
  textureUrl: 'chrome.jpg',
  label: 'Lip Ring',
  slot: 'Mouth',
  description: 'A silver lip ring shoplifted from Hot Topic.',
  level: 24,
  stats: {
    emo: 33,
    conformity: -15,
  },
  armature: {
    bone: 'Head',
    offset: {
      position: {
        x: 1.35,
        y: 0.5,
        z: 11,
      },
    },
  },
  material: (obj) => {
    obj.traverse((child) => {
      if (child?.name === 'Piercing_01') {
        child.material = resetMaterial(child.material);
        child.material.map.encoding = THREE.sRGBEncoding;
      }
    });
    return obj;
  },
};

const bookProps = {
  id: 'book',
  textureUrl: 'book.png',
  label: 'Book',
  mannyZ: -75,
  animation: 'spellcast',
  level: 50,
  description: 'An analogue website popular among boomers',
  requirement: 'Requires owning mLoot or Loot NFT.',
  validator: ({ hasMLoot, hasLoot }) => hasMLoot || hasLoot,
  stats: {
    intellect: 55,
    dexterity: 55,
  },
  slot: 'Left Hand',
  armature: {
    bone: 'LeftHand',
    scale: {
      x: 0.75,
      y: 0.75,
      z: 0.75,
    },
    offset: {
      position: {
        x: -2,
        y: 12,
        z: 5.27,
      },
      rotation: {
        x: 0.28,
        y: 0.09,
        z: 1.35,
      },
    },
  },
  material: (obj) => {
    obj.traverse((child) => {
      if (child?.name === 'Cube001') {
        child.material = resetMaterial(child.material);
        child.material.map.encoding = THREE.sRGBEncoding;
      }
    });
    return obj;
  },
};

const chronicleProps = {
  id: 'chronicle',
  textureUrl: 'chronicle.png',
  label: 'Chronicle',
  mannyZ: -75,
  animation: 'inwardslash',
  rarity: 'rare',
  level: 60,
  description: 'A bladed weapon stolen from Toan of Dark Cloud.',
  requirement: 'Requires owning mLoot or Loot NFT.',
  validator: ({ hasMLoot, hasLoot }) => hasMLoot || hasLoot,
  stats: {
    badass: 66,
    attack: 66,
  },
  slot: 'Right Hand',
  armature: {
    bone: 'RightHand',
    offset: {
      position: {
        x: 5.8,
        y: 7.42,
        z: 2.3,
      },
      rotation: {
        x: 0.4,
        y: -0.03,
        z: -1.58,
      },
    },
  },
  material: (obj) => {
    obj.traverse((child) => {
      if (child?.name === 'Sword_low') {
        child.material = resetMaterial(child.material);
        child.material.map.encoding = THREE.sRGBEncoding;
      }
    });
    return obj;
  },
};

const wandProps = {
  id: 'wand',
  textureUrl: 'wand.png',
  label: 'Wand',
  mannyZ: -100,
  level: 50,
  description: 'A thin rod used to conjure supernatural headassery.',
  requirement: 'Requires owning mLoot or Loot NFT.',
  validator: ({ hasMLoot, hasLoot }) => hasMLoot || hasLoot,
  stats: {
    fanfic: 55,
    magic: 55,
  },
  slot: 'Right Hand',
  armature: {
    bone: 'RightHand',
    offset: {
      position: {
        x: 11.78,
        y: 8.76,
        z: 3.04,
      },
      rotation: {
        x: 0.4,
        y: 0,
        z: -1.3,
      },
    },
  },
  material: (obj) => {
    obj.traverse((child) => {
      if (child?.name === 'Voldemort_Wand') {
        child.material = resetMaterial(child.material);
        child.material.map.encoding = THREE.sRGBEncoding;
      }
    });
    return obj;
  },
};

const falchionProps = {
  id: 'falchion',
  textureUrl: 'falchion.png',
  label: 'Falchion',
  rarity: 'rare',
  mannyZ: -35,
  animation: 'horizontalswing',
  level: 60,
  description: 'A curvy boi sword popularized by Euros in the 13th century.',
  requirement: 'Requires owning mLoot or Loot NFT.',
  validator: ({ hasMLoot, hasLoot }) => hasMLoot || hasLoot,
  stats: {
    badass: 66,
    attack: 66,
  },
  slot: 'Right Hand',
  armature: {
    bone: 'RightHand',
    offset: {
      position: {
        x: 12.67,
        y: 7.27,
        z: 2.82,
      },
      rotation: {
        x: 0.4,
        y: -0.03,
        z: -1.58,
      },
    },
  },
  material: (obj) => {
    obj.traverse((child) => {
      if (child?.name === 'OrcSlayer') {
        child.material = resetMaterial(child.material);
        child.material.map.encoding = THREE.sRGBEncoding;
      }
    });
    return obj;
  },
};

const katanaProps = {
  id: 'katana',
  textureUrl: 'katana.png',
  label: 'Katana',
  animation: 'swordrun',
  rarity: 'rare',
  level: 70,
  description: 'Japanese sword used by anime characters.',
  requirement: 'Requires owning mLoot or Loot NFT.',
  validator: ({ hasMLoot, hasLoot }) => hasMLoot || hasLoot,
  stats: {
    badass: 77,
    attack: 77,
  },
  slot: 'Right Hand',
  armature: {
    bone: 'RightHand',
    offset: {
      position: {
        x: 3.73,
        y: 6.32,
        z: 2.52,
      },
      rotation: {
        x: -1.4,
        y: -0.43,
        z: -1.4,
      },
    },
  },
  material: (obj) => {
    obj.traverse((child) => {
      if (child?.name === 'Mesh_ZBrush_defualt_group') {
        child.material = resetMaterial(child.material);
        child.material.map.encoding = THREE.sRGBEncoding;
      }
    });
    return obj;
  },
};

const clubProps = {
  id: 'club',
  label: 'Club',
  mannyZ: -35,
  animation: 'downwardswing',
  level: 60,
  description: 'The only club Manny recognizes.',
  requirement: 'Requires owning mLoot or Loot NFT.',
  validator: ({ hasMLoot, hasLoot }) => hasMLoot || hasLoot,
  stats: {
    strength: 66,
    attack: 66,
  },
  slot: 'Right Hand',
  armature: {
    bone: 'RightHand',
    offset: {
      position: {
        x: 8.41,
        y: 8.38,
        z: 3.92,
      },
      rotation: {
        x: -1.03,
        y: -0.03,
        z: -1.58,
      },
    },
  },
  material: (obj) => {
    obj.traverse((child) => {
      if (child?.name === 'Sphere') {
        child.material = resetMaterial(child.material);
        child.material.map.encoding = THREE.sRGBEncoding;
      }
    });
    return obj;
  },
};

const quarterstaffProps = {
  id: 'quarterstaff',
  label: 'Quarterstaff',
  mannyZ: -35,
  animation: 'spellcast2h',
  rarity: 'legendary',
  level: 90,
  description: 'A long stave for conjuring supernatural headassery.',
  requirement: 'Requires owning Loot NFT.',
  validator: ({ hasLoot }) => hasLoot,
  stats: {
    magic: 99,
    headassery: 99,
  },
  slot: 'Back',
  armature: {
    bone: 'Back',
    offset: {
      position: {
        x: 19.69,
        y: -30.5,
        z: -7.3,
      },
      rotation: {
        x: -0.58,
        y: -2.58,
        z: -0.76,
      },
    },
  },
  material: (obj) => {
    obj.traverse((child) => {
      if (child?.name === 'Staff') {
        child.material = resetMaterial(child.material);
        child.material.map.encoding = THREE.sRGBEncoding;
      }
    });
    return obj;
  },
};

const warhammerProps = {
  id: 'warhammer',
  textureUrl: 'warhammer.png',
  label: 'Warhammer',
  mannyZ: -20,
  animation: 'battlecry',
  rarity: 'legendary',
  level: 90,
  slot: 'Right Hand',
  description: 'A weapon for the finest Manny foot soldiers.',
  requirement: 'Requires owning Loot NFT.',
  validator: ({ hasLoot }) => hasLoot,
  stats: {
    strength: 99,
    attack: 99,
  },
  armature: {
    bone: 'RightHand',
    offset: {
      position: {
        x: 11.21,
        y: 9.46,
        z: 3.12,
      },
      rotation: {
        x: -2.46,
        y: -0.21,
        z: -1.76,
      },
    },
  },
  material: (obj) => {
    obj.traverse((child) => {
      if (child?.name === 'PrpNHammer') {
        child.material = resetMaterial(child.material);
        child.material.map.encoding = THREE.sRGBEncoding;
      }
    });
    return obj;
  },
};

export const weapons = [
  bookProps,
  wandProps,
  clubProps,
  chronicleProps,
  falchionProps,
  katanaProps,
  quarterstaffProps,
  warhammerProps,
];

const cloutGoggleProps = {
  id: 'cloutgoggles',
  format: 'glb',
  label: 'Clout Goggles',
  level: 26,
  slot: 'Eyes',
  description: 'Eskeddittt',
  stats: {
    swag: 20,
    clout: 1,
  },
  armature: {
    bone: 'Head',
    scale: {
      x: 2.83,
      y: 2.35,
      z: 2.55,
    },
    offset: {
      position: {
        x: 1.22,
        y: 7.95,
        z: 2.36,
      },
      rotation: {
        x: 0.01,
        z: 0.01,
      },
    },
  },
};

const fashionGlasses = {
  id: 'fashionglasses',
  format: 'glb',
  label: 'Fashion Glasses',
  level: 26,
  slot: 'Eyes',
  description: 'A fashionable pair of red glasses.',
  stats: {
    fashion: 20,
    mystique: 10,
  },
  armature: {
    bone: 'Head',
    scale: {
      x: 2.82,
      y: 2.65,
      z: 2.75,
    },
    offset: {
      position: {
        x: -2.7,
        y: 9.2,
        z: 9.36,
      },
      rotation: {
        x: -0.01,
        y: 0.015,
        z: 0.01,
      },
    },
  },
};

const rondoGlasses = {
  id: 'rondoglasses',
  format: 'glb',
  label: 'Rondo Glasses',
  level: 26,
  slot: 'Eyes',
  description: 'Evil pepe emoji.',
  stats: {
    evil: 50,
    mystery: 10,
  },
  armature: {
    bone: 'Head',
    scale: {
      x: 100,
      y: 100,
      z: 100,
    },
    offset: {
      position: {
        x: 1.2,
        y: 6.6,
        z: 4.1,
      },
      rotation: {
        x: -0.01,
      },
    },
  },
};

const monkaGlasses = {
  id: 'monkaglasses',
  label: 'MonkaS Glasses',
  level: 33,
  slot: 'Eyes',
  description: ':monkaS:',
  stats: {
    monka: 20,
    S: 20,
  },
  armature: {
    bone: 'Head',
    offset: {
      position: {
        x: 1.2,
        y: 7.5,
        z: 7.75,
      },
      rotation: {
        x: -0.09,
        y: 0.01,
      },
    },
  },
  material: (obj) => {
    obj.traverse((child) => {
      if (child.name === 'NoveltyGlasses3') {
        child.material = resetMaterial(child.material);
        child.material.map.encoding = THREE.sRGBEncoding;
      }
    });
    return obj;
  },
};

const holoLens = {
  id: 'hololens',
  format: 'glb',
  label: 'Hololens',
  level: 42,
  slot: 'Eyes',
  description: 'Unlock mixed reality experiences with this 5lb headset.',
  rarity: 'rare',
  stats: {
    XR: 50,
    comfort: -20,
  },
  armature: {
    bone: 'Head',
    scale: {
      x: 0.25,
      y: 0.35,
      z: 0.35,
    },
    offset: {
      position: {
        x: 1.2,
        y: 6.9,
        z: 0.4,
      },
      rotation: {
        x: -0.05,
        z: -Math.PI,
      },
    },
  },
};

const monocle = {
  id: 'monocle',
  format: 'glb',
  label: 'Monocle',
  level: 42,
  slot: 'Eyes',
  description: 'Hmm.....',
  stats: {
    thinking: 48,
    posh: 10,
  },
  rarity: 'rare',
  armature: {
    bone: 'Head',
    scale: {
      x: 95,
      y: 95,
      z: 95,
    },
    offset: {
      position: {
        x: -2.5,
        y: 1.53,
        z: 9.45,
      },
    },
  },
};

const nounish = {
  id: 'nounish',
  label: 'Nounish Glasses',
  level: 100,
  slot: 'Eyes',
  description: '!vibe',
  stats: {
    vibes: 100,
    clout: 100,
  },
  rarity: 'legendary',
  requirement: 'Requires owning a Nouns/Lil Nouns/CrypToadz NFT.',
  validator: ({ hasNouns }) => hasNouns,
  armature: {
    bone: 'Head',
    offset: {
      position: {
        x: 0.7,
        y: 7.25,
        z: 9.75,
      },
    },
  },
};

const overTheTopProps = {
  id: 'overthetop',
  GTFO: true,
  mystery: true,
  STOP_LOOKING_HERE: true,
  textureUrl: 'overthetop.jpg',
  label: 'Over The Tops',
  rarity: 'legendary',
  level: 101,
  slot: 'Eyes',
  description: 'The hardest sunglasses design of all time.',
  requirement: 'Requires owning Over The Tops NFT.',
  validator: () => false,
  stats: {
    based: 100,
    hardness: 100,
  },
  armature: {
    bone: 'Head',
    offset: {
      position: {
        x: 1.09,
        y: 11.1,
        z: 4.76,
      },
      rotation: {
        x: -0.09,
      },
    },
  },
};

export const accessoryMap = {
  hats: [
    propellerHatProps,
    leatherHatProps,
    flowerCrownProps,
    tiaraProps,
    partyHatProps,
    supremeHatProps,
    fwbHatProps,
    stupidHatProps,
  ],
  eyes: [
    cloutGoggleProps,
    fashionGlasses,
    rondoGlasses,
    monkaGlasses,
    monocle,
    holoLens,
    nounish,
    overTheTopProps,
  ],
  face: [
    facemaskProps,
    juulProps,
    cigProps,
    pipeProps,
    noseringProps,
    lipringProps,
    earringsProps,
    jointProps,
  ],
  weapons,
};

export const allAccessories = Object.values(accessoryMap).reduce(
  (a, b) => a.concat(b),
  []
);
