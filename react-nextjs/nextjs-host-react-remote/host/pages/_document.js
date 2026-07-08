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
          {/* Module Federation demo analytics */}
          <script
            dangerouslySetInnerHTML={{
              __html: "(function () {\n  var measurementId = \"G-DRPXW0EEVT\";\n  var cidKey = 'mf_examples_ga_cid';\n  var cid;\n  try {\n    cid = window.localStorage && window.localStorage.getItem(cidKey);\n    if (!cid) {\n      cid = String(Math.floor(Math.random() * 1000000000)) + '.' + String(Date.now());\n      window.localStorage && window.localStorage.setItem(cidKey, cid);\n    }\n  } catch (error) {\n    cid = String(Math.floor(Math.random() * 1000000000)) + '.' + String(Date.now());\n  }\n\n  var hostname = window.location.hostname;\n  var runtimeContext = /^(localhost|127\\.|0\\.0\\.0\\.0|::1)$/.test(hostname) ? 'local' : 'hosted';\n  var pageLocation = window.location.origin + window.location.pathname;\n  var params = new URLSearchParams({\n    v: '2',\n    tid: measurementId,\n    cid: cid,\n    en: 'demo_app_view',\n    'ep.repository': \"module-federation-examples\",\n    'ep.example': \"react-nextjs\",\n    'ep.demo_path': \"react-nextjs/nextjs-host-react-remote/host/pages\",\n    'ep.entrypoint': \"react-nextjs/nextjs-host-react-remote/host/pages/_document.js\",\n    'ep.runtime_context': runtimeContext,\n    dl: pageLocation,\n    dt: document.title || ('ModuleFederationExamples ' + \"react-nextjs/nextjs-host-react-remote/host/pages\")\n  });\n  new Image().src = 'https://www.google-analytics.com/g/collect?' + params.toString();\n})();",
            }}
          />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
