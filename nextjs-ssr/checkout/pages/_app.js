import dynamic from 'next/dynamic';
const Nav = dynamic(() => {
  return import('home/nav');
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Nav />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
