import React from 'react'; // Must be imported for webpack to work

import { ReactDOM, createRoot } from "react-dom/client";

import "./index.css";

import FAQ from "./FAQ";


const rootElement = document.getElementById("app");
const root = createRoot(rootElement);
root.render(
    <React.StrictMode>
    <FAQ />
    </React.StrictMode>
  );