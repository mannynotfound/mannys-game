import mannyTokens from '@/fixtures/tokens.json';
import { TokenMetadata } from '@/utils/types';

export const getRandomSix = () => {
  const randomMannys: TokenMetadata[] = [];
  const rareMannys: TokenMetadata[] = [];
  const baseMannys: TokenMetadata[] = [];

  mannyTokens.forEach((token) => {
    let isBase = false;
    token.attributes.forEach((attribute) => {
      if (attribute.trait_type === 'skin') {
        if (
          attribute.value === 'Base Common' ||
          attribute.value === 'Base Rare'
        ) {
          isBase = true;
        }
      }
    });
    if (isBase) {
      baseMannys.push(token);
    } else {
      rareMannys.push(token);
    }
  });

  for (let i = 0; i < 6; i++) {
    const arrToChoose = i % 2 === 0 ? baseMannys : rareMannys;
    let randIdx = Math.floor(Math.random() * arrToChoose.length);
    // choose manny #1 as first one always
    if (i === 0) {
      randIdx = 0;
    }
    const nextManny = arrToChoose.splice(randIdx, 1)[0];
    randomMannys.push(nextManny);
  }

  return randomMannys;
};
