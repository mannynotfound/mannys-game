import { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';

import allAchievements from 'fixtures/achievements';
import { Page } from 'components';
import AchievementBanner from './Banner';

const Achievement = ({ match }) => {
  const achievementId = parseInt(match?.params?.achievementId, 10);
  if (!achievementId || Number.isNaN(achievementId)) {
    return null;
  }

  const aMatch = allAchievements.find((_ach) => _ach.id === achievementId);
  const [gamers, setGamers] = useState([]);
  useEffect(() => {
    const fetchAchievements = async (id) => {
      setGamers([]);
      const fetchUrl = window.location.host.includes('localhost')
        ? 'http://localhost:3001'
        : 'https://mannys-game-server.herokuapp.com';
      fetch(`${fetchUrl}/api/achievements/id/${id}`, { mode: 'cors' })
        .then((resp) => resp.json())
        .then((json) => {
          setGamers(json);
        })
        .catch((err) => {
          alert(err);
        });
    };

    if (aMatch && achievementId) {
      fetchAchievements(achievementId);
    }
  }, [aMatch, achievementId]);

  const total = gamers?.length;
  let body;
  if (!aMatch) {
    body = "Couldn't find that achievement, make sure id is valid...";
  } else {
    body = (
      <>
        <AchievementBanner achievement_id={aMatch.id} readOnly />
        {total > 0 && (
          <>
            <div className="w-full text-center">
              <h3 className="text-xl font-bold">{total} Gamers Earned</h3>
            </div>
            {gamers
              .sort((a, b) => a.date_earned - b.date_earned)
              .map((gamer) => (
                <Link to={`/achievements/${gamer.gamer}`} key={gamer.gamer}>
                  <div className="w-full flex justify-between mb-1 pb-1 pt-1 border-b">
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
  }

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
                <h3>Achievement</h3>
              </div>
              <div className="text-2xl font-bold leading-none text-yellow">
                #{achievementId}
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
            <div className="flex flex-col w-full h-full overflow-y-auto">
              <div className="w-full h-auto md:w-3/4 mx-auto pt-4 flex-1">
                {body}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default withRouter((props) => <Achievement {...props} />);
