import React from 'react'; // Must be imported for webpack to work

import { createRoot } from "react-dom/client";

import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./Sidebar";


const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Sidebar />
        </BrowserRouter>
    </React.StrictMode>
  );