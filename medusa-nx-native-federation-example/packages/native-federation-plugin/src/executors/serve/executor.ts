import * as path from 'path';
import { ExecutorContext, ProjectConfiguration } from '@nrwl/devkit';
import { NFPServeExecutorOptions } from './schema';
import serveExecutor from '@nrwl/web/src/executors/file-server/file-server.impl';
import { readFileTokens, replaceWithTokens } from '../dashboard/token';
import { NFPDashboardToken } from '../dashboard/schema';

async function fetchProjectBuildVersion(endpoint: string) {
  try {
    const response = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });

    console.log(response);

    if (!response.ok) {
      throw response;
    }

    return await response.json();
  } catch (e) {
    return Promise.reject(e);
  }
}

function createDashboardReadUrl(configuration: ProjectConfiguration): string {
  const { tokenFile, environment, readUrl } = configuration.targets.dashboard.options;
  let endpoint: string;
  let tokens: NFPDashboardToken;

  try {
    tokens = readFileTokens(tokenFile);
  } catch (e) {
    throw new Error(`Invalid token file: ${tokenFile}`);
  }

  try {
    tokens.ENVIRONMENT = environment;
    endpoint = replaceWithTokens(readUrl, tokens);
  } catch (e) {
    //throw new Error(`Error occurred while sending Dashboard '${filename} file': ${e}`);
  }

  return endpoint;
}

/**
 *
 */
function updateProjectBuildOutputPath(context: ExecutorContext, version: string) {
  const projectBuildTarget = context.workspace.projects[context.projectName].targets.build;
  projectBuildTarget.options.outputPath = path.join(projectBuildTarget.options.outputPath, `version-${version}`);
}

/**
 *
 */
export default async function runExecutor(
  options: NFPServeExecutorOptions,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  const { root, projectName, configurationName } = context;

  options.host = options.host || 'localhost';

  if (configurationName === 'version') {
    const endpoint = createDashboardReadUrl(context.projectsConfigurations.projects[projectName]);
    const buildVersion = await fetchProjectBuildVersion(endpoint);
    console.log(`ver: `, buildVersion);
    updateProjectBuildOutputPath(context, buildVersion);
  }

  for await (const execution of serveExecutor(options, context as never)) {
    if (!execution.success) {
      throw new Error(`Nx Native Federation: Starting server failed`);
    }
  }

  return { success: true };
}