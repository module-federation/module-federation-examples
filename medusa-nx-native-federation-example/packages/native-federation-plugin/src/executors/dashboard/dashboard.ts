import * as path from 'path';
import { existsSync } from 'fs';
import { 
  createPackageJson, 
  readJsonFile,
  writeJsonFile, 
  ProjectGraph 
} from '@nrwl/devkit';
import { PackageJson } from 'nx/src/utils/package-json';
import { NFPDashboardOptions, NFPDashboardOutputFile } from './schema';
import { createGitSha, createVersion, readNxBuildHash } from './version';
import { readProjectDependenciesBy, readProjectDevDependencies, readProjectOverrides } from './graph-deps';
import { readProjectConsumedModules, readProjectExposedModules } from './graph-modules';

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

  const projectPackageJson: PackageJson = createPackageJson(name, graph) || {} as PackageJson;
  const rootPackageJson = (existsSync('package.json') ? readJsonFile('package.json') || {} : {}) as PackageJson;

  const dashboard: NFPDashboardOutputFile = {
    id: name,
    name,
    remote: metadata.remote,
    version: createVersion(versionStrategy),
    sha: createGitSha(),
    buildHash: readNxBuildHash(buildTarget, rootPath),
    environment,
    metadata,
    dependencies: readProjectDependenciesBy('dependencies', rootPath, projectPackageJson),
    devDependencies: readProjectDevDependencies(graph, rootPath, name, projectPackageJson, rootPackageJson),
    optionalDependencies: readProjectDependenciesBy('optionalDependencies', rootPath, projectPackageJson),
    overrides: readProjectOverrides(graph, name, rootPackageJson),
    modules: await readProjectExposedModules(graph, rootPath, name),
    consumes: readProjectConsumedModules(graph, rootPath, name, metadata)
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