import App from "./App"
import React from "react"
import ReactDom from "react-dom"

var d = document.createElement("div")
document.body.appendChild(d)

ReactDom.render(<App />, d)