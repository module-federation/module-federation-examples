/**
 * The Right Way to Load Dynamic Remotes
 * @author ScriptedAlchemy <zackary.l.jackson@gmail.com>
 * @see {@link https://gist.github.com/ScriptedAlchemy/3a24008ef60adc47fad1af7d3299a063}
 *
 * @param {string} remote - the remote global name
 * @param {object | string} shareScope - the shareScope Object OR scope key
 * @param {string} remoteFallbackUrl - fallback url for remote module
 * @returns {Promise<object>} - Federated Module Container
 */
export const getOrLoadRemote = (remote, shareScope, remoteFallbackUrl = undefined) =>
  new Promise((resolve, reject) => {
    // check if remote exists on window
    if (!window[remote]) {
      // search dom to see if remote tag exists, but might still be loading (async)
      const existingRemote = document.querySelector(`[data-webpack="${remote}"]`);
      // when remote is loaded..
      const onload = originOnload => async () => {
        // check if it was initialized
        if (!window[remote].__initialized) {
          // if share scope doesnt exist (like in webpack 4) then expect shareScope to be a manual object
          if (typeof __webpack_share_scopes__ === 'undefined') {
            // use default share scope object passed in manually
            await window[remote].init(shareScope.default);
          } else {
            // otherwise, init share scope as usual
            await window[remote].init(__webpack_share_scopes__[shareScope]);
          }
          // mark remote as initialized
          window[remote].__initialized = true;
        }
        // resolve promise so marking remote as loaded
        resolve();
        originOnload && originOnload();
      };
      if (existingRemote) {
        // if existing remote but not loaded, hook into its onload and wait for it to be ready
        existingRemote.onload = onload(existingRemote.onload);
        existingRemote.onerror = reject;
        // check if remote fallback exists as param passed to function
        // TODO: should scan public config for a matching key if no override exists
      } else if (remoteFallbackUrl) {
        // inject remote if a fallback exists and call the same onload function
        var d = document,
          script = d.createElement('script');
        script.type = 'text/javascript';
        // mark as data-webpack so runtime can track it internally
        script.setAttribute('data-webpack', `${remote}`);
        script.async = true;
        script.onerror = reject;
        script.onload = onload(null);
        script.src = remoteFallbackUrl;
        d.getElementsByTagName('head')[0].appendChild(script);
      } else {
        // no remote and no fallback exist, reject
        reject(`Cannot Find Remote ${remote} to inject`);
      }
    } else {
      // remote already instantiated, resolve
      resolve();
    }
  });
