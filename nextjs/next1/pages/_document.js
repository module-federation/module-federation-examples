import Document, { Html, Head, Main, NextScript } from "next/document";
import { shareReact } from "../../nextFederationUtils";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        {shareReact()}
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
