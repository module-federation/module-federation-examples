import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./components/App";

function mount(el, { onNavigate, history = createMemoryHistory() } = {}) {
  const cleanups = [];
  if (onNavigate) cleanups.push(history.listen((e) => onNavigate(e.pathname)));
  if (el) ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate: (pathname) => {
      const currentPathname = history.location.pathname;
      if (currentPathname !== pathname) history.push(pathname);
    },
    unmount: () => cleanups.forEach((cleanup) => cleanup()),
  };
}

if (process.env.NODE_ENV === "development" && typeof document !== "undefined") {
  const el = document.getElementById("root-chat-dev");
  if (el) {
    mount(el, { history: createBrowserHistory() });
  }
}

export default mount;
