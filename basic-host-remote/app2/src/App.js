// have to have a promise (import()) somewhere for exposed code
// you can either use import bootstrap, like i do here
// or if you dont like import(bootstrap) you can get rid of that but need to import like

// this like here: const LocalButton = React.lazy(()=>import('./Button'));
// then you can remove the need for import(bootstrap)
//https://github.com/webpack/webpack/issues/10352#issuecomment-622016042
import LocalButton from "./Button";
import React from "react";

const App = () => (
  <div>
    <h1>Basic Host-Remote</h1>
    <h2>App 2</h2>
    <LocalButton />
  </div>
);

export default App;
