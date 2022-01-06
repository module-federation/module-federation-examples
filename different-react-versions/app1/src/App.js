import React from 'react';
import Adapter from './adapter';

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
        <Adapter
          // any other props, passed to ModernComponent
          {...this.state}
          importer={() => import('app2/ModernComponent')}
        >
          <h3>And these are children passed into it from the legacy app</h3>
        </Adapter>
        {/*This will Fail*/}
        {/*<HookComponent/>*/}
        <React.Suspense fallback="Loading Button">
          <RemoteButton />
        </React.Suspense>
        {/*This will fail without Adapter*/}
        {/*<React.Suspense fallback="Loading Button">*/}
        {/*  <ModernComponent />*/}
        {/*</React.Suspense>*/}
      </div>
    );
  }
}

export default App;
