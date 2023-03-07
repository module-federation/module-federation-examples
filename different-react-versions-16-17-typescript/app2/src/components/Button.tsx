import React from 'react';

export interface ButtonProps {
  color?: 'blue' | 'red';
}

const Button: React.FC<ButtonProps> = ({ color = 'blue' }: ButtonProps) => (
  <div>
    <p>
      More react components from <strong>App2</strong> using non-legacy React to render
    </p>
    <button style={{ color: color === 'blue' ? 'blue' : 'red' }}>App 2 Button</button>
  </div>
);

export default Button;
