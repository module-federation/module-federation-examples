import React from "react";

const ENDPOINT = process.env.DISCOVERY_ENDPOINT;
const LINKS = ["my-project/catalog", "my-project/product"];

let MFEs;

const discover = async (config) => {
  if (!config.endpoint) {
    throw new Error("No endpoint provided");
  }

  const req = { credentials: "include" };

  if (config.headers) {
    req.headers = config.headers;
  }

  const res = await fetch(config.endpoint, req);
  const json = await res.json();
  return json;
};

function loadComponent(scope, module) {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__("default");

    const container = window[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default);

    const factory = await window[scope].get(`./${module}`);
    const Module = factory();

    return Module;
  };
}

const useDynamicScript = (url) => {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    if (!url) {
      return;
    }

    const element = document.createElement("script");
    element.src = url;
    element.type = "text/javascript";
    element.async = true;

    setReady(false);
    setFailed(false);

    element.onload = () => {
      console.log(`Dynamic Script Loaded: ${url}`);
      setReady(true);
    };

    element.onerror = () => {
      console.error(`Dynamic Script Error: ${url}`);
      setReady(false);
      setFailed(true);
    };

    document.head.appendChild(element);

    return () => {
      console.log(`Dynamic Script Removed: ${url}`);
      document.head.removeChild(element);
    };
  }, [url]);

  return {
    ready,
    failed,
  };
};

function System(props) {
  const { ready, failed } = useDynamicScript(props.system && props.system.url);

  if (!props.system) {
    return <h2>No System specified</h2>;
  }

  if (!ready) {
    return <h2>Loading dynamic script: {props.system.url}</h2>;
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {props.system.url}</h2>;
  }

  const MFE = React.lazy(
    loadComponent(props.system.scope, props.system.module)
  );

  return (
    <React.Suspense fallback="Loading System">
      <MFE />
    </React.Suspense>
  );
}

async function init() {
  MFEs = await discover({ endpoint: ENDPOINT });
}

init();

function App() {
  const [system, setSystem] = React.useState(undefined);

  function loadMFE(id) {
    const mfe = MFEs.microFrontends[id][0];
    setSystem({
      url: mfe.url,
      scope: `${(id + "/" + mfe.metadata.version).replace(/[\.\-\/]/gi, "_")}`,
      module: id,
    });
  }

  return (
    <div>
      <div>
        {LINKS.map((link) => (
          <button onClick={() => loadMFE(link)} key={link}>
            Load {link}
          </button>
        ))}
      </div>
      <div style={{ marginTop: "2em" }}>
        <System system={system} />
      </div>
    </div>
  );
}

export default App;
