import AchievementBanner from '@/components/AchievementBanner';
import allAchievements from '@/fixtures/achievements.json';
import { AchievementEarnedObject } from '@/utils/types';

type Props = {
  achievements: AchievementEarnedObject[];
};

export default function AchievementBlock({ achievements }: Props) {
  const sortedAchievements = achievements.sort((a, b) => {
    const aPoints =
      allAchievements.find((ach) => ach.id === a.achievement_id)?.points ?? 0;
    const bPoints =
      allAchievements.find((ach) => ach.id === b.achievement_id)?.points ?? 0;
    return aPoints - bPoints;
  });

  return (
    <div>
      {sortedAchievements.map((ach) => (
        <AchievementBanner achievement={ach} key={ach.achievement_id} />
      ))}
    </div>
  );
}
