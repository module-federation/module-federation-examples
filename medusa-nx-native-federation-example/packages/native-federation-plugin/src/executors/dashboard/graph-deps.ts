import { existsSync } from 'fs';
import * as path from 'path';
import { readJsonFile, ProjectGraph } from '@nrwl/devkit';
import { PackageJson } from 'nx/src/utils/package-json';
import { NFPDashboardDependency } from './schema';

/**
 * Reads `version`, `license` options from `package.json`
 */
function readProjectDependency(path: string): Omit<NFPDashboardDependency, 'name'> {
  const { version, license } = (existsSync(path) ? readJsonFile(path) || {} : {}) as PackageJson;
  return { version, license };
}

/**
 * Reads a project npm or workspace dependencies
 */
export async function readProjectDependencies(
  rootPath: string,
  projectPackageJson: PackageJson
): Promise<NFPDashboardDependency[]> {
  const dependencies: [string, string][] = Object.entries(projectPackageJson?.dependencies || {});
  const modules: NFPDashboardDependency[] = [];

  for (const [name] of dependencies) {
    modules.push({
      name,
      ...readProjectDependency(path.join(rootPath, `./node_modules/${name}/package.json`))
    });
  }

  return modules;
}

/**
 * Reads a project npm dev dependencies
 */
export async function readProjectDevDependencies(
  graph: ProjectGraph,
  rootPath: string,
  projectPackageJson: PackageJson
): Promise<NFPDashboardDependency[]> {
  const dependencies: [string, string][] = Object.entries(projectPackageJson?.devDependencies || {});
  const modules: NFPDashboardDependency[] = [];

  for (const [name] of dependencies) {
    modules.push({
      name,
      ...readProjectDependency(path.join(rootPath, `./node_modules/${name}/package.json`))
    });
  }

  //console.log(graph.nodes[projectName].data.targets);
  //console.log(readRootPackageJson());

  return modules;
}

