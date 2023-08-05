import App from 'next/app';
import {lazy} from 'react'
const Nav = process.browser ? lazy(
  () => {
    const mod = import('home/nav').catch(console.error);
    return mod;
  }
) : ()=>null

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Nav />
      <Component {...pageProps} />
    </>
  );
}
MyApp.getInitialProps = async ctx => {
  const appProps = await App.getInitialProps(ctx);
  return appProps;
};

export default MyApp;
