import { Link } from 'react-router-dom';
import { useBalance } from 'wagmi';

import { useExchangePrice, useFloorPrice } from 'hooks';
import { Page } from 'components';

const LinkOut = () => (
  <svg
    id="svg3025"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48.6 41.66"
    style={{ height: 35, width: 35 }}
  >
    <g id="g3027">
      <path
        id="path3029"
        fill="#ffffff"
        d="M38.18,25.17v8.67a7.84,7.84,0,0,1-7.81,7.82H7.81a7.53,7.53,0,0,1-5.52-2.3A7.49,7.49,0,0,1,0,33.84V11.28A7.52,7.52,0,0,1,2.29,5.76,7.56,7.56,0,0,1,7.81,3.47H26.9a.84.84,0,0,1,.87.87V6.07a.85.85,0,0,1-.24.63.87.87,0,0,1-.63.24H7.81A4.18,4.18,0,0,0,4.75,8.22a4.18,4.18,0,0,0-1.28,3.06V33.84a4.18,4.18,0,0,0,1.28,3.07,4.17,4.17,0,0,0,3.06,1.27H30.37a4.34,4.34,0,0,0,4.34-4.34V25.17a.84.84,0,0,1,.87-.87h1.74a.84.84,0,0,1,.62.24A.87.87,0,0,1,38.18,25.17ZM48.6,1.74V15.62a1.64,1.64,0,0,1-.52,1.22,1.69,1.69,0,0,1-2.44,0l-4.77-4.77L23.19,29.75a.86.86,0,0,1-1.25,0l-3.09-3.09a.86.86,0,0,1,0-1.25L36.53,7.73,31.76,3a1.66,1.66,0,0,1-.52-1.22A1.64,1.64,0,0,1,31.76.52,1.64,1.64,0,0,1,33,0H46.86a1.64,1.64,0,0,1,1.22.52A1.64,1.64,0,0,1,48.6,1.74Z"
      />
    </g>
  </svg>
);

export default function Assets() {
  const { data } = useBalance({
    addressOrName: 'mannydao.eth',
  });
  const balance = parseFloat(data?.formatted) || 0;
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
  const usd = (balance * exchangePrice).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formatValue = (val, type, label = '') => {
    if (type === 'eth') {
      return (
        <h3 className="text-3xl">
          {label && <span className="text-lg md:text-3xl">{label}: </span>}
          <b className="text-green">
            {val.toFixed(2)}
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
            {val.toLocaleString(undefined, {
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
      10000, // exodia head
      2750, // mario pikachu
    ].reduce((a, b) => a + b, 0);

    const totalFloorPrices = Object.keys(floorPrices).reduce(
      (a, b) => a + floorPrices[b],
      0
    );

    if (type === 'eth') {
      const assetEth = assets / exchangePrice + totalFloorPrices;
      return formatValue(assetEth, 'eth', '');
    }

    if (type === 'usd') {
      const assetUsd = assets + totalFloorPrices * exchangePrice;
      return formatValue(assetUsd, 'usd', '');
    }

    return '';
  };

  return (
    <Page className="text-white">
      <div className="h-full overflow-y-scroll">
        <section className="p-8" id="assets">
          <div className="flex items-center mb-6">
            <div className="flex-1">
              <Link to="/dao">🠐 Back</Link>
            </div>
            <h2 className="text-4xl md:text-7xl text-green text-center flex-1">
              <b className="tracking-tighter">Assets</b>
            </h2>
            <div className="flex-1" />
          </div>
          {balance && (
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
                      {usd && (
                        <span className="text-3xl text-white mr-4">-</span>
                      )}
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
          )}
          <div className="flex flex-col md:flex-row w-full max-w-screen-xl mx-auto">
            <div className="flex-1 mb-6 md:mb-0 md:pr-5">
              <Link to="/dao/assets/mario-pikachu">
                <div className="mb-6">
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
                <span>{formatValue(2750, 'usd', 'Est Value')}</span>
                <a
                  className="ml-4 md:ml-8"
                  style={{ position: 'relative', top: -3 }}
                  href="https://www.psacard.com/cert/47780351"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkOut />
                </a>
              </div>
            </div>
            <div className="flex-1 mb-6 md:mb-0 md:pr-5">
              <Link to="/dao/assets/cryptoadz-5958">
                <div className="mb-6">
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
                  className="ml-4 md:ml-8"
                  style={{ position: 'relative', top: -3 }}
                  href="https://opensea.io/assets/0x1cb1a5e65610aeff2551a50f76a87a7d3fb649c6/5958"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkOut />
                </a>
              </div>
            </div>
            <div className="flex-1 md:pl-5">
              <Link to="/dao/assets/forbidden-one">
                <div className="mb-6">
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
                <span>{formatValue(10000, 'usd', 'Est Value')}</span>
                <a
                  className="ml-4 md:ml-8"
                  style={{ position: 'relative', top: -3 }}
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
    </Page>
  );
}
