/**
 * The react-adapter-runtime-plugin.ts and fallback.js files work together to enable compatibility
 * between different versions of React used by the host and remote modules in a Module Federation setup.
 *
 * In the runtime plugin (react-adapter-runtime-plugin.ts):
 * - It checks if the host and remote modules are using different versions of React.
 * - If they are, it loads the specific versions of react-dom and react used by the remote module.
 * - It then imports the fallback module and returns a function that wraps the remote module's exposed
 *   component with the fallback component, passing the remote and host React versions as props.
 *
 * In the fallback module (fallback.js):
 * - It defines a higher-order component (HOC) called `withVersions`.
 * - The HOC takes the remote module's exposed component (`Original`) and the remote and host React versions as arguments.
 * - It renders a `Component` that displays the host and remote React versions.
 * - Inside the `Component`, it creates a container ref to mount the `Original` component.
 * - In the HOC's lifecycle methods, it mounts, updates, and unmounts the `Original` component using the
 *   remote module's specific React version and ReactDOM.
 * - This ensures that the `Original` component is rendered using the correct React version within the
 *   fallback component's container.
 *
 * By using this approach, the runtime plugin and fallback module allow the host and remote modules to
 * use different versions of React without conflicts, enabling compatibility in a Module Federation architecture.
 */

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
        <div ref={containerRef} />
      </div>
    );
  }
}

const withVersions = (Original, remoteVersion, hostVersion, remoteReactDOMVersion, remoteReactVersion) => {
  const ReactDOM = remoteReactDOMVersion();
  const React = remoteReactVersion();

  class WrappedComponent extends React.Component {
    containerRef = React.createRef();

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

    mountOriginalComponent(shouldRender = false) {
      const element = React.createElement(Original, this.props);
      const renderMethod = shouldRender ? ReactDOM.render : ReactDOM.hydrate;
      renderMethod(element, this.containerRef.current);
    }

    render() {
      return <Component hostV={hostVersion} remoteV={remoteVersion} containerRef={this.containerRef} />;
    }
  }

  return WrappedComponent;
};

export default withVersions;
