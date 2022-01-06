import React, { useEffect, useCallback } from 'react';

export default ({ text = 'Home Button', onClick }) => {
  const onClickHandler = useCallback(() => {
    console.log(`Button.js: "${text}" clicked!`);
    onClick?.();
  }, [text, onClick]);

  useEffect(() => {
    console.log('Button.js: mounted.');
    return () => console.log('Button.js: unmounted.');
  }, []);

  console.log('Button.js: rendered.');

  return <button onClick={onClickHandler}>{text}</button>;
};
