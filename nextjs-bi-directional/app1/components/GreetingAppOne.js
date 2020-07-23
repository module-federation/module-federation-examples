import React from "react";

const GreetingAppOne = () => {
  return (
    <p className="description">
      Hello 👋🏼 from App One
      <style jsx>{`
        .description {
          color: #742a2a;
          background-color: #fff5f5;
          text-align: center;
          border: 4px dashed #fed7d7;
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

export default GreetingAppOne;
