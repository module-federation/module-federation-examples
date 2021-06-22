if (process.browser) {
  //bolt on some next internals that cannot be shared via MF api
  //yeah it sucks
  Object.assign(__webpack_share_scopes__.default, {
    "next/link": {
      [next.version]: {
        loaded: true,
        get: () => Promise.resolve(() => require("next/link")),
      },
    },
    "next/head": {
      [next.version]: {
        loaded: true,
        get: () => Promise.resolve(() => require("next/head")),
      },
    },
    "next/dynamic": {
      [next.version]: {
        loaded: true,
        get: () => Promise.resolve(() => require("next/dynamic")),
      },
    },
  });
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
