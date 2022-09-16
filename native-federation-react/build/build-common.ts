import * as esbuild from 'esbuild';
import * as path from 'path';
import * as fs from 'fs';
import { esBuildAdapter } from './esbuild-adapter';
import { federationBuilder } from '@softarc/native-federation/build';

const { commonjs } = require("@hyrious/esbuild-plugin-commonjs");

export async function buildProject(projectName) {

    const tsConfig = 'tsconfig.json';
    const outputPath = `dist/${projectName}`;

    await federationBuilder.init({
        options: {
            workspaceRoot: path.join(__dirname, '..'),
            outputPath,
            tsConfig,
            federationConfig: `${projectName}/federation.config.js`,
            verbose: false,
        },
        adapter: esBuildAdapter
    });

    fs.rmSync(outputPath, { force: true, recursive: true });

    await esbuild.build({
        entryPoints: [`${projectName}/src/index.ts`],
        external: federationBuilder.externals,
        outdir: outputPath,
        bundle: true,
        platform: 'browser',
        format: 'esm',
        mainFields: ['es2020', 'browser', 'module', 'main'],
        conditions: ['es2020', 'es2015', 'module'],
        resolveExtensions: ['.ts', '.tsx', '.mjs', '.js'],
        tsconfig: tsConfig,
        splitting: true,
        // plugins: [ commonjs() ]
    });

    fs.copyFileSync(`${projectName}/public/index.html`, `dist/${projectName}/index.html`);
    fs.copyFileSync(`${projectName}/public/favicon.ico`, `dist/${projectName}/favicon.ico`);

    await federationBuilder.build();
}
