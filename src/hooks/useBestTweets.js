import { useState } from 'react';
import { API_HOST } from 'constants';

export default function useBestTweets() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const load = async () => {
    setLoading(true);
    fetch(`${API_HOST}/api/mannyverse/best-tweets`, { mode: 'cors' })
      .then((resp) => resp.json())
      .then((json) => {
        console.log('GOT RESPONSE ', json);
        setData(json.data);
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
