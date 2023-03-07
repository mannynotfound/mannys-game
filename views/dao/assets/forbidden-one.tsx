import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import useSWR from 'swr';
import { API_URL } from '@/utils/constants';
import { fetcher } from '@/utils';
import { FractionsObject, FractionsResponse } from '@/utils/types';

export default function ForbiddenOne() {
  const { data: fractionsResp } = useSWR<FractionsResponse>(
    `${API_URL}/fractions/drop-1`,
    fetcher
  );
  const fractions = fractionsResp?.fractions ?? [];

  const renderDropImages = () => {
    const images = [];
    const fractionMatches: FractionsObject[] = [];

    // rows and cols
    const key = 'exo';
    let tokenIdx = 1;
    const folder = 'forbidden-one';
    const allTokens = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const nextImage = `/drops/${folder}/${key}_${i}_${j}.jpg`;
        images.push(nextImage);
        allTokens.push(tokenIdx);
        tokenIdx += 1;
      }
    }

    allTokens.forEach((tokenId) => {
      const fractionMatch = fractions.find((f) => f.token_id === tokenId);
      if (fractionMatch) {
        fractionMatches.push(fractionMatch);
      }
      tokenIdx += 1;
    });

    return images.map((image, i) => (
      <div
        className={twMerge(
          'w-auto h-0 pb-[100%] relative fraction-image',
          fractionMatches[i] && 'fraction-match'
        )}
        key={image}
      >
        <img alt="drop 1 piece" src={image} className="absolute inset-0" />
        {fractionMatches[i] && (
          <a
            className="absolute block inset-0 fraction-detail text-xs p-2 overflow-y-auto bg-black bg-opacity-50"
            href={`https://opensea.io/assets/0xdaa69d3d9f9e6d9d0f6afdec82ca9acfabf33b43/${
              i + 1
            }`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>
              <b>{fractionMatches[i].name}</b>
            </p>
            {fractionMatches[i].message && (
              <i className="mt-2 block">{fractionMatches[i].message}</i>
            )}
          </a>
        )}
      </div>
    ));
  };

  return (
    <section className="p-8 border-t-2 border-yellow h-full overflow-auto pb-[100px]">
      <div className="max-w-screen-xl mx-auto mb-2">
        <Link href="/dao/assets" className="text-lg">
          🠐 Back
        </Link>
      </div>
      <div className="w-full max-w-screen-xl mx-auto flex justify-between items-center mb-6">
        <h2 className="text-4xl md:text-7xl text-yellow text-center flex items-center">
          <b className="tracking-tighter">The Forbidden One</b>
        </h2>
      </div>
      <div className="grid gap-2 grid-cols-8 grid-rows-8 mb-10 max-w-screen-xl mx-auto">
        {renderDropImages()}
      </div>
      <h2 className="text-5xl mb-6 text-yellow text-center">
        <b className="tracking-tighter">History</b>
      </h2>
      <div className="flex flex-col md:flex-row w-full max-w-screen-xl mx-auto">
        <div className="flex-1 font-body text-xl mb-10 md:pr-8">
          <div className="w-full mb-6">
            <img
              alt="yugi pulls exodia"
              src="/drops/yugiexodia.jpg"
              className="w-full h-auto"
            />
          </div>
          <p>
            MannyDAO has successfully acquired a PSA 10 example of a Yu-Gi-Oh!
            grail - 1st Edition Legend of Blue Eyes printing of Exodia The
            Forbidden One. Originally released in America in 2002, Exodia made
            its pop culture debut in episode 1 of Yu-Gi-Oh's mega-popular TV
            series. The show's protagonist, Yami Yugi, famously puts his heart
            into the cards and draws all five pieces of Exodia, which grants him
            an automatic victory against his opponent Kaiba, obliterating his
            three Blue Eyes White Dragons.
          </p>
          <div className="w-full flex my-6">
            <div className="flex-1 pr-4">
              <img
                alt="yugi pulls exodia"
                src="/drops/exodiameme.png"
                className="w-full h-auto"
              />
            </div>
            <div className="flex-1 pl-4">
              <img
                alt="kaiba gets obliterated"
                src="/drops/kaibameme.png"
                className="w-full h-auto"
              />
            </div>
          </div>
          <p className="mt-4">
            Exodia has become a meme in its own right beyond the franchise,
            where its "five piece" mechanic has been parodied many times over.
            In other memes, a freeze frame of Yugi's opponent Kaiba just before
            he loses the duel is used to express upset and shock. The gathering
            mechanic of Exodia was also particularly influential to Manny as he
            was developing the concept for the mannys.game smart contract.
          </p>
          <p className="mt-4">
            On 1/22/2022, a snapshot of Special Edition manny holders was taken
            and added to an allowlist for the initial offering of ERC721 NFTs
            representing fractional ownership of this card. 64 fractions
            represented by actual pieces of the card's artwork were made
            available to claim.
          </p>
        </div>
        <div className="flex-1 md:pl-8">
          <img
            className="mx-auto w-full h-auto"
            alt="exodia the forbidden one psa 10"
            src="/assets/exodiaslab.png"
          />
        </div>
      </div>
    </section>
  );
}
