import React, { createContext } from 'react';
import Widget from './Widget';
import useFetchJson from '../hooks/useFetchJson';

export const EnvContext = createContext();

// Wraps the Widget component with the EnvContext
const WidgetWrapper = () => {
  const { data, loading } = useFetchJson(`${__webpack_public_path__}env-config.json`);

  return loading ? (
    'Loading...'
  ) : (
    <>
      <EnvContext.Provider value={data}>
        <Widget />
      </EnvContext.Provider>
    </>
  );
};

export default WidgetWrapper;
