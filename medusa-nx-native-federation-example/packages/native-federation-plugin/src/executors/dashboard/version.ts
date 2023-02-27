import * as path from 'path';
import { existsSync } from 'fs';
import { execSync } from 'child_process';
import { readJsonFile } from '@nrwl/devkit';
import { NFPDashboardVersionStrategy, NFPDashboardOutputFile } from './schema';

/**
 * Defines a version specifier for an app build
 */
export function createVersion(strategy: NFPDashboardVersionStrategy, dashboard: NFPDashboardOutputFile): string {
  strategy = strategy.trim() as NFPDashboardVersionStrategy;

  if (strategy === 'Date') {
    return `${Date.now()}`;
  }

  if (strategy === 'BuildHash') {
    return dashboard.buildHash;
  }

  if (strategy === 'GitSha') {
    return dashboard.sha;
  }

  return strategy;
}

/**
 * Generates the git commit hash as the version specifier
 */
export function createGitSha(): string {
  try {
    return execSync('git rev-parse HEAD')
      .toString()
      .trim();
  } catch (e) {
    throw new Error(`Error occurred while creating Git SHA version specifier: ${e}`);
  }
}

/**
 * Reads the Nx unique build hash generated for each compile as the version specifier
 */
export function readNxBuildHash(target: string, rootPath: string): string {
  const cacheNxFile = path.join(rootPath, `./node_modules/.cache/nx/run.json`);

  if (!existsSync(cacheNxFile)) {
    throw new Error(`Cache Nx file ${cacheNxFile} not found`);
  }

  const task: { hash: string } = readJsonFile(cacheNxFile).tasks
    ?.find((t) => t.taskId === target);

  if (!task || !task.hash) {
    throw new Error(`Error occurred while reading Nx Build Hash version specifier`);
  }

  return task.hash;
}
