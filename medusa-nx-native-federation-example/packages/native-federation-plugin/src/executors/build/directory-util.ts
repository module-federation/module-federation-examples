import { basename, join } from 'path';
import { readdir, lstatSync, rmSync, existsSync, mkdirSync, copyFileSync } from 'fs';

/**
 *
 */
export function cleanDirectoryFiles(directoryPath: string) {
  readdir(directoryPath, (error: NodeJS.ErrnoException, files: string[]) => {
    if (error) {
      return;
    }

    for (const file of files) {
      const filePath = join(directoryPath, file);

      if (lstatSync(filePath).isFile()) {
        rmSync(filePath, { recursive: true, force: true });
      }
    }
  });
}

/**
 *
 */
export function copyDirectory(fromPath: string, toPath: string) {
  if (lstatSync(fromPath).isFile()) {
    copyFileSync(fromPath, join(toPath, basename(fromPath)));
    return;
  }

  if (!existsSync(toPath)) {
    mkdirSync(toPath);
  }

  readdir(fromPath, (error: NodeJS.ErrnoException, files: string[]) => {
    if (error) {
      return;
    }

    for (const file of files) {
      const sourcePath = join(fromPath, file);
      const outputPath = join(toPath, file);

      if (lstatSync(sourcePath).isFile()) {
        copyFileSync(sourcePath, outputPath);
        continue;
      }

      copyDirectory(sourcePath, outputPath);
    }
  });
}
