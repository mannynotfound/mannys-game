import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import allAchievements from '@/fixtures/achievements.json';
import { calculateAchievementPoints, fetcher } from '@/utils';
import { API_URL } from '@/utils/constants';
import { AchievementEarnedObject, AppProps } from '@/utils/types';
import Block from '@/views/achievements/Block';
import Summary from '@/views/achievements/Summary';

export default function Achievements({ web3 }: AppProps) {
  const { account } = web3;
  const router = useRouter();
  const addressToUse = router.query.address || account?.address;
  const [currentCategory, setCurrentCategory] = useState('summary');
  const { data: achievements } = useSWR<AchievementEarnedObject[]>(
    addressToUse === undefined
      ? null
      : `${API_URL}/achievements/gamer/${addressToUse}`,
    fetcher
  );
  const achievementsData = achievements ?? [];

  if (account !== undefined && account.isConnecting && addressToUse) {
    return null;
  }

  if (
    account !== undefined &&
    !account.isConnecting &&
    addressToUse === undefined
  ) {
    return <>Connect your wallet to see your earned achievements.</>;
  }

  let body = null;
  if (currentCategory === 'summary') {
    body = <Summary achievements={achievementsData} />;
  } else {
    const catAchievements: AchievementEarnedObject[] = [];
    achievementsData?.forEach((ach) => {
      const aMatch = allAchievements.find(
        (_ach) => _ach.id === ach.achievement_id
      );
      if (aMatch !== undefined && aMatch.category === currentCategory) {
        catAchievements.push(ach);
      }
    });
    const unusedAchievements: AchievementEarnedObject[] = [];
    allAchievements.forEach((ach) => {
      const earnedMatch = achievementsData.find(
        (a) => a.achievement_id === ach.id
      );
      if (!earnedMatch && ach.category === currentCategory) {
        unusedAchievements.push({
          achievement_id: ach.id,
        });
      }
    });
    body = (
      <>
        <Block achievements={catAchievements} />
        <Block achievements={unusedAchievements} />
      </>
    );
  }

  const categories: string[] = [];
  allAchievements.forEach((ach) => {
    if (!categories.includes(ach.category)) {
      categories.push(ach.category);
    }
  });

  const getMenuItemClasses = (cat: string) =>
    twMerge(
      'capitalize text-xl mb-4 cursor-pointer',
      'border border-white rounded-md px-4 py-2',
      currentCategory === cat
        ? 'bg-green font-bold text-gray-dark'
        : 'hover:bg-green hover:text-gray-dark'
    );

  return (
    <div className="flex flex-col h-full w-full overflow-y-auto px-8 py-4">
      <div
        className={twMerge(
          'border border-b-0 border-green text-center text-green',
          'mx-auto rounded-t-md p-4 pb-0 overflow-hidden',
          'h-[90px] w-[300px] mt-[40px]'
        )}
      >
        <div className="border border-b-0 border-green rounded-t-md pt-2 h-full">
          <div className="h-full w-full flex flex-col justify-center text-xl">
            <div className="tracking-tight leading-none">
              <h3>Achievement Points</h3>
            </div>
            <div className="text-2xl font-bold leading-none text-yellow">
              {calculateAchievementPoints(achievementsData)}
            </div>
          </div>
        </div>
      </div>
      <div
        className={twMerge(
          'w-full max-w-screen-xl mx-auto p-4 h-[calc(100vh-300px)]',
          'border border-green rounded-md text-white'
        )}
      >
        <div className="w-full h-full border border-green rounded-md pl-4">
          <div className="flex flex-col md:flex-row w-full h-full">
            <div className="w-full pr-4 md:pr-0 md:w-1/4 h-auto md:h-full pt-4">
              <div
                className={getMenuItemClasses('summary')}
                key="summary"
                onClick={() => setCurrentCategory('summary')}
              >
                Summary
              </div>
              {categories.map((cat) => (
                <div
                  className={getMenuItemClasses(cat)}
                  key={cat}
                  onClick={() => setCurrentCategory(cat)}
                >
                  {cat}
                </div>
              ))}
            </div>
            <div className="w-full md:w-3/4 md:pl-4 h-full overflow-y-auto pr-4 pt-4">
              {body}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
