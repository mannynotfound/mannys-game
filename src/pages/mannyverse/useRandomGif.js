import { useState, useEffect } from 'react';

export default function useRandomGif() {
  const [randomGif, setRandomGif] = useState();

  useEffect(() => {
    const randomGifIdx = Math.floor(Math.random() * (10 - 1 + 1) + 1);
    setRandomGif(`/gifs/${randomGifIdx}.gif`);
  }, []);

  return randomGif;
}
