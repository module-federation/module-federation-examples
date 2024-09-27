import React from 'react';

type ButtonProps = {
  size: 'small' | 'large';
};
const Button: React.FC<ButtonProps> = ({ size }) => {
  if (size === 'large') {
    return <button>App2 Large Button</button>;
  }
  return <button>App 2 Small Button</button>;
};

export default Button;
