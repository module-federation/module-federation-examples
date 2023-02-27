import React from 'react';
import { initFederation, loadRemoteModule } from '@softarc/native-federation';
import { loadRemoteEntryVersionsMemo } from 'native-federation-plugin/lib';

export const getRemoteVersions = loadRemoteEntryVersionsMemo('remotes.json');

let TextField: React.ComponentType<any>;

(async () => {
  TextField = React.lazy(async () => {
    const remotes = await getRemoteVersions();
    const module = await loadRemoteModule({
      remoteName: 'dsl',
      exposedModule: './TextField',
      remoteEntry: remotes['dsl'] || 'http://localhost:3002/remoteEntry.json'
    });

    console.log('dsl: ', module);
    return module;
  });

  await initFederation();
})();

const MiniSearch = ({ inputProps = {} }) => (
  <React.Suspense fallback={<span />}>
    <TextField placeholder="Search" {...inputProps} />
  </React.Suspense>
);

export default MiniSearch;
