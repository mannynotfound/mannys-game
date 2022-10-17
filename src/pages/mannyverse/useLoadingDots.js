import { useEffect, useState } from 'react';

export default function useLoadingDots() {
  const [dotAmount, setDotAmount] = useState(0);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDotAmount((da) => (da + 1 > 3 ? 0 : da + 1));
    }, 100);

    return () => {
      clearInterval(dotInterval);
    };
  }, []);

  return ['dot1', 'dot2', 'dot3'].map((d, i) => (
    <span key={d} className={dotAmount > i ? '' : 'opacity-0'}>
      .
    </span>
  ));
}
