import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// const RemoteButton = React.lazy(
//   () => import('Remote/Button'),
// ) as unknown as typeof RemoteButtonProps;
import Routers from './Routers';

const App = () => {
  return <RouterProvider router={createBrowserRouter(Routers())} />;
};

export default App;
