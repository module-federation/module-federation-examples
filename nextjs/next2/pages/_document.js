import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <script src="https://unpkg.com/react@16.13.1/umd/react.development.js" />
        <script src="http://localhost:3000/_next/static/chunks/webpack.js" />
        <script src="http://localhost:3000/_next/static/runtime/remoteEntry.js" />
        <Head />
        <body>
          <Main />
          <NextScript />
          <script src="http://localhost:3001/_next/static/runtime/remoteEntry.js" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
