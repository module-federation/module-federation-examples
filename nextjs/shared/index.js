import React from 'react';
import createMatcher from 'feather-route-matcher';

export async function matchFederatedPage(remotes, path) {
  const maps = await Promise.all(
    remotes.map(remote => {
      console.log(window[remote]);
      return window[remote]
        .get('./pages-map')
        .then(factory => ({ remote, config: factory().default }))
        .catch(() => null);
    }),
  );

  const config = {};

  for (let map of maps) {
    if (!map) continue;

    for (let [path, mod] of Object.entries(map.config)) {
      config[path] = {
        remote: map.remote,
        module: mod,
      };
    }
  }

  const matcher = createMatcher(config);
  const match = matcher(path);

  return match;
}

export function createFederatedCatchAll(remotes) {
  const FederatedCatchAll = initialProps => {
    const [lazyProps, setProps] = React.useState({});

    const { FederatedPage, render404, renderError, needsReload, ...props } = {
      ...lazyProps,
      ...initialProps,
    };
    console.log(initialProps);
    React.useEffect(() => {
      console.log(needsReload);
      if (needsReload) {
        const runUnderlayingGIP = async () => {
          const federatedProps = await FederatedCatchAll.getInitialProps(props);
          setProps(federatedProps);
        };
        runUnderlayingGIP();
      }
    }, []);

    if (render404) {
      // TODO: Render 404 page
      return React.createElement('h1', {}, '404 Not Found');
    }
    if (renderError) {
      // TODO: Render error page
      return React.createElement('h1', {}, 'Oops, something went wrong.');
    }

    if (FederatedPage) {
      return React.createElement(FederatedPage, props);
    }

    return null;
  };

  FederatedCatchAll.getInitialProps = async ctx => {
    const { err, req, res, AppTree, ...props } = ctx;
    if (err) {
      // TODO: Run getInitialProps for error page
      return { renderError: true, ...props };
    }
    if (!process.browser) {
      return { needsReload: true, ...props };
    }
    console.log('in browser');
    try {
      const matchedPage = await matchFederatedPage(remotes, ctx.asPath);
      console.log('matchedPage', matchedPage);

      const remote = matchedPage?.value?.remote;
      const mod = matchedPage?.value?.module;

      if (!remote || !mod) {
        // TODO: Run getInitialProps for 404 page
        return { render404: true, ...props };
      }

      console.log('loading exposed module', mod, 'from remote', remote);
      try {
        if (!window[remote].__initialized) {
          window[remote].__initialized = true;
          await window[remote].init(__webpack_share_scopes__.default);
        }
      } catch (initErr) {
        console.log('initErr', initErr);
      }

      const FederatedPage = await window[remote].get(mod).then(factory => factory().default);
      console.log('FederatedPage', FederatedPage);
      if (!FederatedPage) {
        // TODO: Run getInitialProps for 404 page
        return { render404: true, ...props };
      }

      const modifiedContext = {
        ...ctx,
        query: matchedPage.params,
      };
      const federatedPageProps = (await FederatedPage.getInitialProps?.(modifiedContext)) || {};
      return { ...federatedPageProps, FederatedPage };
    } catch (err) {
      console.log('err', err);
      // TODO: Run getInitialProps for error page
      return { renderError: true, ...props };
    }
  };

  return FederatedCatchAll;
}
