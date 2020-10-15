import Document, { Html, Head, Main, NextScript } from "next/document";
import fs from "fs";
import path from "path";
const reactPath = path.dirname(require.resolve("../node_modules/react"));
const umdReact = path.join(reactPath, "umd/react.development.js");
const stringReact = fs.readFileSync(umdReact, "utf-8");
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <script dangerouslySetInnerHTML={{ __html: stringReact }}></script>
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
