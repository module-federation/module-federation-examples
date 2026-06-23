import { createRuntimePluginPlaywrightConfig } from '../playwright.base';

export default createRuntimePluginPlaywrightConfig({
  useLegacyCommand: false,
  webServers: [
    { directory: 'app1', port: 3001 },
    { directory: 'app2', port: 3002 },
    { directory: 'app3', port: 3003 },
  ],
});
