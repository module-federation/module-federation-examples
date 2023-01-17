import * as path from 'path';
import { writeJsonFile, ProjectGraph } from '@nrwl/devkit';
import { NFPDashboardOptions, NFPDashboardOutputFile } from './schema';
import { createGitSha, createVersion, readNxBuildHash } from './version';
import { readProjectDependencies, readProjectDevDependencies } from './graph-deps';
import { readProjectConsumeModules, readProjectExposedModules } from './graph-modules';

/**
 * 
 */
export async function buildDashboardFile(graph: ProjectGraph, options: NFPDashboardOptions) {
  const {
    buildTarget, 
    name,
    rootPath,
    outputPath, 
    filename = 'dashboard.json',
    versionStrategy,
    environment = 'development',
    metadata 
  } = options;

  const dashboard: NFPDashboardOutputFile = {
    id: name,
    name,
    remote: metadata.remote,
    version: createVersion(versionStrategy),
    sha: createGitSha(),
    buildHash: readNxBuildHash(buildTarget, rootPath),
    environment,
    metadata,
    dependencies: await readProjectDependencies(graph, rootPath, name),
    devDependencies: await readProjectDevDependencies(graph, rootPath, name),
    overrides: [],
    modules: await readProjectExposedModules(graph, rootPath, name),
    consumes: readProjectConsumeModules(graph, rootPath, name, metadata)
  };

  const outputFile: string = path.join(outputPath, filename);
  writeJsonFile(outputFile, dashboard);
}

/**
 * 
 */
export async function sendDashboardFile(endpoint: string): Promise<void> {
  return;
}