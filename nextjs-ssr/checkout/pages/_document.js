import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";
import {
  ExtendedHead,
  revalidate,
  flushChunks,
  DevHotScript,
} from "@module-federation/nextjs-ssr/flushChunks";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    ctx.res.on("finish", () => {
      revalidate().then(() => {
        if(process.env.NODE_ENV === 'development') {
          setTimeout(() => {
            process.exit(1);
          }, 50);
        }
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
        <DevHotScript />
        <body className="bg-background-grey">
        <Main />
        <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
