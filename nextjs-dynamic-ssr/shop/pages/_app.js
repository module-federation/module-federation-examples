import { Suspense, lazy } from "react";
import App from 'next/app';
import {init, loadRemote} from '@module-federation/runtime'
const remotes = isServer => {
  const location = isServer ? 'ssr' : 'chunks';
  return [
    {
      name: 'home',
      entry:`http://localhost:3001/_next/static/${location}/remoteEntry.js`
    },
    {
      name: 'checkout',
      entry:`http://localhost:3000/_next/static/${location}/remoteEntry.js`
    },
  ];
};

init({
  name: 'shop',
  remotes: remotes(typeof window === 'undefined'),
  force: true
})

const Nav = lazy(() => loadRemote('home/nav'));

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Suspense fallback={'loading'}>
      <Nav />
        test
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
