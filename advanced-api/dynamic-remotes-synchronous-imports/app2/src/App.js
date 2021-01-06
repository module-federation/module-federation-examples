import Widget from "./Widget";
import React, { Suspense } from "react";
import WidgetRemote from "app3/Widget";

// Working example of loading component at runtime
// import { loadFromRemote } from "./loader";
// const WidgetRemote = React.lazy(async () => {
//   const component = await loadFromRemote({
//     component: "Widget", remote: {
//       url: "http://localhost:3003/remoteEntry.js",
//       name: "app3",
//     },
//   });
//   return component();
// });

const App = () => (
  <div>
    <h1>Dynamic System Host</h1>
    <h2>App 2</h2>
    <Widget />
    <Suspense fallback="Loading widget">
      <WidgetRemote />
    </Suspense>
  </div>
);

export default App;
