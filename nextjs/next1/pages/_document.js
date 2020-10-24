import Document, { Html, Head, Main, NextScript } from "next/document";
const sharePatch = require("nextjs-with-module-federation/patchSharing");

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        {sharePatch()}
        <Head />
        <body>
          <Main />
          <NextScript />
          <script
            async
            src="http://localhost:3000/_next/static/runtime/remoteEntry.js"
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
