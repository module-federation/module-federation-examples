import type { ReactNode } from 'react';
import Home from '../pages/Home';
import Page_2 from '../pages/Page_2';
import RootLayout from '../components/RootLayout';

type SubRoutChild = {
  path?: string;
  element?: ReactNode;
  children?: SubRoutChild[];
};
type PathRoutePropsItems = {
  path: string;
  element?: ReactNode;
  children: SubRoutChild[];
};

const Local = (): PathRoutePropsItems | {} => {
  return {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'page-2', element: <Page_2 /> },
    ],
  };
};

export default Local;
