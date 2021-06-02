import React from "react";
import Head from "next/head";
import LoadNextMF from "../components/LoadNextMF";
import Nav from "../components/Nav";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <LoadNextMF
        url="http://localhost:8886/remoteEntry.js"
        scope="reception"
        module="./App"
      />
    </>
  );
}
