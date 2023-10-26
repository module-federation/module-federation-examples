import { Suspense } from "react";
import App from 'next/app';
import dynamic from 'next/dynamic';
const Nav = dynamic(() => import('home/nav') ,{suspense:true});

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

MyApp.getInitialProps = async ctx => {
  const appProps = await App.getInitialProps(ctx);
  return appProps;
};
export default MyApp;
