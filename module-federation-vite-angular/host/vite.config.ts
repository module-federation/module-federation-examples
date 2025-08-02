import angular from '@analogjs/vite-plugin-angular';
import { federation } from '@module-federation/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
	build: {
		target: 'chrome89',
	},
	resolve: {
		mainFields: ['module'],
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
		}),
		angular(),
	],
}));
