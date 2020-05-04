import React from "react";
import loadable from "@loadable/component";

const AsyncComponent = loadable(() => import("./Async2"));

const SomeComponent = () => (
  <>
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
    <AsyncComponent />
  </>
);

export default SomeComponent;
