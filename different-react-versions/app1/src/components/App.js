import React from 'react';
import ReactAdapterConsumer from './ReactAdapterConsumer';

const RemoteButton = React.lazy(() => import('app2/Button'));

// const ModernComponent = React.lazy(() => import("app2/ModernComponent"));
// Hooks not suppoorted, uncomment to verify this is a pre-hooks react version being used.
// import HookComponent from './ComponentWithHook'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: '' };
    this.setValue = this.setValue.bind(this);
  }

  setValue(e) {
    this.setState({ input: e.target.value });
  }

  render() {
    return (
      <div>
        <h1>Basic Host-Remote</h1>
        <h2>App 1, Uses react version not compatible with hooks</h2>
        <input onChange={this.setValue} placeholder="Type something into this input" />

        <div
          style={{ border: '1px red solid', padding: '10px', margin: '20px 0' }}
          data-e2e="REACT__DIV_BLOCK"
        >
          <ReactAdapterConsumer
            // any other props, passed to ModernComponent
            {...this.state}
            importer={() => import('app2/ModernComponent')}
          >
            <h3>And these are children passed into it from the legacy app</h3>
          </ReactAdapterConsumer>
        </div>

        {/*This will Fail*/}
        {/*<HookComponent/>*/}

        <div 
          style={{ border: '1px red solid', padding: '10px', margin: '20px 0' }}
          data-e2e="REACT__BUTTON_BLOCK"
        >
          <React.Suspense fallback="Loading Button">
            <RemoteButton />
          </React.Suspense>
        </div>

        {/*This will fail without Adapter*/}
        {/*<React.Suspense fallback="Loading Button">*/}
        {/*  <ModernComponent />*/}
        {/*</React.Suspense>*/}
      </div>
    );
  }
}

export default App;
