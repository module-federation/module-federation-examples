import React from 'react';
import ReactAdapterConsumer from './ReactAdapterConsumer';

// you can import types with alias
import type { ButtonProps } from 'app2/Button';

const RemoteButton = React.lazy(
  () => import('app2/Button') as Promise<{ default: React.ComponentType<ButtonProps> }>,
);

// const ModernComponent = React.lazy(() => import("app2/ModernComponent"));
// Hooks not suppoorted, uncomment to verify this is a pre-hooks react version being used.
// import HookComponent from './ComponentWithHook'

export interface AppProps {}

export interface AppState {
  input: string;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { input: '' };
    this.setValue = this.setValue.bind(this);
  }

  setValue(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ input: e.target.value });
  }

  render() {
    return (
      <div>
        <h1>Basic Host-Remote</h1>
        <h2>App 1, Uses react version not compatible with hooks</h2>
        <input onChange={this.setValue} placeholder="Type something into this input" />

        <div style={{ border: '1px red solid', padding: '10px', margin: '20px 0' }}
         data-e2e="REACT__DIV_BLOCK"
        >
          {/* the generic component accepts property types */}
          <ReactAdapterConsumer<AppState>
            // any other props, passed to ModernComponent
            {...this.state}
            fallback={<div>Loading...</div>}
            importer={() =>
              import('app2/ModernComponent').then(module => ({ default: module.Adapted }))
            }
          >
            <h3>And these are children passed into it from the legacy app</h3>
          </ReactAdapterConsumer>
        </div>

        {/*This will Fail*/}
        {/*<HookComponent/>*/}

        <div style={{ border: '1px red solid', padding: '10px', margin: '20px 0' }}
         data-e2e="REACT__BUTTON_BLOCK"
         >
          <React.Suspense fallback="Loading Button">
            {/* The autocomplete works here, try it modifing the color value */}
            <RemoteButton color="red" />
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
