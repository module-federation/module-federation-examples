import React from "react";
import("@module-federation/commmon-3rd-libs/google-analytics").then((ga) => {
  ga("create", "UA-XXXXX-Y", "auto");
  ga("send", "pageview");
});
import("@module-federation/commmon-3rd-libs/facebook").then((fbq) => {
  fbq("init", "12341234");
  fbq("track", "PageView");
});

const App = () => (
  <div>
    <h1>Basic Host-Remote</h1>
    <h2>App 1</h2>
  </div>
);

export default App;
