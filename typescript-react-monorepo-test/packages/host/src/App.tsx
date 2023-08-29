import React from "react";
import RemoteButtonProps from "@mfTypes/Button";
const RemoteButton = React.lazy(
  () => import("Remote/Button")
) as typeof RemoteButtonProps;

import ErrorBoundary from "./ErrorBoundary";

const App = () => {
  return (
    <div>
      <h1>Host Website</h1>
      <h2>this button import from Remote project:</h2>
      <ErrorBoundary>
        <RemoteButton name="host-button">Remote button</RemoteButton>
      </ErrorBoundary>
    </div>
  );
};

export default App;
