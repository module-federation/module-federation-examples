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
          <Main />
          <NextScript />
          <script
            data-webpack="next1"
            src="http://localhost:3000/_next/static/chunks/remoteEntry.js"
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
