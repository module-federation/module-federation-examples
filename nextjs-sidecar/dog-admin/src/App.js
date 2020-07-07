import React from "react";
import ReactDOM from "react-dom";
import Dog from "dogs/Dog";
import DogName from "./DogName";

import "./index.css";

const App = () => (
  <div style={{ width: 800, margin: "auto" }}>
    <DogName name="Puppies!" />
    <Dog />
  </div>
);

ReactDOM.render(<App />, document.getElementById("app"));
