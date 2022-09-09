import App from "./App";
import React from "react";
import ReactDOM from "react-dom";

const injector = (parentElementId) => {
  // Get the injection target element from the parent app
  const rootElement = document.getElementById(parentElementId);
  // Create a shadow root for the injection target element.
  // This will prevent global CSS from this app from leaking outside into the parent
  const shadow = rootElement.attachShadow({ mode: "open", delegatesFocus: true });
  // This will prevent global CSS from the parent leaking into this app
  rootElement.style.all = "initial";
  // Render the React app into the shadow root
  ReactDOM.render(<App />, shadow);
}

export default injector;
