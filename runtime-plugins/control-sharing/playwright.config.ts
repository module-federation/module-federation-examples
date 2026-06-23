import { createRuntimePluginPlaywrightConfig } from '../playwright.base';

export default createRuntimePluginPlaywrightConfig({
  webServers: [
    { directory: 'app1', port: 3001 },
    { directory: 'app2', port: 3002 },
  ],
});
