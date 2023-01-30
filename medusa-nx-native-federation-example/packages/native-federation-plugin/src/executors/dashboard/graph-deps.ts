import { existsSync } from 'fs';
import * as path from 'path';
import { 
  readJsonFile,
  parseTargetString, 
  ProjectGraph, 
  ProjectGraphProjectNode, 
  TargetConfiguration,
  Target 
} from '@nrwl/devkit';
import { NFPDashboardDependency } from './schema';
import { PackageJson } from 'nx/src/utils/package-json';

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
 * Detects if a project uses Typescript and returns the posible Ts packages
 */
function getTypescriptPresets(projectRootPath: string): string[] {
  return existsSync(path.join(projectRootPath, 'tsconfig.json')) 
    ? ['typescript', 'ts-node']
    : [];
}

/**
 * Detects if a project has React pereset
 */
function isReactApplicationPreset(rootPath: string, projectRootPath: string): boolean {
  if (existsSync(path.join(rootPath, `./node_modules/@nrwl/react/package.json`))) {
    const babelRcPath = path.join(projectRootPath, `.babelrc`);

    if (existsSync(babelRcPath)) {
      return readJsonFile(babelRcPath)?.presets.some((preset) => {
        return preset[0].startsWith('@nrwl/react');
      });
    }
  }

  return false;
}

/**
 * Get the packages which contains a provided name
 */
function getDevDependenciesByName(packageName: string, packageJson: PackageJson): string[] {
  return Object.keys(packageJson?.devDependencies || {})
    .filter((dependency) => dependency.includes(packageName));
}

/**
 * Reads a project `project.json` file to collect the target packages
 */
function readProjectJsonPackages(project: ProjectGraphProjectNode, projectPackageJson: PackageJson) {
  let dependencies: string[] = [];

  const projectTargets: 
    {[targetName: string]: TargetConfiguration<unknown>} = project.data.targets;

  for (const targetName of Object.keys(projectTargets)) {
    const target: Target = parseTargetString(projectTargets[targetName].executor);
    dependencies.push(target.project);

    if (target.project.includes('@nrwl')) {
      dependencies = [
        ...dependencies,
        ...getDevDependenciesByName(target.target, projectPackageJson)
      ];
    }
  }

  return dependencies;
}

/**
 * Reads a project npm dev dependencies
 */
export async function readProjectDevDependencies(
  graph: ProjectGraph,
  rootPath: string,
  projectName: string,
  projectPackageJson: PackageJson
): Promise<NFPDashboardDependency[]> {
  const project = graph.nodes[projectName];
  const projectRootPath = project.data.root;
  const rootPackageJson = (existsSync('package.json') ? readJsonFile('package.json') || {} : {}) as PackageJson;
  const isReactPreset: boolean = isReactApplicationPreset(rootPath, projectRootPath);

  const dependencies = [...new Set([
    'nx',
    'esbuild',
    'cypress',
    '@nrwl/devkit',
    '@nrwl/js',
    '@nrwl/workspace',
    ...getTypescriptPresets(projectRootPath),
    ...isReactPreset
      ? getDevDependenciesByName('react', rootPackageJson)
      : [],
    ...getDevDependenciesByName('@swc', rootPackageJson),
    ...readProjectJsonPackages(project, rootPackageJson),
    ...Object.keys(projectPackageJson?.devDependencies || {}) || []
  ])]
  .sort();

  const modules: NFPDashboardDependency[] = [];

  for (const name of dependencies) {
    modules.push({
      name,
      ...readProjectDependency(path.join(rootPath, `./node_modules/${name}/package.json`))
    });
  }

  return modules;
}

