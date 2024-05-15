import { Suspense, lazy, useEffect, useState } from 'react';
const Nav = lazy(() => {
  if(process.browser) {
    const mod = import('home/nav');
    return mod;
  }
});

function MyApp({ Component, pageProps }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set isClient to true once the component mounts
    setIsClient(true);
  }, []);
  return (
    <>
      <Suspense fallback={'loading'}>
        {isClient && <Nav />}
      </Suspense>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
