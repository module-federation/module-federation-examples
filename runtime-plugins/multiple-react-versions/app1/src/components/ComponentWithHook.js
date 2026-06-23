import React from 'react';

const ComponentWithHook = () => {
  const [message] = React.useState('This should break, no hooks supported in this app.');

  return <span>{message}</span>;
};

export default ComponentWithHook;
