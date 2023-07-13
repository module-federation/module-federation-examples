import { ReactNode } from 'react';
import Home from '../pages/Home';
import Page_2 from '../pages/Page_2';

type SubRoutChild = {
  path?: string;
  element?: ReactNode;
  children?: SubRoutChild[];
};
export type PathRoutePropsItems = {
  path: string;
  element?: ReactNode;
  children: SubRoutChild[];
};

const Routers = (): PathRoutePropsItems | {} => {
  return {
    path: 'app-1',
    children: [
      { path: '', element: <Home /> },
      { path: 'page-2', element: <Page_2 /> },
    ],
  };
};

export default Routers;
