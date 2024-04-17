import {Suspense} from 'react';
import LocalButton from './Button';
import ServiceComponent from './ServiceComponent';

const App = () => (
  <div>
    <h1>Basic Host-Remote</h1>
    <h2>Remote</h2>
    <LocalButton />
    <Suspense fallback={'loading'}>
      <ServiceComponent/>
    </Suspense>
  </div>
);

export default App;
