import React, { useMemo } from 'react';

const ModernReactComponent = props => {
  const { children, input } = props;
  const renderedInput = useMemo(() => input, [input]);

  return (
    <div>
      <strong>
        This Component uses hooks, if loaded on localhost:3001, it should work, even though that
        host does not support React Hooks
      </strong>
      <br />
      <h2>Text form legacy React app: {renderedInput}</h2>
      {children}
    </div>
  );
};

export default ModernReactComponent;
