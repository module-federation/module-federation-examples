import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        {/* dirty workaround to ensure one react is available upfront. async boundary usually handles this kind of stuff & internally, not with externals */}
        <script src="https://unpkg.com/react@16.13.1/umd/react.development.js" />
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
