import { useBalance } from 'wagmi';
import useExchangePrice from '@/hooks/useExchangePrice';
import useFloorPrice from '@/hooks/useFloorPrice';
import { MANNY_DAO } from '@/utils/constants';
import { useMemo } from 'react';
import { LinkOut } from '@/components/Svg';

export default function Holdings() {
  const { data } = useBalance({ address: MANNY_DAO });
  const balanceStr = data?.formatted ?? '0';
  const balance = parseFloat(balanceStr);
  const exchangePrice = useExchangePrice();
  const floorPrices = useFloorPrice([
    ['cryptoadz-by-gremplin', 1],
    ['alpacadabraz-3d', 1],
    ['turfnft', 3],
    ['mannys-game', 28],
    ['okpc', 1],
    ['adworld', 1],
    ['silk-road-by-ezra-miller', 1],
  ]);

  const totalHoldings = useMemo(() => {
    const assets = [
      5000, // exodia head
      4200, // mario pikachu
    ].reduce((a, b) => a + b, 0);

    const totalFloorPrices = Object.keys(floorPrices).reduce(
      (a, b) => a + floorPrices[b],
      0
    );
    const totalBalance = balance + totalFloorPrices;
    return (assets + totalBalance * exchangePrice).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }, [floorPrices, exchangePrice]);
  return (
    <div className="p-8 text-left">
      <div className="mb-4">
        <img
          className="w-4/5"
          alt="manny dao logo"
          src="/misc/mannyDAOlogo.svg"
        />
      </div>
      <h2 className="color-[darkgray]">
        The treasury for Mannys holders everywhere, focused on collecting and
        curating the most headass pieces of culture.
      </h2>
      <div className="mt-4">
        <h3 className="text-3xl font-bold">
          Holdings:{' '}
          <span className="text-green">
            <span className="text-yellow">$</span>
            {totalHoldings}
          </span>
          <a
            className="text-yellow flex gap-x-2 items-center"
            href="https://etherscan.io/address/0xd0fa4e10b39f3ac9c95dea8151f90b20c497d187"
            target="_blank"
            rel="noreferrer noopener"
          >
            <small className="block mt-1 text-xs">
              Combined Liquid + Assets Value
            </small>
            <LinkOut />
          </a>
        </h3>
      </div>
    </div>
  );
}
