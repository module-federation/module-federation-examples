import React, { useEffect, useState } from 'react';

const ExportedTitle = () => {
  const [hookData, setHookData] = useState('');
  useEffect(() => {
    setHookData('HOOKS WORKS');
  }, []);

  return (
    <div className="hero">
      <h1 className="title">
        {' '}
        This came fom <code>shop</code> !!!
      </h1>
      <p className="description">And it works like a charm v2</p>
      <p className="description">Checking react hooks: {hookData}</p>
    </div>
  );
};

export default ExportedTitle;
