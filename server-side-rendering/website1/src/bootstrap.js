import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "./components/App";
import { loadableReady } from '@loadable/component'


const render = (App) => {
  const root = document.getElementById("root");

  ReactDOM.hydrate(
    <AppContainer>
      <App />
    </AppContainer>,
    root
  );
};

loadableReady(() => {
  render(App);
})


if (module.hot && process.env.NODE_ENV === "development") {
  module.hot.accept("./components/App", () => {
    // eslint-disable-next-line
    const App = require("./components/App").default;

    render(App);
  });
}
