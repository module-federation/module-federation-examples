import React, { lazy, Suspense } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import { Layout } from "../components/Layout";
import { app1RoutingPrefix, app2RoutingPrefix } from "./constants";

const App1Lazy = lazy(() => import("../components/App1"));
const App2Lazy = lazy(() => import("../components/App2"));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to={`/${app1RoutingPrefix}`} />,
      },
      {
        path: `/${app1RoutingPrefix}/*`,
        element: <Suspense fallback="Loading App1..."><App1Lazy /></Suspense>,
      },
      {
        path: `/${app2RoutingPrefix}/*`,
        element: <Suspense fallback="Loading App2..."><App2Lazy /></Suspense>,
      },
    ],
  }
];