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
			filename: 'remoteEntry.js',
			name: 'remote',
			exposes: {
				'./remote-app': './src/app.component.ts',
			},
			remotes: {},
			shared: ['@angular/core'],
		}),
		angular(),
	],
}));
