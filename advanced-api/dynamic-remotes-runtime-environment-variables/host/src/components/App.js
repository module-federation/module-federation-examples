import React, { createContext } from 'react';
import Main from './Main';
import useFetchJson from '../hooks/useFetchJson';

export const EnvContext = createContext();

const App = () => {
  const { data, loading } = useFetchJson(`${__webpack_public_path__}env-config.json`);
  return loading ? (
    'Loading...'
  ) : (
    <>
      <EnvContext.Provider value={data}>
        <Main />
      </EnvContext.Provider>
    </>
  );
};

export default App;
