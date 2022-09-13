let sendAnalyticsMessage = null;

const utils = import('utils/analytics').then(mod => {
  sendAnalyticsMessage = mod.sendAnalyticsMessage;
});

export const sendMessage = async msg => {
  await utils;
  sendAnalyticsMessage(msg);
};
