import * as esbuild from 'esbuild';
import * as path from 'path';
import * as fs from 'fs';
import { federationBuilder } from '@softarc/native-federation/build';
import { createEsBuildAdapter } from '@softarc/native-federation-esbuild';
import { NFPWorkspacePaths } from './schema';

/**
 * Setups the common options to the Federation Builder for a future builds
 */
async function setupNativeFederationBuilder(workspace: NFPWorkspacePaths) {
  await federationBuilder.init({
    options: {
      workspaceRoot: workspace.workspaceRootPath,
      outputPath: workspace.workspaceDistPath,
      tsConfig: workspace.workspaceTsConfigPath,
      federationConfig: workspace.projectFederationConfigPath,
      verbose: false,
    },
    adapter: createEsBuildAdapter({ plugins: [] }),
  });
}

/**
 * Invokes EsBuild Builder to compile project files
 */
async function compileProjectEntryFileByEsbuild(workspace: NFPWorkspacePaths) {
  const { workspaceDistPath, workspaceTsConfigPath, projectEntryPath } = workspace;

  fs.rmSync(workspaceDistPath, { force: true, recursive: true });

  await esbuild.build({
    entryPoints: [projectEntryPath],
    external: federationBuilder.externals,
    outdir: workspaceDistPath,
    bundle: true,
    platform: 'browser',
    format: 'esm',
    mainFields: ['es2020', 'browser', 'module', 'main'],
    conditions: ['es2020', 'es2015', 'module'],
    resolveExtensions: ['.ts', '.tsx', '.mjs', '.js'],
    tsconfig: workspaceTsConfigPath,
    splitting: true
  });
}

/**
 * Copies the project assets from the source root into `dist/{projectName}`
 */
function outputProjectAssets(workspace: NFPWorkspacePaths) {
  const { workspaceDistPath, projectSrcPath } = workspace;
  const indexHtmlFromPath = path.join(projectSrcPath, './index.html');
  const indexHtmlToPath = path.join(workspaceDistPath, './index.html');

  const faviconIcoFromPath = path.join(projectSrcPath, './favicon.ico');
  const faviconIcoToPath = path.join(workspaceDistPath, './favicon.ico');

  fs.copyFileSync(indexHtmlFromPath, indexHtmlToPath);
  fs.copyFileSync(faviconIcoFromPath, faviconIcoToPath);
}

/**
 * Entry function to build a project within the Native Module Federation
 */
export async function executeProjectBuild(options: string) {
  const workspace: NFPWorkspacePaths = JSON.parse(options);

  try {
    await setupNativeFederationBuilder(workspace);
  } catch (e) {
    throw new Error(`Error occurred while initializing the Native Federation Builder: ${e}`);
  }``

  try {
    await compileProjectEntryFileByEsbuild(workspace);
  } catch (e) {
    throw new Error(`Error occurred while compiling by EsBuild Builder: ${e}`);
  }

  try {
    outputProjectAssets(workspace);
  } catch (e) {
    throw new Error(`Error occurred while copiing '${workspace.projectName}' assets: ${e}`);
  }

  try {
    await federationBuilder.build();
  } catch (e) {
    throw new Error(`Error occurred while building '${workspace.projectName}' within the Native Federation Builder : ${e}`);
  }
}
