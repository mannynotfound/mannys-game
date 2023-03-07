import allAchievements from '@/fixtures/achievements.json';
import AchievementBanner from '@/components/AchievementBanner';
import { AchievementEarnedObject } from '@/utils/types';

const getCatAchievements = (
  achievements: AchievementEarnedObject[],
  category: string
) => {
  const catAchievements: AchievementEarnedObject[] = [];
  achievements.forEach((ach) => {
    const aMatch = allAchievements.find(
      (_ach) => _ach.id === ach.achievement_id
    );
    if (aMatch?.category === category) {
      catAchievements.push(ach);
    }
  });

  return catAchievements;
};

type Props = {
  achievements: AchievementEarnedObject[];
};

export default function Summary({ achievements }: Props) {
  const mostRecentAchievements = achievements.sort(
    (a, b) => (b?.date_earned ?? 0) - (a?.date_earned ?? 0)
  );

  const genesisAchievements = getCatAchievements(achievements, 'genesis');
  const gamingAchievements = getCatAchievements(achievements, 'gaming');

  const totalAchievements = allAchievements.length;
  const totalGenesis = allAchievements.filter(
    (ach) => ach.category === 'genesis'
  ).length;
  const totalGaming = allAchievements.filter(
    (ach) => ach.category === 'gaming'
  ).length;
  const earnedLength = achievements.length;
  const genesisEarned = genesisAchievements.length;
  const gamingEarned = gamingAchievements.length;

  const calculateProgressStyle = (cat: string) => {
    let percent = 0;
    if (cat === 'all') {
      percent = Math.round((100 / totalAchievements) * earnedLength);
    } else {
      const catAchievements = getCatAchievements(achievements, cat);
      percent = Math.round((100 / totalAchievements) * catAchievements.length);
    }

    return { width: `${percent}%` };
  };

  return (
    <div>
      <div className="text-center mb-2">
        <h3 className="text-xl font-bold">Recent Achievements</h3>
      </div>
      {mostRecentAchievements.slice(0, 3).map((ach) => (
        <AchievementBanner key={ach.achievement_id} achievement={ach} shiny />
      ))}
      <div className="text-center mb-2">
        <h3 className="text-xl font-bold">Progress Overview</h3>
      </div>
      <div className="w-full rounded-md border border-green relative mb-4 font-bold h-[46px]">
        <div
          className="h-full bg-green"
          style={calculateProgressStyle('all')}
        />
        <div className="absolute left-0 top-0 text-xl h-full ml-4 flex items-center text-white">
          Achievements Earned
        </div>
        <div className="absolute right-0 top-0 text-xl h-full mr-4 flex items-center">
          {earnedLength}/{totalAchievements}
        </div>
      </div>
      <div className="flex font-bold">
        <div className="flex-1 mr-2">
          <div className="w-full rounded-md border border-green relative h-[46px]">
            <div
              className="h-full bg-green"
              style={calculateProgressStyle('genesis')}
            />
            <div className="absolute left-0 top-0 text-xl h-full ml-4 flex items-center text-white">
              Genesis
            </div>
            <div className="absolute right-0 top-0 text-xl h-full mr-4 flex items-center">
              {genesisEarned}/{totalGenesis}
            </div>
          </div>
        </div>
        <div className="flex-1 ml-2">
          <div className="w-full rounded-md border border-green relative h-[46px]">
            <div
              className="h-full bg-green"
              style={calculateProgressStyle('gaming')}
            />
            <div className="absolute left-0 top-0 text-xl h-full ml-4 flex items-center text-white">
              Gaming
            </div>
            <div className="absolute right-0 top-0 text-xl h-full mr-4 flex items-center">
              {gamingEarned}/{totalGaming}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
