import React from "react";
import PropTypes from "prop-types";

const remoteUrls = {
  app2: "http://localhost:3002/remoteEntry.js",
  app3: "http://localhost:3003/remoteEntry.js",
  app4: "http://localhost:3004/remoteEntry.js",
};

async function initializeRemote(remote) {
  console.log("initializing remote ", remote);
  // Initializes the share scope. This fills it with known provided modules from this build and all remotes
  // eslint-disable-next-line no-undef
  await __webpack_init_sharing__("default");

  const container = window[remote];
  // Initialize the container, it may provide shared modules
  // eslint-disable-next-line no-undef
  await container.init(__webpack_share_scopes__.default);
}

function loadComponent(module, componentName = "default") {
  let [remote, moduleName] = module.split("/");
  // eslint-disable-next-line space-before-function-paren
  return async () => {
    // console.log("initializing remote ", remote);
    // // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    // // eslint-disable-next-line no-undef
    // await __webpack_init_sharing__("default");

    // const container = window[remote];
    // // Initialize the container, it may provide shared modules
    // // eslint-disable-next-line no-undef
    // await container.init(__webpack_share_scopes__.default);
    const factory = await window[remote].get(`./${moduleName}`);
    const Module = factory();
    return Module[componentName];
  };
}

const useDynamicScript = (remote, dependsOn) => {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const allRemotes = React.useMemo(() => [...dependsOn, remote], [
    dependsOn,
    remote,
  ]);

  React.useEffect(() => {
    const scriptLoader = async () => {
      if (!allRemotes.length) {
        return () => {
          console.log("lazyRemote unmounts");
        };
      }

      function loadScript(remote) {
        return () =>
          new Promise((resolve, reject) => {
            let url = remoteUrls[remote];
            let remoteElem = document.querySelector(`[src="${url}"]`);
            if (remoteElem) {
              return resolve();
            }
            const element = document.createElement("script");

            element.src = url;
            element.type = "text/javascript";
            //set async, only when the module is not dependent on other module.
            element.async = allRemotes.length === 1;

            element.onload = async () => {
              console.log(`Dynamic Script Loaded: ${url}`);
              await initializeRemote(remote);
              resolve();
            };

            element.onerror = (err) => {
              console.error(`Dynamic Script Error: ${url}`);
              reject(err);
            };

            document.head.appendChild(element);
          });
      }

      let scripts = allRemotes.map((remote) => loadScript(remote));

      for (let script of scripts) {
        await script();
      }

      setReady(true);
    };

    scriptLoader();
  }, [allRemotes]);

  return {
    ready,
    failed,
  };
};

LazyRemote.propTypes = {
  name: PropTypes.string,
  module: PropTypes.string,
  componentName: PropTypes.string,
  dependsOn: PropTypes.arrayOf(PropTypes.string),
};
export function LazyRemote(props) {
  window.enableLog = true;
  let { name, module, componentName, dependsOn = [] } = props;
  let { ready, failed } = useDynamicScript(name, dependsOn);
  let [Component, setComponent] = React.useState(() => () => (
    <p>Loading remote module</p>
  ));

  React.useEffect(
    function loadRemoteComponent() {
      if (!ready) return;
      loadComponent(module, componentName)()
        .then((component) => {
          setComponent(() => component);
        })
        .catch((err) => {
          setComponent(() => () => <p>{err.toString()}</p>);
        });
    },
    [ready, name, module, componentName]
  );

  if (failed) {
    return <p>Failed to load remote {name}</p>;
  }

  if (!ready) return `Loading ${name}...`;

  return <Component />;
}
