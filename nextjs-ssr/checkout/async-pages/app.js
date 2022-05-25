import App from 'next/app';
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

MyApp.getInitialProps = async ctx => {
  const appProps = await App.getInitialProps(ctx);
  return appProps;
};
export default MyApp;
