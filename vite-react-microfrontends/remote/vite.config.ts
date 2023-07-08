import { federation } from '@module-federation/vite';
import { createEsBuildAdapter } from '@softarc/native-federation-esbuild';
import { reactReplacements } from '@softarc/native-federation-esbuild/src/lib/react-replacements';
import react from '@vitejs/plugin-react';
import { writeFileSync } from "fs";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(async ({ command, mode }) => {
  const selfEnv = loadEnv(mode, process.cwd());
  return {
		server: {
			fs: {
				allow: ['.', '../shared'],
			},
		},
		plugins: [
			{
			  name: "generate-enviroment",
			  options: function () {
				console.info("selfEnv", selfEnv);
				writeFileSync(
				  "./src/enviroment.ts",
				  `export default ${JSON.stringify(selfEnv, null, 2)};`
				);
			  },
			},
			await federation({
				options: {
					workspaceRoot: __dirname,
					outputPath: 'dist',
					tsConfig: 'tsconfig.json',
					federationConfig: `module-federation/federation.config.cjs`,
					verbose: false,
					dev: command === 'serve',
				},
				adapter: createEsBuildAdapter({ plugins: [], fileReplacements: reactReplacements.dev }),
			}),
			react(),
		],
	};
});
