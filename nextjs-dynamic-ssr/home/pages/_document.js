import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';
import { revalidate, FlushedChunks, flushChunks } from '@module-federation/nextjs-mf/utils';
import { init, loadRemote } from '@module-federation/runtime';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const remotes = isServer => {
      const location = isServer ? 'ssr' : 'chunks';
      return [
        {
          name: 'home',
          entry: `http://localhost:3001/_next/static/${location}/remoteEntry.js`,
        },
        {
          name: 'shop',
          entry: `http://localhost:3002/_next/static/${location}/remoteEntry.js`,
        },
        {
          name: 'checkout',
          entry: `http://localhost:3000/_next/static/${location}/remoteEntry.js`,
        },
      ];
    };

    init({
      name: 'home',
      remotes: remotes(typeof window === 'undefined'),
      force: true,
    });
    if (process.env.NODE_ENV === 'development' && !ctx.req.url.includes('_next')) {
      await revalidate().then(shouldReload => {
        if (shouldReload) {
          ctx.res.writeHead(302, { Location: ctx.req.url });
          ctx.res.end();
        }
      });
    } else {
      ctx?.res?.on('finish', () => {
        revalidate();
      });
    }
    const initialProps = await Document.getInitialProps(ctx);
    const chunks = await flushChunks();

    return {
      ...initialProps,
      chunks,
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="robots" content="noindex" />
          <FlushedChunks chunks={this.props.chunks} />
        </Head>

        <body className="bg-background-grey">
          <Main />
          {/* Module Federation demo analytics */}
          <script
            dangerouslySetInnerHTML={{
              __html: "(function () {\n  var measurementId = \"G-DRPXW0EEVT\";\n  var cidKey = 'mf_examples_ga_cid';\n  var cid;\n  try {\n    cid = window.localStorage && window.localStorage.getItem(cidKey);\n    if (!cid) {\n      cid = String(Math.floor(Math.random() * 1000000000)) + '.' + String(Date.now());\n      window.localStorage && window.localStorage.setItem(cidKey, cid);\n    }\n  } catch (error) {\n    cid = String(Math.floor(Math.random() * 1000000000)) + '.' + String(Date.now());\n  }\n\n  var hostname = window.location.hostname;\n  var runtimeContext = /^(localhost|127\\.|0\\.0\\.0\\.0|::1)$/.test(hostname) ? 'local' : 'hosted';\n  var pageLocation = window.location.origin + window.location.pathname;\n  var params = new URLSearchParams({\n    v: '2',\n    tid: measurementId,\n    cid: cid,\n    en: 'demo_app_view',\n    'ep.repository': \"module-federation-examples\",\n    'ep.example': \"nextjs-dynamic-ssr\",\n    'ep.demo_path': \"nextjs-dynamic-ssr/home/pages\",\n    'ep.entrypoint': \"nextjs-dynamic-ssr/home/pages/_document.js\",\n    'ep.runtime_context': runtimeContext,\n    dl: pageLocation,\n    dt: document.title || ('ModuleFederationExamples ' + \"nextjs-dynamic-ssr/home/pages\")\n  });\n  new Image().src = 'https://www.google-analytics.com/g/collect?' + params.toString();\n})();",
            }}
          />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
