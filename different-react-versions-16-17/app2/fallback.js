import React from 'react';

class Component extends React.Component {
  render() {
    const { hostV, remoteV, containerRef } = this.props;
    return (
      <div>
        <p style={{ color: 'red' }}>
          In RUNTIME PLUGIN WRAPPER <br />
          Host React: {hostV} Remote React: {remoteV}
        </p>
        <div ref={containerRef}/>
      </div>
    );
  }
}

// This is the higher-order component that takes the Original component and additional props
const withVersions = (Original, remoteVersion, hostVersion,remoteReactDOMVersion, remoteReactVersion) => {
  const ReactDOM = remoteReactDOMVersion();
  const React = remoteReactVersion();
  class WrappedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.containerRef = React.createRef();
    }

    componentDidMount() {
      this.mountOriginalComponent(true);
    }

    componentDidUpdate() {
      this.mountOriginalComponent();
    }

    componentWillUnmount() {
      if (this.containerRef.current) {
        ReactDOM.unmountComponentAtNode(this.containerRef.current);
      }
    }

    mountOriginalComponent(shouldRender) {
      const element = React.createElement(Original, this.props);
      const fGunc = shouldRender ? ReactDOM.render : ReactDOM.hydrate
      fGunc(element, this.containerRef.current);
    }

    render() {
      return <Component hostV={hostVersion} remoteV={remoteVersion} containerRef={this.containerRef} />;
    }
  }



  return (props) => <WrappedComponent {...props}/>

};

export default withVersions;
