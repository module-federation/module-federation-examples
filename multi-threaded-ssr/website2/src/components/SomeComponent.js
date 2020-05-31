import React from "react";

const SomeComponent = ({ text }) => (
  <div
    style={{
      padding: "1em",
      margin: "1em",
      border: "1px solid black",
      backgroundColor: "#ccc",
    }}
    onClick={() => alert("website2 is interactive")}
  >
    {text || "Header"}
  </div>
);

export default SomeComponent;
