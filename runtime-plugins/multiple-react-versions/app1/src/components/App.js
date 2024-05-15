import React, { Component, Suspense } from 'react';

const ModernComponent = React.lazy(() => import("app2/ModernComponent"));
const RemoteButton = React.lazy(() => import('app2/Button'));

// Hooks not supported, uncomment to verify this is a pre-hooks react version being used.
// import HookComponent from './ComponentWithHook'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { input: '' };
  }

  setValue = (e) => {
    this.setState({ input: e.target.value });
  }

  render() {
    console.log(__webpack_share_scopes__);
    return (
      <div>
        <h1>Basic Host-Remote</h1>
        <h2>App 1, Uses react version not compatible with hooks</h2>
        <input onChange={this.setValue} placeholder="Type something into this input" />

        <div style={{ border: '1px red solid', padding: '10px', margin: '20px 0' }}>
          <Suspense fallback="Loading Modern Com">
            <ModernComponent {...this.state}>
              <h3>And these are children passed into it from the legacy app</h3>
            </ModernComponent>
          </Suspense>
        </div>

        {/* This will Fail */}
        {/* <HookComponent /> */}

        <div style={{ border: '1px red solid', padding: '10px', margin: '20px 0' }}>
          <Suspense fallback="Loading Button">
            <RemoteButton />
          </Suspense>
        </div>
      </div>
    );
  }
}

export default App;
