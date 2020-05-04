import React from "react";
// eslint-disable-next-line
import SomeComponent from "website2/SomeComponent";
export default () => (
  <div>
    <h1 onClick={() => alert("website1 is interactive")}>This is website 1</h1>
    <SomeComponent />
  </div>
);
