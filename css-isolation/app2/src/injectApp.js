import App from "./App";
import React from "react";
import ReactDOM from "react-dom";

const injector = (parentElementId) => {
  document.getElementById(parentElementId).appendChild(window["shadowWrapper"]);
  ReactDOM.render(<App />, window["shadowWrapper"].shadowRoot.getElementById("app2-placeholder"));
}

export default injector;
