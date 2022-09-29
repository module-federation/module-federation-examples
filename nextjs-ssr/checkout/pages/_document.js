import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';
import { revalidate } from '@module-federation/nextjs-mf/utils';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    ctx.res.on('finish', () => {
      revalidate().then(shouldReload => {
        // do whatever else
      });
    });
    // const remotes = await flushChunks(process.env.REMOTES);
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      // remoteChunks: remotes,
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="robots" content="noindex" />
          {/*{Object.values(this.props.remoteChunks)}*/}
        </Head>
        <body className="bg-background-grey">
        <Main />
        <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
