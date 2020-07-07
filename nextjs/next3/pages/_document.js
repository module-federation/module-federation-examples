import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        {/*pilling in the runtime from our remote, to attempt import*/}
        <script src="http://localhost:3000/_next/static/runtime/webpack.js" />
        <script src="http://localhost:3000/_next/static/runtime/remoteEntry.js" />
        <Head />
        <body>
          <Main />
          <NextScript />
          <script src="http://localhost:3002/_next/static/runtime/remoteEntry.js" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
