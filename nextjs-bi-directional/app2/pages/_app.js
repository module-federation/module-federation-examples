import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Load our own module and the other app module */}
        <script src="http://localhost:8081/remoteEntry.js" />
        <script src="http://localhost:8082/remoteEntry.js" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
