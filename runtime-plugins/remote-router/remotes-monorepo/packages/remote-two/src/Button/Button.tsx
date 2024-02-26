import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <button className="button">
      {children}
    </button>
  );
};

export default Button;