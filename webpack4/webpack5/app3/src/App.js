import React from "react";
import ReactDom from "react-dom";
import App2 from "app2/App"
console.log('app3 import app2', App2)
console.log("webpack5 sharescopes", __webpack_share_scopes__)

const App = () => {
  return (
    <div style={{
      margin: "10px",
      padding:"10px",
      textAlign:"center",
      backgroundColor:"cyan"
    }}>
      <h1 >App 3</h1>
    </div>
  )
}

export default App;

