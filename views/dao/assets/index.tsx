import Link from 'next/link';
import { useBalance } from 'wagmi';
import { LinkOut } from '@/components/Svg';
import useExchangePrice from '@/hooks/useExchangePrice';
import useFloorPrice from '@/hooks/useFloorPrice';
import { MANNY_DAO } from '@/utils/constants';

export default function Assets() {
  const { data } = useBalance({ address: MANNY_DAO });
  const balanceStr = data?.formatted ?? '0';
  const balance = parseFloat(balanceStr);
  const exchangePrice = useExchangePrice(10000);
  const floorPrices = useFloorPrice([
    ['cryptoadz-by-gremplin', 1],
    ['alpacadabraz-3d', 1],
    ['turfnft', 3],
    ['mannys-game', 28],
    ['okpc', 1],
    ['adworld', 1],
    ['silk-road-by-ezra-miller', 1],
  ]);
  const toadFloorPrice = floorPrices ? floorPrices['cryptoadz-by-gremplin'] : 0;
  const usd = balance * exchangePrice;

  const formatValue = (val: number, type: string, label?: string) => {
    if (type === 'eth') {
      return (
        <h3 className="text-3xl">
          {label && <span className="text-lg md:text-3xl">{label}: </span>}
          <b className="text-green">
            {val?.toFixed?.(2)}
            <span className="text-yellow">Ξ</span>
          </b>
        </h3>
      );
    }

    if (type === 'usd') {
      return (
        <h3 className="text-3xl">
          {label && <span className="text-lg md:text-3xl">{label}: </span>}
          <b className="text-green">
            <span className="text-yellow">$</span>
            {val?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </b>
        </h3>
      );
    }

    return null;
  };

  const calculateAssetValues = (type = 'eth') => {
    const assets = [
      5000, // exodia head
      4200, // mario pikachu
    ].reduce((a, b) => a + b, 0);

    const totalFloorPrices = Object.keys(floorPrices).reduce(
      (a, b) => a + floorPrices[b],
      0
    );

    if (type === 'eth') {
      const assetEth = assets / exchangePrice + totalFloorPrices;
      return formatValue(assetEth, 'eth');
    }

    if (type === 'usd') {
      const assetUsd = assets + totalFloorPrices * exchangePrice;
      return formatValue(assetUsd, 'usd');
    }

    return '';
  };

  return (
    <div className="h-full overflow-y-scroll">
      <section className="p-8" id="assets">
        <div className="flex items-center mb-6">
          <div className="flex-1">
            <Link href="/dao">🠐 Back</Link>
          </div>
          <h2 className="text-4xl md:text-7xl text-green text-center flex-1">
            <b className="tracking-tighter">Assets</b>
          </h2>
          <div className="flex-1" />
        </div>
        <div className="w-full mb-10 border-t-2 border-b-2 border-green py-8">
          <div className="flex flex-col md:flex-row items-center justify-center max-w-screen-xl mx-auto">
            <div className="border-b-2 mb-4 pb-4 border-r-0 pr-0 mr-0 md:mr-10 md:border-r-2 md:border-white md:pr-10 md:border-b-0 md:mb-0 md:pb-0">
              <a
                className="block text-xl mb-2"
                href="https://etherscan.io/address/0xd0fa4e10b39f3ac9c95dea8151f90b20c497d187"
                target="_blank"
                rel="noopener noreferrer"
              >
                mannyDAO.eth balance
              </a>
              <div className="flex">
                {formatValue(balance, 'eth')}
                <div className="ml-4 flex">
                  {usd && <span className="text-3xl text-white mr-4">-</span>}
                  {usd && formatValue(usd, 'usd')}
                </div>
              </div>
            </div>
            <div className="">
              <a
                className="block text-xl mb-2"
                href="https://opensea.io/mannyDAO"
                target="_blank"
                rel="noopener noreferrer"
              >
                mannyDAO.eth assets
              </a>
              <div className="flex">
                {calculateAssetValues('eth')}

                <div className="ml-4 flex">
                  {toadFloorPrice && exchangePrice && (
                    <span className="text-3xl text-white mr-4">-</span>
                  )}
                  {toadFloorPrice &&
                    exchangePrice &&
                    calculateAssetValues('usd')}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row w-full max-w-screen-xl mx-auto">
          <div className="flex-1 mb-6 md:mb-0 md:pr-5">
            <Link href="/dao/assets/mario-pikachu">
              <div className="mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="exodia slab"
                  src="/assets/mariopikachuslabsquare.png"
                  className="w-full h-auto mx-auto"
                />
              </div>
              <h2 className="text-3xl md:text-5xl md:mb-3 text-green leading-none">
                <b>Mario Pikachu Promo</b>
              </h2>
            </Link>
            <div className="flex items-start justify-start md:items-center">
              <span>{formatValue(4200, 'usd', 'Est Value')}</span>
              <a
                className="ml-4 md:ml-8 relative top-[-3px]"
                href="https://www.psacard.com/cert/47780351"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkOut />
              </a>
            </div>
          </div>
          <div className="flex-1 mb-6 md:mb-0 md:pr-5">
            <Link href="/dao/assets/cryptoadz-5958">
              <div className="mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="cryptoadz 5958"
                  src="/assets/toad.png"
                  className="w-full h-auto mx-auto"
                />
              </div>
              <h2 className="text-3xl md:text-5xl md:mb-3 text-green leading-none">
                <b>CrypToadz #5958</b>
              </h2>
            </Link>
            <div className="flex items-start justify-start md:items-center">
              <span>{formatValue(toadFloorPrice, 'eth', 'Floor Price')}</span>
              <a
                className="ml-4 md:ml-8 relative top-[3px]"
                href="https://opensea.io/assets/0x1cb1a5e65610aeff2551a50f76a87a7d3fb649c6/5958"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkOut />
              </a>
            </div>
          </div>
          <div className="flex-1 md:pl-5">
            <Link href="/dao/assets/forbidden-one">
              <div className="mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="exodia slab"
                  src="/assets/exodiaslabsquare.png"
                  className="w-full h-auto mx-auto"
                />
              </div>
              <h2 className="text-3xl md:text-5xl md:mb-3 text-green leading-none">
                <b>Exodia The Forbidden One</b>
              </h2>
            </Link>
            <div className="flex items-start justify-start md:items-center">
              <span>{formatValue(5000, 'usd', 'Est Value')}</span>
              <a
                className="ml-4 md:ml-8 relative top-[-3px]"
                href="https://www.psacard.com/cert/62691719"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkOut />
              </a>
            </div>
            <i className="md:mt-2 block text-xl text-white">Fractionalized</i>
          </div>
        </div>
      </section>
    </div>
  );
}
