import { useState, useEffect } from 'react';

const useFetchJson = path => {
  const [loading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const fetchData = () => {
    fetch(path, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => {
        setData(json);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading };
};

export default useFetchJson;
