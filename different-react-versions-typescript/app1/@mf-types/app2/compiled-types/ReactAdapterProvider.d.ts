import React from 'react';
export declare type ReactAdapterProviderProps<P = {}> = P & {
    component: React.FunctionComponent<P> | React.ComponentClass<P> | keyof React.ReactHTML | string;
    children?: React.ReactNode;
};
export interface ReactAdapterProviderState {
    Component: React.ReactNode;
}
declare class ReactAdapterProvider<P = {}> extends React.Component<ReactAdapterProviderProps<P>, ReactAdapterProviderState> {
    private refHold;
    constructor(props: ReactAdapterProviderProps<P>);
    init: (hydrate?: boolean) => void;
    componentDidUpdate(): void;
    componentDidMount(): void;
    render(): JSX.Element;
}
export default ReactAdapterProvider;
