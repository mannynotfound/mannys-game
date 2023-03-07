import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { twMerge } from 'tailwind-merge';
import { fetcher } from '@/utils';
import { API_URL } from '@/utils/constants';
import { AchievementGamersResponseObject } from '@/utils/types';
import allAchievements from '@/fixtures/achievements.json';
import AchievementBanner from '@/components/AchievementBanner';

const AchievementGamers = ({ achievementId }: { achievementId: number }) => {
  const { data: gamers } = useSWR<AchievementGamersResponseObject[]>(
    `${API_URL}/achievements/id/${achievementId}`,
    fetcher
  );
  const total = gamers?.length ?? 0;
  const aMatch = allAchievements.find((_ach) => _ach.id === achievementId);

  if (!aMatch) {
    return <>{"Couldn't find that achievement, make sure id is valid..."}</>;
  }

  return (
    <>
      <AchievementBanner achievement={{ achievement_id: aMatch.id }} readOnly />
      {total > 0 && gamers !== undefined && (
        <>
          <div className="w-full text-center">
            <h3 className="text-xl font-bold">{total} Gamers Earned</h3>
          </div>
          {gamers
            .sort((a, b) => a.date_earned - b.date_earned)
            .map((gamer) => (
              <Link href={`/achievements/${gamer.gamer}`} key={gamer.gamer}>
                <div className="w-full flex justify-between mb-1 py-1 border-b">
                  <div>{gamer.name}</div>
                  <div>
                    {new Date(gamer.date_earned * 1000).toLocaleDateString()}
                  </div>
                </div>
              </Link>
            ))}
        </>
      )}
    </>
  );
};

const Achievement = () => {
  const router = useRouter();
  const queryId = router.query.achievement_id;
  if (queryId === undefined) {
    return null;
  }

  const achievementId = parseInt(queryId.toString(), 10);
  if (!achievementId || Number.isNaN(achievementId)) {
    return null;
  }

  return (
    <div className="flex flex-col h-full w-full overflow-y-auto px-8 py-4">
      <div
        className={twMerge(
          'border border-b-0 border-green overflow-hidden',
          'text-center text-green mx-auto rounded-t-md p-4 pb-0',
          'h-[90px] w-[300px] mt-[40px]'
        )}
      >
        <div className="border border-b-0 border-green rounded-t-md pt-2 h-full">
          <div className="h-full w-full flex flex-col justify-center text-xl">
            <div className="tracking-tight leading-none">
              <h3>Achievement</h3>
            </div>
            <div className="text-2xl font-bold leading-none text-yellow">
              #{achievementId}
            </div>
          </div>
        </div>
      </div>
      <div
        className={twMerge(
          'w-full max-w-screen-xl mx-auto h-[calc(100vh-300px)]',
          'border border-green rounded-md p-4 text-white'
        )}
      >
        <div className="w-full h-full border border-green rounded-md pl-4">
          <div className="flex flex-col w-full h-full overflow-y-auto">
            <div className="w-full h-auto md:w-3/4 mx-auto pt-4 flex-1">
              <AchievementGamers achievementId={achievementId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievement;
