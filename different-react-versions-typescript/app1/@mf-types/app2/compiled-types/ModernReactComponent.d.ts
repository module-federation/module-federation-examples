import React from 'react';
import ReactAdapterProvider from './ReactAdapterProvider';
export interface ModernReactComponentProps {
    children?: React.ReactNode;
    input: string;
}
declare const ModernReactComponent: React.FC<ModernReactComponentProps>;
export declare const Adapted: React.ForwardRefExoticComponent<ModernReactComponentProps & React.RefAttributes<ReactAdapterProvider<ModernReactComponentProps>>>;
export default ModernReactComponent;
