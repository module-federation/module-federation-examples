import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const selectors = ['style[data-next-hide-fouc="true"]', 'noscript[data-next-hide-fouc="true"]'];

    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((element) => element.remove());
    });

    if (document.body.style.display === 'none') {
      document.body.style.removeProperty('display');
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
