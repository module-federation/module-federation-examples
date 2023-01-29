import { loadRemoteModule } from '@softarc/native-federation';

let sendAnalyticsMessage = (message: string) => '';

const utils = loadRemoteModule({
  remoteName: 'utils',
  exposedModule: './analytics',
  remoteEntry: 'http://localhost:3005/remoteEntry.json'
})
.then((module) => {
  sendAnalyticsMessage = module.sendAnalyticsMessage;
});

export const sendMessage = async (message: string) => {
  await utils;
  sendAnalyticsMessage(message);
};
