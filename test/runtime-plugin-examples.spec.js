const fs = require('fs');
const path = require('path');
const vm = require('vm');

const repoRoot = path.resolve(__dirname, '..');

const readRuntimePlugin = relativePath =>
  fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');

const loadEsmDefaultFunction = relativePath => {
  const source = readRuntimePlugin(relativePath).replace(
    'export default function',
    'module.exports = function',
  );
  const module = { exports: {} };
  vm.runInNewContext(source, {
    console,
    globalThis,
    module,
    exports: module.exports,
  });
  return module.exports;
};

describe('runtime plugin examples', () => {
  test('isolate-shared-dependencies configures runtime plugin params through Module Federation tuples', () => {
    const app1Config = readRuntimePlugin(
      'runtime-plugins/isolate-shared-dependencies/app1/webpack.config.js',
    );
    const app2Config = readRuntimePlugin(
      'runtime-plugins/isolate-shared-dependencies/app2/webpack.config.js',
    );
    const app3Config = readRuntimePlugin(
      'runtime-plugins/isolate-shared-dependencies/app3/webpack.config.js',
    );

    expect(app1Config).toContain("runtimePlugins: [[require.resolve('../plugin/isolatePluginFactory.ts'), { dependencies: [] }]]");
    expect(app2Config).toContain(
      "runtimePlugins: [[require.resolve('../plugin/isolatePluginFactory.ts'), { dependencies: ['shared-lib'] }]]",
    );
    expect(app3Config).toContain("runtimePlugins: [[require.resolve('../plugin/isolatePluginFactory.ts'), { dependencies: [] }]]");
  });

  test('remote-router demonstrates policy, observability, loader, and preload runtime hooks', async () => {
    globalThis.__REMOTE_ROUTER_EVENTS__ = [];
    const createRemoteRouterPlugin = loadEsmDefaultFunction(
      'runtime-plugins/remote-router/host/config/runtimePlugin.js',
    );

    const plugin = createRemoteRouterPlugin();

    expect(plugin.name).toBe('remote-router');
    expect(typeof plugin.apply).toBe('function');
    expect(typeof plugin.beforeRequest).toBe('function');
    expect(typeof plugin.errorLoadRemote).toBe('function');
    expect(typeof plugin.createScript).toBe('function');
    expect(typeof plugin.afterLoadRemote).toBe('function');
    expect(typeof plugin.afterLoadEntry).toBe('function');
    expect(typeof plugin.beforePreloadRemote).toBe('function');
    expect(typeof plugin.generatePreloadAssets).toBe('function');

    plugin.apply({ name: 'host' });

    const beforeRequestArgs = {
      id: 'remote_one/HelloWorld',
      options: {
        remotes: [{ name: 'remote_one', entry: 'http://placeholder/remoteEntry.js' }],
      },
    };
    plugin.beforeRequest(beforeRequestArgs);
    await plugin.afterLoadRemote({ id: 'remote_one/HelloWorld', recovered: false });
    await plugin.afterLoadEntry({ remoteInfo: { name: 'remote_one' }, recovered: false });
    await plugin.beforePreloadRemote({ preloadOps: [{ nameOrAlias: 'remote_one' }] });
    await plugin.generatePreloadAssets({ remoteInfo: { name: 'remote_one' } });

    expect(beforeRequestArgs.options.remotes[0].entry).toBe(
      'http://localhost:4200/remoteEntry.js',
    );
    expect(globalThis.__REMOTE_ROUTER_EVENTS__.map(event => event.type)).toEqual([
      'apply',
      'beforeRequest',
      'afterLoadRemote',
      'afterLoadEntry',
      'beforePreloadRemote',
      'generatePreloadAssets',
    ]);
  });
});
