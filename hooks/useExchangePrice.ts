import { useState } from 'react';
import { ETHERSCAN_KEY } from '@/utils/constants';
import usePoller from './usePoller';

export default function useExchangePrice(pollTime?: number) {
  const [price, setPrice] = useState(0);

  const pollPrice = () => {
    async function getPrice() {
      try {
        const { result } = await (
          await fetch(
            `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${ETHERSCAN_KEY}`
          )
        ).json();
        setPrice(Number(result.ethusd));
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
