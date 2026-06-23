const fs = require('fs');
const path = require('path');
const vm = require('vm');

const repoRoot = path.resolve(__dirname, '..');

const readRuntimePlugin = relativePath =>
  fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');

const loadEsmDefaultFunction = (relativePath, sandbox = {}) => {
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
    ...sandbox,
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

    expect(app1Config).toContain(
      "runtimePlugins: [[require.resolve('../plugin/isolatePluginFactory.ts'), { dependencies: [] }]]",
    );
    expect(app2Config).toContain(
      "runtimePlugins: [[require.resolve('../plugin/isolatePluginFactory.ts'), { dependencies: ['shared-lib'] }]]",
    );
    expect(app3Config).toContain(
      "runtimePlugins: [[require.resolve('../plugin/isolatePluginFactory.ts'), { dependencies: [] }]]",
    );
  });

  test('remote-router demonstrates policy, observability, loader, and preload runtime hooks', async () => {
    globalThis.__REMOTE_ROUTER_EVENTS__ = [];
    const consoleError = jest.fn();
    const document = {
      createElement: tagName => ({
        async: false,
        dataset: {},
        tagName,
      }),
    };
    const createRemoteRouterPlugin = loadEsmDefaultFunction(
      'runtime-plugins/remote-router/host/config/runtimePlugin.js',
      {
        console: { ...console, error: consoleError },
        document,
      },
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
    const scriptResult = plugin.createScript({
      url: 'http://localhost:4200/remoteEntry.js',
      remoteInfo: { name: 'remote_one' },
    });
    const fallback = plugin.errorLoadRemote({
      id: 'remote_two/Button',
      error: new Error('offline'),
      from: 'runtime',
    });
    await plugin.afterLoadRemote({ id: 'remote_one/HelloWorld', recovered: false });
    await plugin.afterLoadEntry({ remoteInfo: { name: 'remote_one' }, recovered: false });
    await plugin.beforePreloadRemote({ preloadOps: [{ nameOrAlias: 'remote_one' }] });
    await plugin.generatePreloadAssets({ remoteInfo: { name: 'remote_one' } });

    expect(beforeRequestArgs.options.remotes[0].entry).toBe(
      'http://localhost:4200/remoteEntry.js',
    );
    expect(scriptResult).toMatchObject({
      timeout: 8000,
      script: {
        async: true,
        dataset: { remoteRouter: 'remote_one' },
        src: 'http://localhost:4200/remoteEntry.js',
        tagName: 'script',
      },
    });
    expect(fallback).toEqual({ default: expect.any(Function) });
    expect(consoleError).toHaveBeenCalledWith('remote_two/Button', 'offline');
    expect(globalThis.__REMOTE_ROUTER_EVENTS__.map(event => event.type)).toEqual([
      'apply',
      'beforeRequest',
      'createScript',
      'errorLoadRemote',
      'afterLoadRemote',
      'afterLoadEntry',
      'beforePreloadRemote',
      'generatePreloadAssets',
    ]);
  });
});
