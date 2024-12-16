import { useEffect } from 'react';
import { init, loadRemote } from '@module-federation/enhanced/runtime';

interface RemoteModule {
  inject: (parentElementId: string) => void;
  unmount: () => void;
}

init({
  name: 'shell',
  remotes: [
    {
      name: 'remote',
      entry: 'http://localhost:3002/mf-manifest.json',
    },
  ],
});

const parentElementId = 'parent';

const App = () => {
  useEffect(() => {
    let unmountRemote: () => void;

    const loadRemoteApp = async () => {
      try {
        const module = await loadRemote<RemoteModule>('remote/appInjector');
        if (!module) return;
        const { inject, unmount } = module;
        unmountRemote = unmount;

        inject(parentElementId);
      } catch (error) {
        console.error('Error loading the Remote:', error);
      }
    };

    loadRemoteApp();

    return () => {
      if (unmountRemote) unmountRemote();
    };
  }, []);

  // Remote will be injected in the div with parentElementId
  return (
    <div>
      <h1>Host Application - React</h1>
      <h2>Remote</h2>
      <div id={parentElementId} />
    </div>
  );
};

export default App;
