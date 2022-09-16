import { useState } from 'react';
import { API_HOST } from 'constants';

export default function useLeaderboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const load = async () => {
    setLoading(true);
    fetch(`${API_HOST}/api/leaderboard`, { mode: 'cors' })
      .then((resp) => resp.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return {
    data,
    load,
    loading,
    error,
  };
}
