import React from 'react';

class Component extends React.Component {
  render() {
    const { hostV, remoteV, containerRef } = this.props;
    console.log({ hostV, remoteV });
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
const withVersions = (Original, hostVersion, remoteVersion,remoteReactVersion) => {
  const ReactDOM = remoteReactVersion();
  console.log(ReactDOM)
  class WrappedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.containerRef = React.createRef();
    }

    componentDidMount() {
      this.mountOriginalComponent();
    }

    componentDidUpdate() {
      this.mountOriginalComponent();
    }

    componentWillUnmount() {
      if (this.containerRef.current) {
        ReactDOM.unmountComponentAtNode(this.containerRef.current);
      }
    }

    mountOriginalComponent() {
      const element = <Original {...this.props} />;
      ReactDOM.render(element, this.containerRef.current);
    }

    render() {
      console.log(Original, hostVersion, remoteVersion, remoteReactVersion);
      return <Component hostV={hostVersion} remoteV={remoteVersion} containerRef={this.containerRef} />;
    }
  }

  return <WrappedComponent/>;
};

export default withVersions;
