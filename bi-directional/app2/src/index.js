const boot = async () => {
  const React = await import("react");
  const ReactDOM = await import("react-dom");
  const App = (await import("./App")).default;
  ReactDOM.render(<App />, document.getElementById("root"));
};
boot();
