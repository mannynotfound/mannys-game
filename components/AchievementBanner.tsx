import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import {
  CommonShield,
  LegendaryShield,
  LinkOut,
  RareShield,
} from '@/components/Svg';
import allAchievements from '@/fixtures/achievements.json';
import type { AchievementEarnedObject } from '@/utils/types';

type Props = {
  achievement: AchievementEarnedObject;
  readOnly?: boolean;
  shiny?: boolean;
};

export default function Banner({ achievement, shiny, readOnly }: Props) {
  const { achievement_id, date_earned, tx_hash } = achievement;
  const aMatch = allAchievements.find((ach) => ach.id === achievement_id);

  if (aMatch === undefined) {
    console.error(`Couldnt find achievement config for ${achievement_id}...`);
    return null;
  }

  let shield = <CommonShield />;
  let shieldClass = 'py-0 px-[7px]';
  if (aMatch?.type === 'rare') {
    shield = <RareShield />;
    shieldClass = 'top-[-4px]';
  } else if (aMatch?.type === 'legendary') {
    shield = <LegendaryShield />;
    shieldClass = 'top-[-4px] py-0 px-[3px]';
  }

  const getLink = (txHash: string) =>
    txHash.includes('twitter.com')
      ? txHash
      : `https://etherscan.io/tx/${txHash}`;
  const linkTo = `/achievement/${achievement_id}`;
  const unEarned = !readOnly && !date_earned;

  return (
    <div
      className={twMerge(
        'flex w-full mb-4 p-4 rounded-md items-center border',
        unEarned ? 'border-gray opacity-50' : 'border-white opacity-100'
      )}
    >
      <div>
        <Link href={linkTo}>
          <div
            className={twMerge(
              'h-[80px] w-[80px] relative',
              'bg-gray rounded-md overflow-hidden',
              shiny && 'shiny'
            )}
            style={{
              backgroundImage:
                (date_earned || readOnly) && aMatch?.image
                  ? `url(${aMatch.image})`
                  : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </Link>
      </div>
      <div className="flex-1 flex flex-col justify-center px-4 text-center">
        <Link href={linkTo}>
          <h2 className="text-xl md:text-2xl text-green tracking-tight leading-none font-bold">
            {aMatch.title}
          </h2>
        </Link>
        <div>
          <Link href={linkTo}>
            <h4
              className="md:text-lg mb-2 mt-1 md:mt-0 tracking-tight leading-none"
              key={achievement_id}
            >
              {aMatch.requirement.text}
            </h4>
          </Link>
          {date_earned !== undefined && (
            <small className="flex text-xs items-center justify-center">
              {tx_hash ? (
                <a
                  target="_blank"
                  className="mr-2"
                  rel="noopener noreferrer"
                  href={getLink(tx_hash)}
                >
                  {new Date(date_earned * 1000).toLocaleDateString()}
                </a>
              ) : (
                <span className="mr-2">
                  {new Date(date_earned * 1000).toLocaleDateString()}
                </span>
              )}
              {tx_hash && (
                <a
                  className="relative top-[-1px]"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={getLink(tx_hash)}
                >
                  <LinkOut />
                </a>
              )}
            </small>
          )}
        </div>
      </div>
      <div className="h-full flex items-center">
        <div className="flex flex-col justify-center items-center relative h-[80px] w-[80px]">
          <div className={twMerge('absolute inset-0', shieldClass)}>
            {shield}
          </div>
          <span
            className="text-3xl text-white relative tracking-tighter font-bold"
            style={{
              WebkitTextStroke: '1px black',
              textShadow: 'rgb(0 0 0) -1px 2px 2px',
            }}
          >
            {aMatch.points}
          </span>
        </div>
      </div>
    </div>
  );
}
