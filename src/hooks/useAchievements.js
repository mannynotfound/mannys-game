import { useState } from 'react';
import { API_HOST } from 'constants';

export default function useAchievements() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = async (address) => {
    setLoading(true);
    fetch(`${API_HOST}/api/achievements/gamer/${address}`, { mode: 'cors' })
      .then((resp) => resp.json())
      .then((json) => {
        setLoading(false);
        setData((state) => ({
          ...state,
          [address]: json,
        }));
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  };

  return {
    data,
    load,
    loading,
    error,
  };
}
