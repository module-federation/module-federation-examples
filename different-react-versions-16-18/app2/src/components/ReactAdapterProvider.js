import React from 'react';
import ReactDOM from 'react-dom';

class ReactAdapterProvider extends React.Component {
  constructor(props) {
    super(props);
    this.refHold;
  }

  init = hydrate => {
    (async () => {
      const { component, children, ...rest } = this.props;
      const renderMethod = hydrate ? ReactDOM.hydrate : ReactDOM.render;
      renderMethod(React.createElement(component, rest, children), this.refHold);
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

export default ReactAdapterProvider;
