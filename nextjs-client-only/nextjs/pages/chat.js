import React from "react";
import Head from "next/head";
import LoadNextMF from "../components/LoadNextMF";
import Nav from "../components/Nav";

export default function Chat({ featureFlags = {} }) {
  return (
    <>
      <Head>
        <title>Chat App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      {featureFlags.disableChat ? (
        <p>Chat is disabled</p>
      ) : (
        <LoadNextMF
          url="http://localhost:8888/remoteEntry.js"
          scope="chat"
          module="./App"
        />
      )}
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      featureFlags: {
        disableChat: process.env.DISABLE_CHAT === "true", // this would be fetched from an API
      },
    },
  };
}
