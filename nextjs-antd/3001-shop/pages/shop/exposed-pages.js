import { useState, useEffect } from 'react';
import { injectScript } from '@module-federation/nextjs-mf/lib/utils';

export default function ExposedPages() {
  const [pageMap, setPageMap] = useState('');

  useEffect(() => {
    injectScript('shop')
      .then(container => container.get('./pages-map'))
      .then(data => {
        setPageMap(data);
      });
  }, []);

  return (
    <>
      <h1>This app exposes the following pages:</h1>
      <pre>{JSON.stringify(pageMap, undefined, 2)}</pre>
    </>
  );
}
