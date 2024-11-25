import React from 'react';
interface ButtonProps {
    onClick?: () => void;
    children?: React.ReactNode;
    variant?: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
}
export declare const Button: React.FC<ButtonProps>;
export {};
