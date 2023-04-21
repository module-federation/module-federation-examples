import * as path from 'path';
import { existsSync } from 'fs';
import fetch from 'cross-fetch';
import {
  createPackageJson,
  readJsonFile,
  writeJsonFile,
  ProjectGraph
} from '@nrwl/devkit';
import { PackageJson } from 'nx/src/utils/package-json';
import { NFPDashboardOptions, NFPDashboardOutputFile, NFPDashboardVersionStrategy } from './schema';
import { createGitSha, createVersion, readNxBuildHash } from './version';
import { readProjectDependenciesBy, readProjectDevDependencies, readProjectOverrides } from './graph-deps';
import { readProjectConsumedModules, readProjectExposedModules } from './graph-modules';
import { copyDirectory, isDirectory } from '../build/directory-util';
//import { writeRemoteEntryVersionFile } from './remote-entry';

/**
 *
 */
export async function buildDashboardFile(
  graph: ProjectGraph,
  options: NFPDashboardOptions
): Promise<NFPDashboardOutputFile> {
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
    version: null,
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

  dashboard.version = createVersion(versionStrategy as NFPDashboardVersionStrategy, dashboard);

  const outputVersionPath = `./version-${dashboard.version}`;
  const outputDirectoryPath: string = path.join(outputPath, '/');
  const outputVersionDirectoryPath = path.join(outputDirectoryPath, outputVersionPath);

  try {
    copyDirectory(
      outputDirectoryPath,
      outputVersionDirectoryPath,
      (filePath) => isDirectory(filePath) && filePath.includes('version-')
    );
  } catch (e) {
    throw new Error(`Failed to create Dashboard version '${outputVersionDirectoryPath}': ${e}`)
  }

  //writeRemoteEntryVersionFile(outputVersionDirectoryPath, outputVersionPath);

  const outputFile: string = path.join(outputPath, filename);
  writeJsonFile(outputFile, dashboard);

  return dashboard;
}

/**
 *
 */
export async function sendDashboardFile(endpoint: string, dashboard: NFPDashboardOutputFile): Promise<void> {
  try {
    const response: Response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(dashboard),
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
  } catch (e) {
    throw new Error(e);
  }
}