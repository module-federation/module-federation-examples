import {lazy} from "react"
const Nav = process.browser ? lazy(
  () => {
    const mod = import('home/nav');
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

export default MyApp;
