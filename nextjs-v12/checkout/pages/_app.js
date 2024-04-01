import App from 'next/app';
import { lazy, Suspense } from 'react';
const Nav = lazy(() => import('home/nav'));

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Suspense fallback={'loading nav'}>
        <Nav />
      </Suspense>
      <Component {...pageProps} />
    </>
  );
}
MyApp.getInitialProps = async ctx => {
  const appProps = await App.getInitialProps(ctx);
  return appProps;
};

export default MyApp;
