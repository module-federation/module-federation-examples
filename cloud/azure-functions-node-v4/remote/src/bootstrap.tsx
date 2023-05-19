import * as ReactDOMClient from "react-dom/client";
import React from "react";
import Consumer from "./components/Consumer";

const container = document.getElementById("root");

// Create a root.
const root = ReactDOMClient.createRoot(container);
root.render(<Consumer />);
