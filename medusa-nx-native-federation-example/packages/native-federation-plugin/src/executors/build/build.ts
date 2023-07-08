import * as esbuild from 'esbuild';
import { federationBuilder } from '@softarc/native-federation/build';
import { createEsBuildAdapter } from '@softarc/native-federation-esbuild';
import { NFPWorkspacePaths } from './schema';
import { cleanDirectory, copyDirectory, isDirectory } from './directory-util';

/**
 * Setups the common options to the Federation Builder for a future builds
 */
async function setupNativeFederationBuilder(workspace: NFPWorkspacePaths) {
  const { workspaceDistPath, workspaceRootPath, workspaceTsConfigPath, projectFederationConfigPath, dev } 
    = workspace;

  await federationBuilder.init({
    options: {
      workspaceRoot: workspaceRootPath,
      outputPath: workspaceDistPath,
      tsConfig: workspaceTsConfigPath,
      federationConfig: projectFederationConfigPath,
      verbose: false,
      dev: Boolean(dev)
    },
    adapter: createEsBuildAdapter({ plugins: [] }),
  });
}

/**
 * Invokes EsBuild Builder to compile project files
 */
async function compileProjectMain(workspace: NFPWorkspacePaths) {
  const { workspaceDistPath, workspaceTsConfigPath, projectEntryPath, dev } = workspace;

  cleanDirectory(workspaceDistPath, (filePath) => isDirectory(filePath) && filePath.includes('version-'));

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
    splitting: true,
    minify: !dev
  });
}

/**
 * Copies the project assets from the source root into `dist/{projectName}`
 */
function copyProjectAssets(workspace: NFPWorkspacePaths) {
  const { projectIndexHtml, workspaceDistPath, projectAssets } = workspace;

  copyDirectory(projectIndexHtml, workspaceDistPath);

  for (const assetPath of projectAssets) {
    copyDirectory(assetPath, workspaceDistPath, null, true);
  }
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
  }

  try {
    await compileProjectMain(workspace);
  } catch (e) {
    throw new Error(`Error occurred while compiling by EsBuild Builder: ${e}`);
  }

  try {
    copyProjectAssets(workspace);
  } catch (e) {
    throw new Error(`Error occurred while copiing '${workspace.projectName}' assets: ${e}`);
  }

  try {
    await federationBuilder.build();
  } catch (e) {
    throw new Error(`Error occurred while building '${workspace.projectName}' within the Native Federation Builder : ${e}`);
  }
}
