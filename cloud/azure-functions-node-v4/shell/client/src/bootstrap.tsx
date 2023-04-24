import { BrowserRouter } from "react-router-dom";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "components/App";

const node = document.getElementById("root");

hydrateRoot(node, <App />);

// const root = createRoot(node);

// root.render(<App />);n
