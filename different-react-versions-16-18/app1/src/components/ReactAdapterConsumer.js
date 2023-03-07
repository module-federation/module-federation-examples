import React from 'react';

class ReactAdapterConsumer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Component: () => null };
    this.RemoteComponent = React.lazy(() =>
      this.props.importer().then(component => {
        return {
          // TODO: needs to be tested with SSR
          // default: component.Adapted
          default: typeof window == 'undefined' ? null : component.Adapted,
        };
      }),
    );
  }

  render() {
    return (
      <React.Suspense fallback="loading">
        <this.RemoteComponent {...this.props} />
      </React.Suspense>
    );
  }
}

export default ReactAdapterConsumer;
