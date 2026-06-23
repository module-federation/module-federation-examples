import type { PluginOption, UserConfig } from 'vite';

import angular from '@analogjs/vite-plugin-angular';
import { defineConfig } from 'vite';
import { federation } from '@module-federation/vite';

/** MF sets optimizeDeps.force=true; that re-runs prebundling every dev start and causes 504 Outdated Optimize Dep races (see module-federation/vite#376). */
function clearOptimizeDepsForce(): PluginOption {
  return {
    name: 'clear-mf-optimize-deps-force',
    enforce: 'post',
    config: () => ({
      optimizeDeps: { force: false },
    }),
  };
}

// https://vitejs.dev/config/
export default defineConfig(
  (): UserConfig => ({
    build: {
      target: 'chrome89',
    },
    resolve: {
      mainFields: ['module'],
      dedupe: ['@angular/core'],
    },
    plugins: [
      federation({
        name: 'host',
        remotes: {
          remote: {
            type: 'module',
            name: 'remote',
            entry: 'http://localhost:5174/remoteEntry.js',
            entryGlobalName: 'remote',
            shareScope: 'default',
          },
        },
        exposes: {},
        filename: 'remoteEntry.js',
        shared: ['@angular/core'],
        // DTS pulls @module-federation/dts-plugin into remoteEntry via optimized deps → frequent 504 when cache invalidates.
        dts: false,
      }) as unknown as PluginOption,
      angular() as unknown as PluginOption,
      clearOptimizeDepsForce(),
    ],
  }),
);