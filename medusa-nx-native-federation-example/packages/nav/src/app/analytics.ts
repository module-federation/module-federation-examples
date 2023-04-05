import { loadRemoteModule } from '@softarc/native-federation';

const pending = [] as string[];
let sendAnalyticsMessage = (message: string) => '';

const utils = loadRemoteModule({
  remoteName: 'utils',
  exposedModule: './analytics'
})
.then((module) => {
  console.log('imported Analytics!!!!');
  console.log('eana mod', module);
  sendAnalyticsMessage = module.sendAnalyticsMessage;
  pending.forEach(sendAnalyticsMessage);
});

export const sendMessage = async (message: string) => {
  await utils;
  
  if (sendAnalyticsMessage) {
    sendAnalyticsMessage(message);
  } else {
    pending.push(message);
  }
};
