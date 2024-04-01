import { Suspense, lazy } from 'react';
const Nav = lazy(() => {
  const mod = import('home/nav');
  return mod;
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Suspense fallback={'loading'}>
        <Nav />
      </Suspense>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
