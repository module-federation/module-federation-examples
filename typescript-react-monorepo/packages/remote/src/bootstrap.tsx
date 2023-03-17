import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const remoteElement = document.getElementById(
  "remote"
) as unknown as HTMLElement;
const remote = createRoot(remoteElement);
remote.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
