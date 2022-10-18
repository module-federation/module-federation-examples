import React from "react";
import {createRoot} from "react-dom/client";

import "./index.css";
import Content from "./Content";
console.log(__webpack_share_scopes__);

const App = () => (
    <Content/>
);

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App/>);
