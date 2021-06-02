import React from "react";
import Head from "next/head";
import LoadNextMF from "../components/LoadNextMF";
import Nav from "../components/Nav";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Chat App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <LoadNextMF
        url="http://localhost:8888/remoteEntry.js"
        scope="chat"
        module="./App"
      />
    </div>
  );
};

Home.getInitialProps = async (ctx) => {
  return {};
};

export default Home;
