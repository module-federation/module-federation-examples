import Document, { Html, Head, Main, NextScript } from "next/document";
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <script
            data-webpack="checkout"
            src="http://localhost:3000/_next/static/chunks/remoteEntry.js"
          />
          <script
            data-webpack="shop"
            src="http://localhost:3002/_next/static/chunks/remoteEntry.js"
          />
          <script
            data-webpack="home"
            src="http://localhost:3001/_next/static/chunks/remoteEntry.js"
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
