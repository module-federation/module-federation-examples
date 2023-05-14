import React from 'react';
import { importRemote } from '@module-federation/utilities';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import remoteListJson from './remotes.json';

const MainPage = () => {
  return (<div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      }}
    >
    <h1>Dynamic System Host</h1>
    <h2>App 1</h2>
    <p>
      The Dynamic System will take advantage Module Federation <strong>remotes</strong> and{' '}
      <strong>exposes</strong>. It will not load any components or modules that have been loaded
      already.
    </p>
    <Link to='app2'>Go to App 2</Link>
    <br />
    <Link to='app3'>Go to App 3</Link>
    <br />
  </div>)
}

const App2Component = React.lazy(() => importRemote(
  { url: remoteListJson.remotes[0].url,
    scope: remoteListJson.remotes[0].scope,
    module: remoteListJson.remotes[0].module
  }
));

const App3Component = React.lazy(() => importRemote(
  { url: remoteListJson.remotes[1].url,
    scope: remoteListJson.remotes[1].scope,
    module: remoteListJson.remotes[1].module
  }
));

function App() {

  return (
    <BrowserRouter>
     <React.Suspense fallback="Loading System">
        <Routes>
          <Route path='/' element= { <MainPage />}/>
          <Route path='/app2/*' element={ <App2Component /> } />
          <Route path='/app3/*' element={ <App3Component />} />
          <Route path='*' element= { <h1>Error</h1> }/>
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
