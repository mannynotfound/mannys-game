import { useEffect, useRef } from 'react';

// helper hook to call a function regularly in time intervals
export default function usePoller(fn: () => void, delay: number) {
  const savedCallback = useRef<() => void>();
  // Remember the latest fn.
  useEffect(() => {
    savedCallback.current = fn;
  }, [fn]);
  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
  // run at start too
  useEffect(() => {
    fn();
  }, []);
}
