import React from "react";
import("@module-federation/commmon-3rd-libs/google-analytics").then((ga) => {
  ga("create", "UA-XXXXX-Y", "auto");
  ga("send", "pageview");
});
const App = () => (
  <div>
    <h1>Basic Host-Remote</h1>
    <h2>App 1</h2>
  </div>
);

export default App;
