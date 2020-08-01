import React, { useEffect } from "react";

const ModernReactComponent = () => {
  React.useEffect(() => {
    console.log("some effect from app2 based component");
  }, []);
  return (
    <span>
      This Component uses hooks, if loaded on localhost:3001, it should work,
      even though that host does not support React Hooks
    </span>
  );
};

export default ModernReactComponent;
