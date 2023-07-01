import * as path from 'path';
import { writeJsonFile, ExecutorContext, ProjectConfiguration } from '@nrwl/devkit';
import { readFileTokens, replaceWithTokens } from '../dashboard/token';
import { NFPDashboardToken } from '../dashboard/schema';

/**
 *
 */
function createRemotesEndpoint(configuration: ProjectConfiguration): string {
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
    throw new Error(e);
  }

  return endpoint;
}

/**
 *
 */
export async function buildRemotesFile(outputPath: string, remotes: string[], projectName: string, context: ExecutorContext) {
  if (!Array.isArray(remotes) || remotes.length < 1) {
    return;
  }

  remotes = remotes.filter((remote) => {
    return typeof remote === 'string' && remote.trim() !== '';
  });

  if (remotes.length < 1) {
    return;
  }

  const endpoint: string = createRemotesEndpoint(context.projectsConfigurations.projects[projectName]);
  const versionsJson: object = {};

  for (const remote of remotes) {
    versionsJson[remote] = `${endpoint}&currentHost=${projectName}&remoteName=${remote}`;
  }

  const outputFile: string = path.join(outputPath, 'remotes.json');
  writeJsonFile(outputFile, versionsJson);
}