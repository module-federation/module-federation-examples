Promise.all([import("react"), import("react-dom"), import("./App")]).then(
  ([React, ReactDOM, app]) => {
    const App = app.default;
    ReactDOM.render(<App />, document.getElementById("root"));
  }
);
