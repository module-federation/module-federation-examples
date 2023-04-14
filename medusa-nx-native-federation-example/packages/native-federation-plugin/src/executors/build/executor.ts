import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { exec } from 'child_process';
import {
  normalizePath,
  parseTargetString,
  Target,
  ProjectGraph,
  ExecutorContext,
  ProjectConfiguration,
} from '@nrwl/devkit';
import { NFPWorkspacePaths, NFPBuildExecutorOptions } from './schema';
import { buildRemotesFile } from './remotes';

/**
 * Creates a builder name for a specific project
 */
const NFP_PROJECT_BUILDER_NAME = (projectName: string): string => {
  return `${projectName}-build`;
};

/**
 * Normalizes the paths to POSIX form (because of Win32 systems which transformes them),
 * brings all paths to a common form,
 * adds some extra paths
 */
function normalizeWorkspacePaths(
  workspaceRootPath: string,
  projectEntryPath: string,
  projectIndexHtml: string,
  projectAssets: string[],
  workspaceDistPath: string,
  projectName: string,
  graph: ProjectGraph
): NFPWorkspacePaths {

  const projectConfiguration: ProjectConfiguration = graph.nodes[projectName].data;
  const executorTarget: Target = parseTargetString(projectConfiguration.targets.build.executor, graph);
  const executorTargetSourcePath = graph.nodes[executorTarget.project].data.sourceRoot;
  const { root, sourceRoot } = projectConfiguration;

  return {
    executorTargetPath: normalizePath(path.join(executorTargetSourcePath, 'executors', executorTarget.target)),
    workspaceRootPath: workspaceRootPath.replace(/\\/gi, '/'),
    workspaceDistPath: normalizePath(workspaceDistPath),
    workspaceTsConfigPath: `tsconfig.base.json`,
    projectName,
    projectPath: root,
    projectSrcPath: sourceRoot,
    projectEntryPath,
    projectIndexHtml,
    projectAssets,
    projectFederationConfigPath: normalizePath(path.join(root, './federation.config.js')),
    dev: true
  };
}

/**
 * Creates the file which contains Typescript code to execute the Native Federation Builder
 * for a specific project
 * Example: `dist/{projectName}/remote-build.ts`
 */
function createProjectBuilderTsFile(workspace: NFPWorkspacePaths) {
  const { workspaceDistPath, projectName } = workspace;
  const builderOutputTsFile = path.join(workspaceDistPath, `./${NFP_PROJECT_BUILDER_NAME(projectName)}.ts`);

  const builderTypescript = `
    import { executeProjectBuild } from './build';
    executeProjectBuild('${JSON.stringify(workspace)}');
  `;

  fs.mkdirSync(workspaceDistPath, { recursive: true });
  fs.writeFileSync(builderOutputTsFile, builderTypescript, {
    encoding: 'utf8',
    flag: 'w',
  });
}

/**
 * Removes Typescript file which was created by `createProjectBuilderTsFile(..)`
 */
function removeProjectBuilderTsFile(workspace: NFPWorkspacePaths) {
  const { workspaceDistPath, projectName } = workspace;
  const builderOutputTsFile = path.join(workspaceDistPath, `./${NFP_PROJECT_BUILDER_NAME(projectName)}.ts`);

  if (fs.existsSync(builderOutputTsFile)) {
    fs.unlinkSync(builderOutputTsFile);
  }
}

/**
 * Compiles `build.ts` to `dist/{projectName}/build.js` to be required in a specific project
 * to execure the Native Federation Builder
 */
async function compileCommonBuilderTsFile(
  workspace: NFPWorkspacePaths
): Promise<{ stdout: string; stderr: string }> {
  const { executorTargetPath, workspaceDistPath } = workspace;
  const builderTsFile = path.join(executorTargetPath, './build.ts');
  const bundleCommand = `npx tsc --skipLibCheck ${builderTsFile} --outDir ${workspaceDistPath}`;

  return promisify(exec)(bundleCommand);
}

/**
 * Compiles a specific project `dist/{projectName}/remote-build.ts` to `..remote-build.js`
 * then executes the one to run the Native Federation Builder
 */
async function compileAndRunProjectBuilderFiles(
  workspace: NFPWorkspacePaths
): Promise<{ stdout: string; stderr: string }> {
  const { workspaceDistPath, projectName } = workspace;
  const builderOutputTsFile = path.join(workspaceDistPath, `./${NFP_PROJECT_BUILDER_NAME(projectName)}.ts`);
  const builderOutputJsFile = normalizePath(path.join(workspaceDistPath, `./${NFP_PROJECT_BUILDER_NAME(projectName)}.js`));
  const bundleAndRunCommand = `npx tsc --skipLibCheck ${builderOutputTsFile} --outDir ${workspaceDistPath} && node ${builderOutputJsFile}`;

  return promisify(exec)(bundleAndRunCommand);
}

/**
 * Nx Local Executor entry function
 * Builds a project within Native Module Federation
 */
export default async function runExecutor(
  options: NFPBuildExecutorOptions,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  const { target, root, projectName, projectGraph, configurationName } = context;
  const { outputPath, main, index, assets, remotes } = options;

  const projectConfigurationOptions: NFPBuildExecutorOptions = target?.configurations[configurationName]
    || {};

  let workspace: NFPWorkspacePaths = normalizeWorkspacePaths(
    root,
    main,
    index,
    assets,
    outputPath,
    projectName,
    projectGraph
  );

  workspace = {...workspace, ...projectConfigurationOptions};

  console.info(`Nx Native Federation: Building...`);

  try {
    const{stdout}=await compileCommonBuilderTsFile(workspace);
    console.log(stdout);
  } catch (e) {
    throw new Error(e);
  }

  createProjectBuilderTsFile(workspace);

  try {
    const{stdout}=await compileAndRunProjectBuilderFiles(workspace);
    removeProjectBuilderTsFile(workspace);
    console.log(stdout);

  } catch (e) {
    throw new Error(e);
  }

  if (remotes) {
    try {
      await buildRemotesFile(
        outputPath,
        remotes,
        projectName,
        context
      );
    } catch (e) {
      throw new Error(e);
    }
  }

  console.info(`Nx Native Federation: Successfully built`);
  return { success: true };
}
