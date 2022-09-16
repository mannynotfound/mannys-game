import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import allAchievements from 'fixtures/achievements';
import { calculateAchievementPoints } from 'utils';
import { Page } from 'components';
import AchievementBanner from './Banner';

const AchievementBlock = ({ achievements }) => {
  if (!achievements) {
    return null;
  }
  const sortedAchievements = achievements.sort((a, b) => {
    const aMatch = allAchievements.find((ach) => ach.id === a.achievement_id);
    const bMatch = allAchievements.find((ach) => ach.id === b.achievement_id);
    return aMatch.points - bMatch.points;
  });

  return (
    <div>
      {sortedAchievements.map((ach) => (
        <AchievementBanner {...ach} key={ach.achievement_id} />
      ))}
    </div>
  );
};

const getCatAchievements = (achievements, category) => {
  const catAchievements = [];
  achievements.forEach((ach) => {
    const aMatch = allAchievements.find(
      (_ach) => _ach.id === ach.achievement_id
    );
    if (aMatch.category === category) {
      catAchievements.push(ach);
    }
  });

  return catAchievements;
};

const Summary = ({ achievements }) => {
  if (!achievements) {
    return null;
  }
  const mostRecentAchievements = achievements.sort(
    (a, b) => b.date_earned - a.date_earned
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

  const calculateProgressStyle = (cat) => {
    let percent = '0';
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
        <AchievementBanner key={ach.achievement_id} {...ach} shiny />
      ))}
      <div className="text-center mb-2">
        <h3 className="text-xl font-bold">Progress Overview</h3>
      </div>
      <div
        className="w-full rounded-md border border-green relative mb-4 font-bold"
        style={{ height: 46 }}
      >
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
          <div
            className="w-full rounded-md border border-green relative"
            style={{ height: 46 }}
          >
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
          <div
            className="w-full rounded-md border border-green relative"
            style={{ height: 46 }}
          >
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
};

const Achievements = ({ match, account, achievements }) => {
  const addressToUse = match?.params?.address || account?.address;
  const [currentCategory, setCurrentCategory] = useState('summary');

  useEffect(() => {
    if (
      addressToUse &&
      !achievements.data?.[addressToUse] &&
      !achievements.loading
    ) {
      achievements.load(addressToUse);
    }
  }, [addressToUse, achievements]);

  const achievementsData = achievements.data?.[addressToUse] ?? [];

  let body = null;
  if (currentCategory === 'summary') {
    body = <Summary achievements={achievementsData} />;
  } else {
    const catAchievements = [];
    achievementsData?.forEach((ach) => {
      const aMatch = allAchievements.find(
        (_ach) => _ach.id === ach.achievement_id
      );
      if (aMatch.category === currentCategory) {
        catAchievements.push(ach);
      }
    });
    const unusedAchievements = [];
    allAchievements.forEach((ach) => {
      const earnedMatch = achievementsData?.find(
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
        <AchievementBlock achievements={catAchievements} />
        <AchievementBlock achievements={unusedAchievements} />
      </>
    );
  }

  const categories = [];
  allAchievements.forEach((ach) => {
    if (!categories.includes(ach.category)) {
      categories.push(ach.category);
    }
  });

  const getMenuItemClasses = (cat) => {
    const baseClasses = [
      'capitalize',
      'text-xl',
      'mb-4',
      'cursor-pointer',
      'border border-white',
      'rounded-md',
      'px-4 py-2',
    ];

    if (currentCategory === cat) {
      baseClasses.push('bg-green');
      baseClasses.push('font-bold');
      baseClasses.push('text-gray-dark');
    } else {
      baseClasses.push('hover:bg-green');
      baseClasses.push('hover:text-gray-dark');
    }

    return baseClasses.join(' ');
  };

  return (
    <Page>
      <div className="flex flex-col h-full w-full overflow-y-auto px-8 py-4">
        <div
          className="border border-b-0 border-green text-center text-green mx-auto rounded-t-md p-4 pb-0 overflow-hidden"
          style={{ height: 90, marginTop: 40, width: 300 }}
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
          className="w-full max-w-screen-xl mx-auto border border-green rounded-md p-4 text-white"
          style={{
            height: 'calc(100vh - 300px)',
          }}
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
    </Page>
  );
};

export default withRouter((props) => <Achievements {...props} />);
