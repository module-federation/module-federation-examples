import React, { lazy } from "react";
import {
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import { Layout } from "../components/Layout";
import {
  app1RoutingPrefix,
  app2RoutingPrefix,
} from "./constants";

const App1Lazy = lazy(() => import("../components/App1"));
const App2Lazy = lazy(() => import("../components/App2"));

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to={`/${app1RoutingPrefix}`} />} />
          <Route path={`/${app1RoutingPrefix}/*`} element={<App1Lazy />} />
          <Route path={`/${app2RoutingPrefix}/*`} element={<App2Lazy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
