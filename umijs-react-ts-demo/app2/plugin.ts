// See https://umijs.org/docs/guides/plugins
import type { IApi } from 'umi';
import { resolve } from 'path';
import { readFileSync } from 'fs';
// import { ModuleFederationPlugin } from '@module-federation/enhanced';

export default (api: IApi) => {
  // 实现 umi-plugin-mf-bootstrap， umi-plugin-mf-bootstrap-r 在 umi@4 下不兼容，会在 tmp 目录下生成 plugin-mfBootstrapR
  api.onGenerateFiles(() => {
    const path = api.env === 'production' ? './src/.umi-production/umi.ts' : './src/.umi/umi.ts';
    const buffer = readFileSync(resolve(path));
    const c = String(buffer);
    // 防止热更新重复覆盖
    if (c.includes('const { bootstrap, mount, unmount, update } = await import("./index")')) {
      return;
    }

    api.writeTmpFile({
      path: 'index.ts',
      content: c,
      noPluginDir: true
    });
    api.writeTmpFile({
      path: 'umi.ts',
      content: `
const { bootstrap, mount, unmount, update } = await import("./index")
export { bootstrap, mount, unmount, update }
      `,
      noPluginDir: true
    });
  });
};
