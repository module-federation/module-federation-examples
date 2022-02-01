import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";
import { flushChunks, ExtendedHead } from "@module-federation/nextjs-ssr/flushChunks";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      remoteChunks: await flushChunks(process.env.REMOTES),
    };
  }

  render() {
    return (
      <Html>
        <ExtendedHead>
          <meta name="robots" content="noindex" />
          {this.props.remoteChunks}
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
