import React, { useEffect } from "react";
const ExportredTitle = () => {
  console.log("---------loading remote component---------");
  console.log("React is not duplicated:", Object.is(global.React, React));
  useEffect(() => {
    console.log("HOOKS WORKS");
  }, []);
  return (
    <div className="hero">
      <h1 className="title">
        {" "}
        This came fom <code>next1</code> !!!
      </h1>
      <p className="description">And it works like a charm v2</p>
    </div>
  );
};

export default ExportredTitle;
