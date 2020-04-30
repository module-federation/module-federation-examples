import React from "react";

const HomePage = React.lazy(() => import("./HomePage"));

const routes = [
  {
    path: "/",
    component: HomePage,
    exact: true,
  },
];

export default routes;
