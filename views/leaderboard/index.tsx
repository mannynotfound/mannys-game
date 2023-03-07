import { ReactNode } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { SkinsConfig, LeaderboardResponse } from '@/utils/types';
import { fetcher } from '@/utils';
import { API_URL } from '@/utils/constants';

const getTokenLink = (tokenId: number) =>
  `https://opensea.io/assets/0x2bd58a19c7e4abf17638c5ee6fa96ee5eb53aed9/${tokenId}`;

const Tokens = ({ tokenData }: { tokenData: number[] }) => {
  const tokenBody: ReactNode[] = [];
  tokenData.sort((a, b) => a - b);
  Object.entries(SkinsConfig).forEach(([skinType, skinOptions]) => {
    const { emoji } = skinOptions;
    skinOptions.tokens.forEach((tokenId) => {
      if (tokenData.includes(tokenId)) {
        tokenBody.push(
          <span
            className="inline-block w-[25px] h-[25px] my-0.5 mx-0"
            key={`${skinType}-${tokenId}`}
            title={`${tokenId} ${skinType}`}
          >
            <a
              href={getTokenLink(tokenId)}
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                className="w-full h-auto"
                src={`/tokens/emoji_${emoji}.png`}
                alt={`${tokenId} ${skinType}`}
              />
            </a>
          </span>
        );
      }
    });
  });

  return <>{tokenBody}</>;
};

const shortenName = (name: string) => {
  if (!name.startsWith('0x')) {
    return name;
  }

  return name.substring(0, 4) + '...' + name.substring(name.length - 4);
};

export default function Leaderboard() {
  const { data: leaderboard } = useSWR<LeaderboardResponse>(
    `${API_URL}/leaderboard`,
    fetcher
  );

  let body = null;

  if (!leaderboard?.data) {
    body = 'Loading leaderboard....';
  } else {
    const tableBody = leaderboard.data.map((gamer, i) => (
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
            className="inline-block text-green overflow-hidden text-ellipsis max-w-[120px]"
          >
            {shortenName(gamer.name)}
          </a>
        </td>
        <td className="px-3 py-5">
          <Tokens tokenData={gamer.tokens} />
        </td>
        <td className="px-3 py-5 text-center text-2xl font-bold text-yellow">
          <Link
            href={`/achievements/${gamer.owner}`}
            title={gamer.score.toString()}
          >
            {i + 1}
          </Link>
        </td>
      </tr>
    ));

    body = (
      <>
        {leaderboard.updated_at && (
          <div className="TableUpdate w-full text-center mb-6 text-white">
            Last Updated At: {new Date(leaderboard.updated_at).toLocaleString()}
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

  return <div className="flex flex-col h-full px-8 py-4">{body}</div>;
}
