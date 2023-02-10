import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { routes } from "./routes";

const browserRouter = createBrowserRouter(routes);

export function Router() {
  return (
    <RouterProvider router={browserRouter} />
  );
}
