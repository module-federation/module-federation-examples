import React from 'react';
import * as lodash from 'lodash';

const style = {
  background: '#00c',
  color: '#fff',
  padding: 12,
};

const Button = () => (
  <button
    onClick={() => {
      window.localStorage.setItem('button', 'green');
      window.location.reload();
    }}
    style={style}
  >
    App 2 Button - CLICK ME
  </button>
);

export default Button;
