import React from 'react';
import * as lodash from 'lodash'

const style = {
  background: 'green',
  color: '#fff',
  padding: 12,
};

const Button = () => <button onClick={()=>{
  window.localStorage.setItem('button', 'blue');
  window.location.reload()
}} style={style}>App 2 Button - lodash {lodash.VERSION} - From app3</button>;

export default Button;
