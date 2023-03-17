import React from 'react';
import ReactDOM from 'react-dom';

export type ReactAdaperProviderProps<P = {}> = P & {
  component: React.FunctionComponent<P> | React.ComponentClass<P> | keyof React.ReactHTML | string;
  children?: React.ReactNode;
};

export interface ReactAdaperProviderState {
  Component: React.ReactNode;
}

class ReactAdaperProvider<P = {}> extends React.Component<
  ReactAdaperProviderProps<P>,
  ReactAdaperProviderState
> {
  private refHold: HTMLDivElement | null = null;

  constructor(props: ReactAdaperProviderProps<P>) {
    super(props);
    this.refHold;
  }

  init = (hydrate?: boolean) => {
    (async () => {
      const { component, children, ...rest } = this.props;
      const renderMethod = hydrate ? ReactDOM.hydrate : ReactDOM.render;
      renderMethod(React.createElement(component as string, rest, children), this.refHold);
    })();
  };

  componentDidUpdate() {
    this.init(true);
  }

  componentDidMount() {
    this.init();
  }

  render() {
    return <div ref={ref => (this.refHold = ref)} />;
  }
}

export default ReactAdaperProvider;
