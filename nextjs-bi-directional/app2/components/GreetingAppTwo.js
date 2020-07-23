import React from "react";

const GreetingAppTwo = ({ greeting = "Hello 👋🏼 from App Two" }) => {
  return (
    <p className="description">
      {greeting}
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
    </p>
  );
};

export default GreetingAppTwo;
