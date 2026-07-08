/* eslint-disable react/display-name */
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const originalRenderPage = ctx.renderPage;

    const sheet = new ServerStyleSheet();

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        enhanceComponent: Component => Component,
      });

    const intialProps = await Document.getInitialProps(ctx);
    const styles = sheet.getStyleElement();

    return { ...intialProps, styles };
  }

  render() {
    return (
      <Html>
        <Head>{this.props.styles}</Head>
        <body>
          <Main />
          {/* Module Federation demo analytics */}
          <script
            dangerouslySetInnerHTML={{
              __html: "(function () {\n  var measurementId = \"G-DRPXW0EEVT\";\n  var cidKey = 'mf_examples_ga_cid';\n  var cid;\n  try {\n    cid = window.localStorage && window.localStorage.getItem(cidKey);\n    if (!cid) {\n      cid = String(Math.floor(Math.random() * 1000000000)) + '.' + String(Date.now());\n      window.localStorage && window.localStorage.setItem(cidKey, cid);\n    }\n  } catch (error) {\n    cid = String(Math.floor(Math.random() * 1000000000)) + '.' + String(Date.now());\n  }\n\n  var hostname = window.location.hostname;\n  var runtimeContext = /^(localhost|127\\.|0\\.0\\.0\\.0|::1)$/.test(hostname) ? 'local' : 'hosted';\n  var pageLocation = window.location.origin + window.location.pathname;\n  var params = new URLSearchParams({\n    v: '2',\n    tid: measurementId,\n    cid: cid,\n    en: 'demo_app_view',\n    'ep.repository': \"module-federation-examples\",\n    'ep.example': \"nextjs-ssr-react-query\",\n    'ep.demo_path': \"nextjs-ssr-react-query/apps/header/pages\",\n    'ep.entrypoint': \"nextjs-ssr-react-query/apps/header/pages/_document.tsx\",\n    'ep.runtime_context': runtimeContext,\n    dl: pageLocation,\n    dt: document.title || ('ModuleFederationExamples ' + \"nextjs-ssr-react-query/apps/header/pages\")\n  });\n  new Image().src = 'https://www.google-analytics.com/g/collect?' + params.toString();\n})();",
            }}
          />
          <NextScript />
        </body>
      </Html>
    );
  }
}
