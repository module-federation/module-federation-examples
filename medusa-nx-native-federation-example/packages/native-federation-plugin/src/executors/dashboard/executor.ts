import { promisify } from 'util';
import { exec } from 'child_process';
import {
  ExecutorContext,
  ProjectGraph,
  parseTargetString,
  readTargetOptions
} from '@nrwl/devkit';
import {
  NFPDashboardExecutorOptions,
  NFPDashboardOutputFile,
  NFPDashboardToken
} from './schema';
import { readFileTokens, replaceWithTokens } from './token';
import { buildDashboardFile, sendDashboardFile } from './dashboard';

/**
 *
 */
async function executeProjectBuild(target: string): Promise<{ stdout: string; stderr: string }> {
  return promisify(exec)(`npx nx run ${target} --skip-nx-cache`);
}

/**
 *
 */
export default async function runExecutor(
  options: NFPDashboardExecutorOptions,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  const { projectName, root } = context;
  const {
    buildTarget,
    filename,
    metadata,
    tokenFile,
    writeUrl,
    environment,
    versionStrategy
  } = options;

  try {
    await executeProjectBuild(buildTarget);
  } catch (e) {
    throw new Error(e);
  }

  const graph: ProjectGraph = context.projectGraph;
  let buildOptions;

  try {
    buildOptions = readTargetOptions(parseTargetString(buildTarget, graph), context);
  } catch (e) {
    throw new Error(`Invalid buildTarget: ${buildTarget}`);
  }

  let dashboardFile: NFPDashboardOutputFile;

  try {
    dashboardFile = await buildDashboardFile(graph, {
      buildTarget,
      name: projectName,
      rootPath: root,
      outputPath: buildOptions.outputPath,
      filename,
      versionStrategy,
      environment,
      metadata
    });
  } catch (e) {
    throw new Error(`Error occurred while creating Dashboard '${filename}': ${e}`);
  }

  let tokens: NFPDashboardToken;

  try {
    tokens = readFileTokens(tokenFile);
  } catch (e) {
    throw new Error(`Invalid token file: ${tokenFile}`);
  }

  try {
    const endpoint = replaceWithTokens(writeUrl, tokens);
    await sendDashboardFile(endpoint, dashboardFile);
  } catch (e) {
    throw new Error(`Error occurred while sending Dashboard '${filename} file': ${e}`);
  }

  return { success: true };
}
