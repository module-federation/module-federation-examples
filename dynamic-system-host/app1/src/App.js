import React from "react";

import { LazyRemote } from "./lazy.remote";

function App() {
  const [system, setSystem] = React.useState(undefined);

  function setApp2() {
    setSystem("app2");
  }

  function setApp3() {
    setSystem("app3");
  }

  function setApp3Home() {
    setSystem("app3Home");
  }

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      }}
    >
      <h1>Dynamic System Host</h1>
      <h2>App 1</h2>
      <p>
        The Dynamic System will take advantage Module Federation{" "}
        <strong>remotes</strong> and <strong>exposes</strong>. It will no load
        components that have been loaded already.
      </p>
      <button onClick={setApp2}>Load App 2 Widget</button>
      <button onClick={setApp3}>Load App 3 Widget</button>
      <button onClick={setApp3Home}>Load App 3 Home</button>
      <div style={{ marginTop: "2em" }}>
        {system === "app2" && (
          <LazyRemote
            name="app2"
            module="app2/Widget"
            componentName="default"
          />
        )}
        {system === "app3" && (
          <LazyRemote
            name="app3"
            module="app3/Widget"
            componentName="default"
          />
        )}
        {system === "app3Home" && (
          <LazyRemote
            name="app3"
            module="app3/home"
            componentName="App3HomePage"
            dependsOn={["app4"]}
          />
        )}
      </div>
    </div>
  );
}

export default App;
