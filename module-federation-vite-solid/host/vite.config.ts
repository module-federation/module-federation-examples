import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { federation } from '@module-federation/vite';
import { dependencies } from './package.json';
// import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    federation({
			name: 'host',
			remotes: {
				remote: {
					type: 'module',
					name: 'remote',
					entry: 'http://localhost:4174/remoteEntry.js',
					entryGlobalName: 'remote',
					shareScope: 'default',
				},
			},
			exposes: {},
			filename: 'remoteEntry.js',
			shared: {
				'solid-js': {
					requiredVersion: dependencies['solid-js'],
					singleton: true,
				},
			},
		}),
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
