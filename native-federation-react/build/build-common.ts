import * as esbuild from 'esbuild';
import * as path from 'path';
import * as fs from 'fs';
import { esBuildAdapter } from './esbuild-adapter';
import { federationBuilder } from '@softarc/native-federation/build';
import { build as buildCjs } from './build-cjs';

export async function buildProject(projectName) {

    const tsConfig = 'tsconfig.json';
    const outputPath = `dist/${projectName}`;
    const workspaceRoot = path.join(__dirname, '..');

    await federationBuilder.init({
        options: {
            workspaceRoot,
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
    });

    fs.copyFileSync(`${projectName}/public/index.html`, `dist/${projectName}/index.html`);
    fs.copyFileSync(`${projectName}/public/favicon.ico`, `dist/${projectName}/favicon.ico`);

    await federationBuilder.build();

    // Manifest should be ready by now! Apparently federationBuilder.build() does
    // not wait until all internal promises are fulfilled.
    await waitForManifest(workspaceRoot, outputPath);

    await cjsToEsm(workspaceRoot, outputPath)
}

async function waitForManifest(workspaceRoot, outputPath) {
    const manifestPath = path.join(workspaceRoot, outputPath, 'remoteEntry.json');

    // Manifest should be ready by now! Apparently federationBuilder.build() does
    // not wait until all internal promises are fulfilled.
    while (!fs.existsSync(manifestPath)) {
        await sleep(1000);
    }
}

async function cjsToEsm(
    workspaceRoot,
    outputPath
) {
    const manifestPath = path.join(workspaceRoot, outputPath, 'remoteEntry.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const external = manifest.shared.map((module) => module.packageName);

    await Promise.all(manifest.shared.map(mod => {
        const outFile = path.join(workspaceRoot, outputPath, mod.outFileName);
        const finalExternal = external.filter(externalName => externalName !== mod.packageName);

        return buildCjs(mod.packageName, outFile, workspaceRoot, finalExternal);
    }));
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}