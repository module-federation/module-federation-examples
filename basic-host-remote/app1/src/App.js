import React from "react";
import lodash from "lodash";

const RemoteButton = React.lazy(() => import("app2/Button"));

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // checks if an error has occured in its children.
      hasError: false,
    };
  }
  componentDidCatch(err, info) {
    // set the the hasError state to true so on the next render it will display the `<div>Error occured.</div>` in the DOM.
    this.setState({ hasError: true });
  }
  render() {
    if (this.state.hasError) {
      // if the hasError state boolean is true, it returns this to tell the user an error has occurred
      return <div>Error occurred.</div>;
    } else {
      // if there is no error the children components are returned so there are rendered.
      return this.props.children;
    }
  }
}

const App = () => (
  <div>
    <h1>Basic Host-Remote</h1>
    <h2>HOST lodash@{lodash.VERSION}</h2>
    <ErrorBoundary>
      <React.Suspense fallback="Loading Button">
        <RemoteButton />
      </React.Suspense>
    </ErrorBoundary>
  </div>
);

export default App;
