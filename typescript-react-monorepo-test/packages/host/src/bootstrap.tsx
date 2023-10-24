import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const host = ReactDOM.createRoot(document.getElementById("host"));
host.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
