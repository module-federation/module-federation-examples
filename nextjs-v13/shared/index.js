const React = require('react');
const createMatcher = require('feather-route-matcher');
const {loadRemote} = require('@module-federation/runtime');


async function matchFederatedPage(path) {
  const remotes = new Set(...__FEDERATION__.__INSTANCES__.map((item) => {
    return item.options.remotes.map((r) => r.alias)
  }))
  const maps = await Promise.all(
    Array.from(remotes).map(async remote => {
      return  loadRemote(remote + '/pages-map')
        .then(factory => ({remote, config: factory.default}))
        .catch(() => null);
    }),
  );

  const config = {};

  for (const map of maps) {
    if (!map) continue;

    for (let [path, mod] of Object.entries(map.config)) {
      config[path] = {
        remote: map.remote,
        module: mod,
      };
    }
  }

  console.log(config);
  const matcher = createMatcher.default(config);
  return matcher(path);
}

module.exports = {
  matchFederatedPage,
  createFederatedCatchAll() {
    const FederatedCatchAll = initialProps => {
      const [lazyProps, setProps] = React.useState({});
      const [mount, setMount] = React.useState(false);

      const {FederatedPage, render404, renderError, needsReload, ...props} = {
        ...lazyProps,
        ...initialProps,
      };
      React.useEffect(() => {
        if (needsReload) {
          const runUnderlayingGIP = async () => {
            const federatedProps = await FederatedCatchAll.getInitialProps(props);
            setProps(federatedProps);
          };
          runUnderlayingGIP();
        }
      }, []);

      React.useEffect(() => {
       setMount(true)
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
      // Bot marks "req, res, AppTree" as unused but those are vital to not get circular-dependency error
      const {err, req, res, AppTree, ...props} = ctx;
      if (err) {
        // TODO: Run getInitialProps for error page
        return {renderError: true, ...props};
      }
      if (!process.browser) {
        return {needsReload: true, ...props};
      }

      console.log('in browser');
      const matchedPage = await matchFederatedPage(ctx.asPath);

      try {
        console.log('matchedPage', matchedPage);
        const remote = matchedPage?.value?.remote;
        const mod = matchedPage?.value?.module.replace('./','/')

        if (!remote || !mod) {
          // TODO: Run getInitialProps for 404 page
          return {render404: true, ...props};
        }

        console.log('loading exposed module', mod, 'from remote', remote);
        const FederatedPage = await loadRemote(remote + mod).then(factory => factory.default);
        console.log('FederatedPage', FederatedPage);
        if (!FederatedPage) {
          // TODO: Run getInitialProps for 404 page
          return {render404: true, ...props};
        }

        const modifiedContext = {
          ...ctx,
          query: matchedPage.params,
        };
        const federatedPageProps = (await FederatedPage.getInitialProps?.(modifiedContext)) || {};
        return {...federatedPageProps, FederatedPage};
      } catch (err) {
        console.log('err', err);
        // TODO: Run getInitialProps for error page
        return {renderError: true, ...props};
      }
    };

    return FederatedCatchAll;
  },
};
