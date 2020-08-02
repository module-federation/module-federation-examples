import React from "react";

class Adapter extends React.Component {
  constructor(props) {
    super(props);
    this.refHold;
  }
  init = (hydrate) => {
    (async () => {
      const ReactDOM = (await import("app2/newReactDOM")).default;
      const React = (await import("app2/newReact")).default;
      const RemoteComponent = await this.props.importer();
      const { importer, children, ...rest } = this.props;
      const renderMethod = hydrate ? ReactDOM.hydrate : ReactDOM.render;
      renderMethod(
        React.createElement(RemoteComponent.default, rest, children),
        this.refHold
      );
    })();
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    this.init(true);
  }

  componentDidMount() {
    this.init();
  }

  render() {
    return <div style={{ color: "red" }} ref={(ref) => (this.refHold = ref)} />;
  }
}

export default Adapter;
