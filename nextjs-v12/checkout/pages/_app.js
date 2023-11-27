import App from 'next/app';
import {lazy, Suspense} from "react"
const Nav = process.browser ? lazy(
  () => {
    const mod = import('home/nav').catch(console.error);
    return mod;
  }
) : ()=>null

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
