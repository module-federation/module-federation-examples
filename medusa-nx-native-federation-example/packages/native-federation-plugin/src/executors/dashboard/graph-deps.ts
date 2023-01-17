import { existsSync } from 'fs';
import * as path from 'path';
import { 
  createPackageJson,
  readJsonFile,
  getDependentPackagesForProject,
  readRootPackageJson,
  ProjectGraph, 
  WorkspaceLibrary,
  readNxJson
} from '@nrwl/devkit';
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
  graph: ProjectGraph,
  rootPath: string,
  projectName: string
): Promise<NFPDashboardDependency[]> {
  const projectPackageConfig: PackageJson = createPackageJson(projectName, graph);
  const dependencies: [string, string][] = Object.entries(projectPackageConfig.dependencies);
  const modules: NFPDashboardDependency[] = [];

  for (const [name] of dependencies) {
    modules.push({
      name,
      ...readProjectDependency(path.join(rootPath, `./node_modules/${name}/package.json`))
    });
  }

  // const workspaceDependencies: WorkspaceLibrary[] = getDependentPackagesForProject(graph, projectName).workspaceLibraries;

  // for (const {name, root} of workspaceDependencies) {
  //   modules.push({
  //     name,
  //     ...readProjectDependency(path.join(rootPath, `${root}/package.json`))
  //   });
  // }

  return modules;
}

/**
 * Reads a project npm dev dependencies
 */
export async function readProjectDevDependencies(
  graph: ProjectGraph,
  rootPath: string,
  projectName: string
): Promise<NFPDashboardDependency[]> {
  const projectPackageConfig: PackageJson = createPackageJson(projectName, graph);
  const dependencies: [string, string][] = Object.entries(projectPackageConfig.devDependencies);
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

