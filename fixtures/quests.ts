export type Quest = {
  id: string;
  label: string;
  description: string;
};

const toadz: Quest = {
  id: 'toadz',
  label: 'CrypToadz Frogger',
  description:
    "Play a reimagined version of the arcade classic 'Frogger' as mannyDAO's CrypToad.",
};

const corruptions: Quest = {
  id: 'corruption',
  label: 'Corruption(s*) Mode',
  description:
    'Turn mannys.game into an ASCII based rendering in the style of Corruption(s*) NFT.',
};

export const allQuests = [toadz, corruptions];
