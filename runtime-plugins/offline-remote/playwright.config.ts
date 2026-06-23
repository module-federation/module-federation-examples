import { createRuntimePluginPlaywrightConfig } from '../playwright.base';

export default createRuntimePluginPlaywrightConfig({
  webServers: [{ directory: 'app1', port: 3001 }],
});
