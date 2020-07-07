import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script src="http://localhost:8080/remoteEntry.js" />
        <script src="http://localhost:8081/remoteEntry.js" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
