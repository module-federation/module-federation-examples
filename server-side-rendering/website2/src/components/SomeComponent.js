import React from "react";

const SomeComponent = () => (
  <div
    style={{
      padding: "1em",
      margin: "1em",
      border: "1px solid black",
      backgroundColor: "#ccc",
    }}
    onClick={() => alert("website2 is interactive")}
  >
    Header
  </div>
);

export default SomeComponent;
