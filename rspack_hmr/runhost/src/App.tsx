import './App.css';
import { lazy, Suspense } from 'react';
import { loadRemote } from '@module-federation/runtime';
//@ts-ignore
const Hello = lazy(() => loadRemote('a2/Hello').then(module => ({ default: module.Hello })));
function App() {
  return (
    <div className="App">
      <div></div>
      <h1>App_01 :(</h1>
      <Suspense fallback="Loading Hello">
        <Hello name={'bob?'} />
      </Suspense>
    </div>
  );
}

export default App;
