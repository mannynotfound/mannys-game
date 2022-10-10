import { useState, useEffect } from 'react';

export default function useLoaded(registerKeys) {
  const [loading, setLoading] = useState(true);
  const [registersLoaded, setRegistersLoaded] = useState([]);

  const registers = {};
  registerKeys.forEach((key) => {
    registers[key] = () => setRegistersLoaded((rl) => rl.concat([key]));
  });

  useEffect(() => {
    const allLoaded = registerKeys.every((rk) => registersLoaded.includes(rk));
    setLoading(!allLoaded);
  }, [registersLoaded]);

  return {
    loading,
    registersLoaded,
    registers,
  };
}
