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
import { PackageJson } from 'nx/src/utils/package-json';
import { checkAndCleanWithSemver } from 'nx/src/utils/version-utils';
import { NFPDashboardDependency, NFPDashboardOverrideModule } from './schema';

/**
 * Reads `version`, `license` options from `package.json`
 */
function readProjectDependency(path: string): Omit<NFPDashboardDependency, 'name'> {
  const { version, license } = (existsSync(path) ? readJsonFile(path) || {} : {}) as PackageJson;
  return { version, license };
}

/**
 * Reads a project npm dependencies by a property name
 * Link to https://docs.npmjs.com/cli/v9/configuring-npm/package-json#optionaldependencies
 */
export function readProjectDependenciesBy(
  dependenciesType: string,
  rootPath: string,
  projectPackageJson: PackageJson & { optionalDependencies?: Record<string, string> }
): NFPDashboardDependency[] {
  const dependencies: string[] = Object.keys(projectPackageJson[dependenciesType] || {});
  const modules: NFPDashboardDependency[] = [];

  for (const name of dependencies) {
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

    if (target.project.startsWith('@nrwl')) {
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
export function readProjectDevDependencies(
  graph: ProjectGraph,
  rootPath: string,
  projectName: string,
  projectPackageJson: PackageJson,
  rootPackageJson: PackageJson
): NFPDashboardDependency[] {
  const project = graph.nodes[projectName];
  const projectRootPath = project.data.root;
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

/**
 * Checks if npm package exists in a PackageJson object by name
 */
function hasDependencyByName(
  name: string,
  packageJson: PackageJson & { optionalDependencies?: Record<string, string> }
) {
  const dependencies = packageJson?.dependencies || {};
  const devDependencies = packageJson?.devDependencies || {};
  const optionalDependencies = packageJson?.optionalDependencies || {};

  return dependencies[name] || devDependencies[name] || optionalDependencies[name];
}

/**
 * Reads a project npm dependencies which are redeclared or differ with a version from the root dependencies
 */
export function readProjectOverrides(
  graph: ProjectGraph,
  projectName: string,
  rootPackageJson: PackageJson & { optionalDependencies?: Record<string, string> }
): NFPDashboardOverrideModule[] {
  const project = graph.nodes[projectName];
  const projectRootPath = project.data.root;
  const projectPackageJsonPath = path.join(projectRootPath, './package.json');
  const projectPackageJson = (
    existsSync(projectPackageJsonPath) ? readJsonFile(projectPackageJsonPath) || {} : {}
  ) as PackageJson;

  const dependencies: string[] = Object.keys(projectPackageJson?.dependencies || {});
  const modules: NFPDashboardOverrideModule[] = [];

  for (const name of dependencies) {
    if (hasDependencyByName(name, rootPackageJson)) {
      const version = projectPackageJson.dependencies[name];
      const cleanVersion = checkAndCleanWithSemver(name, version);

      if (cleanVersion) {
        modules.push({
          id: name,
          name,
          version: cleanVersion,
          location: name,
          applicationID: projectName
        });
      }
    }
  }

  return modules;
}