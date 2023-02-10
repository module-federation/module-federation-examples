module.exports = new Promise((resolve, reject) => {
  const currentRequest = new URL(__resourceQuery, __webpack_base_uri__).searchParams.get("remote");
  const [global, url] = currentRequest.split('@');
  const __webpack_error__ = new Error()
  __webpack_require__.l(
    url,
    (event) => {
      if (typeof window[global] !== 'undefined') return resolve(window[global]);
      const realSrc = event?.target?.src;
      __webpack_error__.message = `Loading script failed.\\n(${event.message}: ${realSrc})`;
      __webpack_error__.name = 'ScriptExternalLoadError';
      __webpack_error__.stack = event.stack;
      reject(__webpack_error__);
    },
    global,
  );
})


