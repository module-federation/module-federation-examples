import { createBrowserRouter, createMemoryRouter } from "react-router-dom";
import { routes } from "./routes";
import { RoutingStrategy } from "./types";

interface CreateRouterProps {
  strategy?: RoutingStrategy;
  initialPathname?: string;
}

export function createRouter({ strategy, initialPathname }: CreateRouterProps) {
  if (strategy === 'browser') {
    return createBrowserRouter(routes);
  }

  const initialEntries = [initialPathname || "/"];
  return createMemoryRouter(routes, { initialEntries: initialEntries });
}