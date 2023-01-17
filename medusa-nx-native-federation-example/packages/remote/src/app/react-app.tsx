//import {foo} from 'native-federation-plugin';
import { loadRemoteModule } from '@softarc/native-federation';

const reactAppMod = loadRemoteModule({
  remoteName: 'remote',
  exposedModule: './react-remote'
});

const reactAppMod2 = loadRemoteModule({
  remoteName: 'remote',
  exposedModule: './react-remote'
});

export function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>I'm the remote's React Component!</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
