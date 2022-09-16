import { useState } from 'react';
import { ethers } from 'ethers';
import { ETHERSCAN_KEY } from 'constants';
import usePoller from './usePoller';

export default function useExchangePrice(pollTime) {
  const [price, setPrice] = useState(0);

  const pollPrice = () => {
    async function getPrice() {
      try {
        const provider = new ethers.providers.EtherscanProvider(
          'mainnet',
          ETHERSCAN_KEY
        );
        provider.getEtherPrice().then((_price) => {
          setPrice(_price);
        });
      } catch (e) {
        console.error('error fetching ether price...');
        console.error(e);
      }
    }
    getPrice();
  };
  usePoller(pollPrice, pollTime || 39999);

  return price;
}
