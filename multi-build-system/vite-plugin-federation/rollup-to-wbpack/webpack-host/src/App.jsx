import React from "react";
import ReactDOM from "react-dom";

import "./index.scss";

const Header = React.lazy(() => import("my-nav/Button"));

const App = () => (
 <div className="mt-10 text-3xl mx-auto max-w-6xl">
 <React.Suspense fallback={<div />}>
 <Header />
 </React.Suspense>
 <div className="mt-10">Home page</div>
 </div>
);

ReactDOM.render(<App />, document.getElementById("app"));
