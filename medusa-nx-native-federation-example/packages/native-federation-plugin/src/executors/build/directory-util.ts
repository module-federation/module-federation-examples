import { basename, join } from 'path';
import { lstatSync, rmSync, existsSync, mkdirSync, copyFileSync, readdirSync } from 'fs';

/**
 *
 */
export function isDirectory(directoryPath: string): boolean {
  return lstatSync(directoryPath).isDirectory();
}

/**
 *
 */
export function cleanDirectory(directoryPath: string, ignoreFn?: (filePath: string) => boolean) {
  for (const file of readdirSync(directoryPath)) {
    const filePath = join(directoryPath, file);

    if (ignoreFn && ignoreFn(filePath)) {
      continue;
    }

    rmSync(filePath, { recursive: true, force: true });
  }
}

/**
 *
 */
export function copyDirectory(
  fromPath: string,
  toPath: string,
  ignoreFn?: (sourcePath: string, outputPath: string) => boolean,
  keepFolder = false
) {
  if (!existsSync(fromPath)) {
    return;
  }

  if (lstatSync(fromPath).isFile()) {
    copyFileSync(fromPath, join(toPath, basename(fromPath)));
    return;
  }

  if (keepFolder) {
    toPath = join(toPath, basename(fromPath));
  }

  if (!existsSync(toPath)) {
    mkdirSync(toPath);
  }

  for (const file of readdirSync(fromPath)) {
    const sourcePath = join(fromPath, file);
    const outputPath = join(toPath, file);

    if (ignoreFn && ignoreFn(sourcePath, outputPath)) {
      continue;
    }

    if (lstatSync(sourcePath).isFile()) {
      copyFileSync(sourcePath, outputPath);
      continue;
    }

    copyDirectory(sourcePath, outputPath, ignoreFn, keepFolder);
  }
}
