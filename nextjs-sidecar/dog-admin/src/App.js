import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import DogName from "./DogName";

const RemoteDog = lazy(() => import("dogs/Dog"));

const App = () => (
  <div style={{ width: 800, margin: "auto" }}>
    <DogName name="Puppies!" />
    <Suspense fallback="Loading dogs">
      <RemoteDog />
    </Suspense>
  </div>
);

ReactDOM.render(<App />, document.getElementById("app"));
