import React from "react";
import ReactDom from "react-dom";
import App2 from "app2/App"
import App1 from "mf-app-01/App"
import remixRunRouter from "@remix-run/router"
console.log("remixRunRouter", remixRunRouter)

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
    </div>
  )
}

export default App;

