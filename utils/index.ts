import mannyTokens from 'fixtures/tokens.json';
import allAchievements from 'fixtures/achievements.json';
import {
  SkinsConfig,
  Token,
  TokenId,
  AchievementEarnedObject,
} from 'utils/types';

const now = Date.now();
const cacheBust = (url: string): string => url + `?ts=${now}`;

export const getTokenProps = (tokenId: number): Token | null => {
  const tokenMatch = mannyTokens.find((mt) => mt.token_id === tokenId);

  if (!tokenMatch) {
    return null;
  }

  const bonusAnim = tokenMatch.attributes.find(
    (at) => at.trait_type === 'mood'
  );

  return {
    tokenId: tokenMatch.token_id as TokenId,
    textureUrl: cacheBust(tokenMatch.texture_url),
    animationName: bonusAnim?.value.toString(),
  };
};

export const findRarestManny = (tokens: number[]): number => {
  let bestManny = tokens[0];
  let bestPoints = 1;

  tokens.sort().forEach((tokenId: number) => {
    const pointsMatch =
      Object.entries(SkinsConfig).find(([_, skinOptions]) => {
        return skinOptions.tokens.includes(tokenId);
      })?.[1].points ?? 0;

    const isBetter = pointsMatch > bestPoints;
    const isSameButEarlier = pointsMatch === bestPoints && tokenId < bestManny;
    if (isBetter || isSameButEarlier) {
      bestManny = tokenId;
      bestPoints = pointsMatch;
    }
  });

  return bestManny;
};

export const calculateAchievementPoints = (
  achievements: AchievementEarnedObject[]
): number => {
  let totalPoints = 0;
  achievements.forEach((a) => {
    const aMatch = allAchievements.find((ach) => ach.id === a.achievement_id);
    totalPoints += aMatch?.points ?? 0;
  });

  return totalPoints;
};

export const fetcher = (url: string) =>
  fetch(url, { mode: 'cors' }).then((res) => res.json());

// groups array of objects by a key
export const groupBy = <T>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => string
) =>
  array.reduce((acc, value, index, array) => {
    (acc[predicate(value, index, array)] ||= []).push(value);
    return acc;
  }, {} as { [key: string]: T[] });
