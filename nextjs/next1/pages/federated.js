import React from "react";
import Head from "next/head";
const Nav = (await import("../components/nav")).default;

const Federated = (props) => (
  <div>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Nav />

    <div className="hero">
      <h3 className="title">
        This is a federated page, consumed by localhost:3001 (next2)
      </h3>
      <span>
        {" "}
        Data from federated <pre>getInitalProps</pre>
      </span>
      <br />
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 20px;
      }
      .title,
      .description {
        text-align: center;
      }
    `}</style>
  </div>
);
Federated.getInitialProps = async () => {
  const swapi = await fetch("https://swapi.dev/api/people/1").then((res) =>
    res.json()
  );
  return swapi;
};
export default Federated;
