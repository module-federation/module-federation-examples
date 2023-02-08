import Document, { Html, Head, Main, NextScript } from 'next/document';

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
          Scipt is only needed if you are not using the federation @ syntax when setting your
          remotes.
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script src="http://localhost:8081/_next/static/chunks/remoteEntry.js" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
