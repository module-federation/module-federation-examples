import {Suspense,lazy} from "react";
import App from 'next/app';

import {init, loadRemote} from '@module-federation/runtime'
const remotes = isServer => {
  const location = isServer ? 'ssr' : 'chunks';
  return [
    {
      name: 'shop',
      entry:`http://localhost:3002/_next/static/${location}/remoteEntry.js`
    },
    {
      name: 'home',
      entry:`http://localhost:3001/_next/static/${location}/remoteEntry.js`
    },
  ];
};

init({
  name: 'home',
  remotes: remotes(typeof window === 'undefined'),
  force: true
})


const Nav = lazy(() => {
  return loadRemote('home/nav');
});


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Suspense fallback={'loading'}>
      <Nav />
      </Suspense>
      <Component {...pageProps} />
      <div className="test">test</div>
    </>
  );
}

MyApp.getInitialProps = async ctx => {
  console.log('in app getInitialProps');
  const appProps = await App.getInitialProps(ctx);
  return appProps;
};
export default MyApp;
