import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Page } from 'components';
import { skinMap } from 'utils';

const getTokenLink = (tokenId) =>
  `https://opensea.io/assets/0x2bd58a19c7e4abf17638c5ee6fa96ee5eb53aed9/${tokenId}`;

const Tokens = ({ tokenData }) => {
  const tokenStyle = {
    display: 'inline-block',
    width: 25,
    height: 25,
    margin: '2px 0',
  };
  const imgStyle = {
    width: '100%',
    height: 'auto',
  };
  const tokenBody = [];
  tokenData.sort((a, b) => a - b);
  Object.keys(skinMap).forEach((skinType) => {
    skinMap[skinType].tokens.forEach((tokenId) => {
      const { emoji } = skinMap[skinType];
      if (tokenData.includes(tokenId)) {
        tokenBody.push(
          <span
            className="EmojiToken"
            key={`${skinType}-${tokenId}`}
            title={`${tokenId} ${skinType}`}
            style={tokenStyle}
          >
            <a
              href={getTokenLink(tokenId)}
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                src={`/tokens/emoji_${emoji}.png`}
                alt={`${tokenId} ${skinType}`}
                style={imgStyle}
              />
            </a>
          </span>
        );
      }
    });
  });

  // add base rares and commons
  tokenData.forEach((tokenId) => {
    const isBase = Object.keys(skinMap).every((skin) =>
      skinMap[skin].tokens.every((tId) => tId !== tokenId)
    );

    if (tokenId <= 403 && isBase) {
      tokenBody.push(
        <span
          className="EmojiToken"
          key={`baserare-${tokenId}`}
          title={`${tokenId} base rare`}
          style={tokenStyle}
        >
          <a
            href={getTokenLink(tokenId)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/tokens/emoji_baserare.png"
              alt={`${tokenId} base rare`}
              style={imgStyle}
            />
          </a>
        </span>
      );
    } else if (tokenId > 404 && isBase) {
      tokenBody.push(
        <span
          className="EmojiToken"
          key={`common-${tokenId}`}
          title={`${tokenId} common`}
          style={tokenStyle}
        >
          <a
            href={getTokenLink(tokenId)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/tokens/emoji_common.png"
              alt={`${tokenId} common`}
              style={imgStyle}
            />
          </a>
        </span>
      );
    }
  });

  return <div className="LeaderboardTokens">{tokenBody}</div>;
};

const Leaderboard = ({ leaderboard }) => {
  useEffect(() => {
    if (!leaderboard?.data?.data && !leaderboard.loading) {
      leaderboard.load();
    }
  }, [leaderboard]);

  let body = null;

  const shortenName = (name) => {
    if (!name.startsWith('0x')) {
      return name;
    }

    return name.substr(0, 4) + '...' + name.substr(-4);
  };

  if (!leaderboard?.data?.data) {
    body = 'Loading leaderboard....';
  } else {
    const tableBody = leaderboard.data.data.map((gamer, i) => (
      <tr
        data-row-key={i}
        key={gamer.owner}
        className="border-gray-light border-b"
      >
        <td className="px-3 py-5">
          <a
            href={`https://opensea.io/${gamer.owner}`}
            target="_blank"
            rel="noreferrer noopener"
            style={{ maxWidth: 120 }}
            className="inline-block text-green overflow-hidden text-ellipsis"
          >
            {shortenName(gamer.name)}
          </a>
        </td>
        <td className="px-3 py-5">
          <Tokens tokenData={gamer.tokens} />
        </td>
        <td className="px-3 py-5 text-center text-2xl font-bold text-yellow">
          <Link to={`/achievements/${gamer.owner}`} title={gamer.score}>
            {i + 1}
          </Link>
        </td>
      </tr>
    ));

    body = (
      <>
        {leaderboard.data.updated_at && (
          <div className="TableUpdate w-full text-center mb-6 text-white">
            Last Updated At:{' '}
            {new Date(leaderboard.data.updated_at).toLocaleString()}
          </div>
        )}
        <table className="w-full">
          <thead className="text-white text-xl text-bold">
            <tr className="bg-gray border-gray-light border-b">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Tokens</th>
              <th className="p-3 text-left">Rank</th>
            </tr>
          </thead>
          <tbody>{tableBody}</tbody>
        </table>
      </>
    );
  }

  return (
    <Page>
      <div className="flex flex-col h-full overflow-y-scroll px-8 py-4">
        {body}
      </div>
    </Page>
  );
};

export default Leaderboard;
