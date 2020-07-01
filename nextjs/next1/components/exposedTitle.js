import React from "react";

const ExportredTitle = () => {
  return (
    <div className="hero">
      <h1 className="title">
        {" "}
        This came fom <code>next1</code> !!!
      </h1>
      <p className="description">And it works like a charm v2</p>
      <style jsx>{`
        .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
        }
        .title,
        .description {
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default ExportredTitle;
