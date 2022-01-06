import React from 'libs/react';
import { useHistory } from 'libs/react-router-dom';

const Button = () => {
  let history = useHistory();

  function handleClick() {
    history.push('/home');
  }

  return <button onClick={handleClick}>from remote1: GO HOME</button>;
};

export default Button;
