import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import Dog from "dogs/Dog";

const App = () => (
  <div style={{ width: 800, margin: "auto" }}>
    <div>This is a cute dog</div>
    <Dog />
  </div>
);

ReactDOM.render(<App />, document.getElementById("app"));
