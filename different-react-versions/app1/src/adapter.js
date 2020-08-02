import React from "react";

class Adapter extends React.Component {
  constructor(props) {
    super(props);
    this.refHold;
  }

  componentDidMount() {
    const init = async () => {
      const ReactDOM = (await import("app2/newReactDOM")).default;
      const React = (await import("app2/newReact")).default;
      const RemoteComponent = await this.props.importer();
      const { importer, ...rest } = this.props;
      console.log(RemoteComponent.default);
      ReactDOM.render(
        React.createElement(RemoteComponent.default, rest, null),
        this.refHold
      );
    };
    init();
  }

  render() {
    return <div ref={(ref) => (this.refHold = ref)}></div>;
  }
}

export default Adapter;
