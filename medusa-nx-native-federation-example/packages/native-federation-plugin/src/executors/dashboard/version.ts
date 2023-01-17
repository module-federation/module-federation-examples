import * as path from 'path';
import { existsSync } from 'fs';
import { execSync } from 'child_process';
import { readJsonFile } from '@nrwl/devkit';

/**
 * 
 */
export function createGitSha(): string {
  try {
    return execSync('git rev-parse HEAD')
      .toString()
      .trim();
  } catch (e) {
    throw new Error(`Error occurred while creating git SHA: ${e}`);
  }
}

/**
 * 
 */
export function createVersion(strategy: string): string {
  if (strategy === 'Date') {
    return `${Date.now()}`;
  }

  return createGitSha();
}

/**
 *
 */
export function readNxBuildHash(target: string, rootPath: string): string {
  const cacheFilePath = path.join(rootPath, `./node_modules/.cache/nx/run.json`);

  if (!existsSync(cacheFilePath)) {
    return '';
  }

  const task = readJsonFile(cacheFilePath).tasks
    .find((task) => task.taskId === target);

  return task?.hash || '';
}
