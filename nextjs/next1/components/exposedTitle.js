import React from "react";
const ExportredTitle = () => {
  console.log("---------loading remote component---------");
  console.log(Object.is(global.React.useEffect, React.useEffect));
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
