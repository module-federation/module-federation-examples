import LocalButton from "./Button";
import React from "react";

const App = () => (
  <div style={{ border: "1px red solid" }}>
    <h1>Remote Application - React Version {React.version}</h1>
    <h2>App 2</h2>
    <LocalButton />
  </div>
);

export default App;
