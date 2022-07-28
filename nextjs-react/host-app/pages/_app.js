import '@module-federation/nextjs-mf/beta/include-defaults'
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
