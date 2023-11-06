import { FC, ReactNode } from "react";
import React from "react";

export interface ButtonProps {
  children: ReactNode;
  name: string;
}

const Button: FC<ButtonProps> = ({ children, name }) => {
  return <button name={name}>{children}</button>;
};

export default Button;
