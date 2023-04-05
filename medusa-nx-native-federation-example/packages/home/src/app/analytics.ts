import { loadRemoteModule } from '@softarc/native-federation';
import { loadRemoteEntryVersionsMemo } from 'native-federation-plugin/lib';

const getRemoteVersions = loadRemoteEntryVersionsMemo('remotes.json');
let sendAnalyticsMessage = (message: string) => '';

let utils: Promise<void>;

(async () => {
  const remotes = await getRemoteVersions();
  utils = loadRemoteModule({
    remoteName: 'utils',
    exposedModule: './analytics',
    remoteEntry: remotes['utils'] || 'http://localhost:3005/remoteEntry.json'
  })
  .then((module) => {
    sendAnalyticsMessage = module.sendAnalyticsMessage;
  });
})();

export const sendMessage = async (message: string) => {
  await utils;
  sendAnalyticsMessage(message);
};
