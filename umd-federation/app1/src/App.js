import React from "react";
import ReactDom from "react-dom";
import App2, {moduleA} from "app2"
import App1 from "mf-app-01/App"
import {createRouter} from "@remix-run/router"
console.log("remixRunRouter.createRouter", createRouter)

const App = () => {
  return (
    <div style={{
      margin: "10px",
      padding:"10px",
      textAlign:"center",
      backgroundColor:"cyan"
    }}>
      <h1 >Host App 1</h1>
      <hr />
      <App1 />
      <hr />
      <App2 />
      app2-moduleA: {moduleA}
    </div>
  )
}

export default App;

