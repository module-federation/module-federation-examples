import React from "react";

const GreetingAppOne = () => {
  return (
    <React.Fragment>
      <p className="description">Hello 👋🏼 from App Two</p>
      <style jsx>{`
        .description {
          color: #234e52;
          background-color: #e6fffa;
          text-align: center;
          border: 4px dashed #b2f5ea;
          padding: 15px;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }
      `}</style>
    </React.Fragment>
  );
};

export default GreetingAppOne;
