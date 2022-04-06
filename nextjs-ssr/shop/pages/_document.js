import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';
import { ExtendedHead, revalidate, flushChunks } from '@module-federation/nextjs-ssr/flushChunks';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    ctx.res.on('finish', () => {
      revalidate().then(shouldReload => {
        // do whatever else
      });
    });
    const remotes = await flushChunks(process.env.REMOTES);
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      remoteChunks: remotes,
    };
  }

  render() {
    return (
      <Html>
        <ExtendedHead>
          <meta name="robots" content="noindex" />
          {Object.values(this.props.remoteChunks)}
        </ExtendedHead>
        <body className="bg-background-grey">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
