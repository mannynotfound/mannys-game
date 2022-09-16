import { Link } from 'react-router-dom';
import allAchievements from 'fixtures/achievements';
import {
  LinkOut,
  CommonShield,
  RareShield,
  LegendaryShield,
} from 'components/Svg';

const AchievementBanner = ({
  achievement_id,
  date_earned,
  requirements,
  shiny,
  readOnly,
}) => {
  const aMatch = allAchievements.find((ach) => ach.id === achievement_id);

  const borderClasses = [
    'border',
    !readOnly && !date_earned ? 'border-gray' : 'border-white',
  ].join(' ');

  const activeClass = !readOnly && !date_earned ? 'opacity-50' : 'opacity-100';
  const shinyClass = shiny ? 'shiny' : '';

  let shield = <CommonShield />;
  let shieldStyles = { padding: '0 7px' };
  if (aMatch.type === 'rare') {
    shield = <RareShield />;
    shieldStyles = { top: -4 };
  } else if (aMatch.type === 'legendary') {
    shield = <LegendaryShield />;
    shieldStyles = { top: -4, padding: '0 3px' };
  }

  const getLink = (txHash) => {
    if (txHash.includes('twitter.com')) {
      return txHash;
    }

    return `https://etherscan.io/tx/${txHash}`;
  };

  const linkTo = `/achievement/${achievement_id}`;

  return (
    <div
      className={`flex w-full mb-4 ${borderClasses} ${activeClass} rounded-md p-4 items-center`}
    >
      <div>
        <Link to={linkTo}>
          <div
            className={`bg-gray rounded-md relative overflow-hidden ${shinyClass}`}
            style={{
              height: 80,
              width: 80,
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
        <Link to={linkTo}>
          <h2 className="text-xl md:text-2xl text-green tracking-tight leading-none">
            <b>{aMatch.title}</b>
          </h2>
        </Link>
        {aMatch.requirements.map((r) => {
          const earnedMatch = requirements?.find(
            (_r) => _r.requirement_id === r.id
          );
          return (
            <div key={r.id}>
              <Link to={linkTo}>
                <h4
                  className="md:text-lg mb-2 mt-1 md:mt-0 tracking-tight leading-none"
                  key={r.id}
                >
                  {r.text}
                </h4>
              </Link>
              {earnedMatch && (
                <small className="flex text-xs items-center justify-center">
                  {earnedMatch?.tx_hash ? (
                    <a
                      target="_blank"
                      className="mr-2"
                      rel="noopener noreferrer"
                      href={getLink(earnedMatch.tx_hash)}
                    >
                      {new Date(date_earned * 1000).toLocaleDateString()}
                    </a>
                  ) : (
                    <span className="mr-2">
                      {new Date(date_earned * 1000).toLocaleDateString()}
                    </span>
                  )}
                  {earnedMatch?.tx_hash && (
                    <a
                      style={{ position: 'relative', top: -1 }}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={getLink(earnedMatch.tx_hash)}
                    >
                      <LinkOut />
                    </a>
                  )}
                </small>
              )}
            </div>
          );
        })}
      </div>
      <div className="h-full flex items-center">
        <div
          className="flex flex-col justify-center items-center relative"
          style={{ height: 80, width: 80 }}
        >
          <div className="absolute inset-0 z-0" style={shieldStyles}>
            {shield}
          </div>
          <span className="text-3xl text-white relative z-10 tracking-tighter">
            <b
              style={{
                WebkitTextStroke: '1px black',
                textShadow: 'rgb(0 0 0) -1px 2px 2px',
              }}
            >
              {aMatch.points}
            </b>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AchievementBanner;
