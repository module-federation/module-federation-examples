import React, {Fragment, Suspense,lazy} from 'react';
import Head from 'next/head';
import {init, loadRemote} from '@module-federation/runtime'

const remotes = isServer => {
  const location = isServer ? 'ssr' : 'chunks';
  return [
    {
      name: 'shop',
      entry:`http://localhost:3002/_next/static/${location}/remoteEntry.js`
    },
    {
      name: 'checkout',
      entry:`http://localhost:3000/_next/static/${location}/remoteEntry.js`
    },
  ];
};

init({
  name: 'home',
  remotes: remotes(typeof window === 'undefined'),
  force: true
})

const RemoteTitle = lazy(() => loadRemote('checkout/title').then((c)=>{
  if(typeof c ==='function') {
    return c()
  }
  return c
}));

const Home = ({loaded}) => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/nextjs-dynamic-ssr/home/public/favicon.ico"/>
      </Head>

      <div className="hero">
        <Suspense fallback={"loading remote title"}>
          <RemoteTitle/>
        </Suspense>
        <h1 className="title">

          Welcome to Next.js on Webpack 5! <code>home</code>
        </h1>
        <p className="description">
          To get started, edit <code>pages/index.js</code> and save to reload.
        </p>

        <div className="row">
          <a href="https://nextjs.org/docs" className="card">
            <h3>Documentation &rarr;</h3>
            <p>Learn more about Next.js in the documentation.</p>
          </a>
          <a href="https://nextjs.org/learn" className="card">
            <h3>Next.js Learn &rarr;</h3>
            <p>Learn about Next.js by following an interactive tutorial!</p>
          </a>
          <a href="https://github.com/zeit/next.js/tree/master/examples" className="card">
            <h3>Examples &rarr;</h3>
            <p>Find other example boilerplates on the Next.js GitHub.</p>
          </a>
        </div>
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
          font-size: 48px;
        }

        .title,
        .description {
          text-align: center;
        }

        .row {
          max-width: 880px;
          margin: 80px auto 40px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }

        .card {
          padding: 18px 18px 24px;
          width: 220px;
          text-align: left;
          text-decoration: none;
          color: #434343;
          border: 1px solid #9b9b9b;
        }

        .card:hover {
          border-color: #067df7;
        }

        .card h3 {
          margin: 0;
          color: #067df7;
          font-size: 18px;
        }

        .card p {
          margin: 0;
          padding: 12px 0 0;
          font-size: 13px;
          color: #333;
        }
      `}</style>
    </div>
  );
};
//
Home.getInitialProps = async ctx => {
  return {};
};

export default Home;
