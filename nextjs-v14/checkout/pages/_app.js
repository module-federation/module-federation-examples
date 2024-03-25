import App from 'next/app';
import React, { useState, useEffect, Suspense, lazy } from 'react';

// Lazy-load the Nav component. This will not be executed server-side.
const Nav = typeof window !== 'undefined' ? lazy(() => import('home/nav')) : null;

function MyApp({ Component, pageProps }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This effect runs only once on mount, indicating that we are now client-side.
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <Suspense fallback={<div>Loading navigation...</div>}>
          <Nav />
        </Suspense>
      )}
      <Component {...pageProps} />
    </>
  );
}

MyApp.getInitialProps = async (ctx) => {
  const appProps = await App.getInitialProps(ctx);
  return { ...appProps };
};

export default MyApp;
