import App from 'next/app';
import React, { Suspense, useState, useEffect, lazy } from 'react';

// Lazy load the Nav component only on the client side
const Nav = process.browser
  ? lazy(() => import('home/nav').catch(error => console.error('Failed to load Nav:', error)))
  : () => <div />; // Render an empty div on the server-side

function MyApp({ Component, pageProps }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set state to true only once component mounts
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
  // Ensure you still collect and return the necessary initial props for child components
  const appProps = await App.getInitialProps(ctx);
  return { ...appProps };
};

export default MyApp;
