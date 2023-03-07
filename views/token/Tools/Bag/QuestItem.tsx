import { useState, useRef, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import createFrogger from '@/views/token/Quests/Frogger';
import type { TokenStateDispatch, SetTooltipArgs } from '@/views/token/types';
import type { Quest } from '@/fixtures/quests';

type Props = {
  quest: Quest;
  imageUrl: string;
  tokenId: number;
  setTooltip: (args: SetTooltipArgs) => void;
  dispatch: TokenStateDispatch;
};

export default function QuestItem({
  quest,
  imageUrl,
  tokenId,
  setTooltip,
  dispatch,
}: Props) {
  const itemRef = useRef<HTMLDivElement>(null);

  const [distanceFromEdge, setDistanceFromEdge] = useState(0);
  useEffect(() => {
    const itemRect = itemRef.current?.getBoundingClientRect();
    if (itemRect === undefined) return;
    setDistanceFromEdge(window.innerWidth - itemRect.right);
  }, []);

  const itemClasses = twMerge(
    'border border-green hover:border-white h-[40px] w-[40px]',
    'relative inline-block rounded-md p-1 cursor-pointer'
  );

  return (
    <div
      ref={itemRef}
      className={itemClasses}
      onMouseEnter={() => {
        setTooltip({
          ...quest,
          bgColor: 'magenta',
          distanceFromEdge,
        });
      }}
      onClick={() => {
        dispatch({
          type: 'SET_QUEST_MODE',
          tokenId,
          payload: {
            quest,
          },
        });

        if (quest.id === 'toadz') {
          setTimeout(() => {
            const froggerGame = createFrogger(5958);
            froggerGame.observer.publish('game-load');

            const endGame = (isWin: boolean) => {
              setTimeout(() => {
                dispatch({
                  type: 'SET_QUEST_MODE',
                  tokenId,
                  payload: {
                    quest: {},
                  },
                });
                dispatch({
                  type: 'SET_MOOD',
                  tokenId,
                  payload: {
                    mood: isWin ? 'cheering' : 'agony',
                  },
                });
              }, 2500);
            };

            froggerGame.observer.subscribe('game-over', () => {
              endGame(false);
            });
            froggerGame.observer.subscribe('game-won', () => {
              endGame(true);
            });
          }, 100);
        }
      }}
    >
      <div className="absolute inset-0 opacity-50 highlight" />
      <div className="absolute inset-0 opacity-50 bg-magenta" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </div>
  );
}
