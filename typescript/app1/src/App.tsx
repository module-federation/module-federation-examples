import * as React from "react";

// TODO: look into better way of supressing "Cannot find module" #2307 error .
const RemoteButton = React.lazy(() => import("app2/Button" as string));

const App = () => (
  <div>
    <h1>Typescript</h1>
    <h2>App 1</h2>
    <React.Suspense fallback="Loading Button">
      <RemoteButton />
    </React.Suspense>
  </div>
);

export default App;
