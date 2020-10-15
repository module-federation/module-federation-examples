import Document, { Html, Head, Main, NextScript } from "next/document";
import path from "path";
import fs from "fs";
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
        <script dangerouslySetInnerHTML={{ __html: stringReact }} />
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
