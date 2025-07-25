import { useState, useCallback } from 'react';

/**
 * useApi lets you call an async function (e.g., API)
 * and automatically tracks loading and error state.
 * @returns [callApi, { loading, error, data }]
 */
export default function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);

  const callApi = useCallback(async (asyncFunc, ...args) => {
    setLoading(true);
    setError('');
    setData(null);
    try {
      const result = await asyncFunc(...args);
      setData(result);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.message || 'Something went wrong.');
      setLoading(false);
      return null;
    }
  }, []);

  return [callApi, { loading, error, data }];
}
