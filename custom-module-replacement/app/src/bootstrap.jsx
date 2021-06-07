import React from "react";
import ReactDOM from "react-dom";

import { hello } from 'app2'
import { name } from './replacement';

console.log(hello, )

function App() {
  return <div>Hello {name}</div>
}

ReactDOM.render(<App />, document.getElementById("root"));
