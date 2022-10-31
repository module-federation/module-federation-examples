import React from 'react';
import App2 from "app2/App"
import App3 from "app3/App"
console.log("shareScopes", window.usemf.getShareScopes())
console.log("app2", App2)
console.log("app3", App3)

export default function App1(props) {
  return (
    <div>
      <div
        style={{
          margin: '10px',
          padding: '10px',
          textAlign: 'center',
          backgroundColor: 'greenyellow',
        }}
      >
        app1: {new Date().toLocaleTimeString()}
      </div>
      <App2 />
      <App3 />
    </div>
  );
}
