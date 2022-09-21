// Copy-pasted from https://github.com/angular-architects/module-federation-plugin/blob/main/libs/native-federation-core/src/lib/utils/package-info.ts
import * as fs from 'fs';
import * as path from 'path';

export interface PackageInfo {
  packageName: string;
  entryPoint: string;
  version: string;
  esm: boolean;
}

export interface PartialPackageJson {
  module: string;
  main: string;
}

export function getPackageInfo(
  packageName: string,
  workspaceRoot: string
): PackageInfo | null {
  const projectRoot = workspaceRoot;
  const mainPkgName = getPkgFolder(packageName);

  const mainPkgPath = path.join(projectRoot, 'node_modules', mainPkgName);
  const mainPkgJsonPath = path.join(mainPkgPath, 'package.json');

  if (!fs.existsSync(mainPkgPath)) {
    // TODO: Add logger
    // context.logger.warn('No package.json found for ' + packageName);
    console.warn('No package.json found for ' + packageName);

    return null;
  }

  const mainPkgJson = readJson(mainPkgJsonPath);

  const version = mainPkgJson['version'] as string;
  const esm = mainPkgJson['type'] === 'module';

  if (!version) {
    // TODO: Add logger
    // context.logger.warn('No version found for ' + packageName);
    console.warn('No version found for ' + packageName);

    return null;
  }

  let relSecondaryPath = path.relative(mainPkgName, packageName);
  if (!relSecondaryPath) {
    relSecondaryPath = '.';
  } else {
    relSecondaryPath = './' + relSecondaryPath.replace(/\\/g, '/');
  }

  let cand = mainPkgJson?.exports?.[relSecondaryPath]?.import;
  if (cand) {
    return {
      entryPoint: path.join(mainPkgPath, cand),
      packageName,
      version,
      esm
    };
  }

  cand = mainPkgJson?.exports?.[relSecondaryPath]?.default;
  if (cand) {
    return {
      entryPoint: path.join(mainPkgPath, cand),
      packageName,
      version,
      esm
    };
  }

  cand = mainPkgJson['module'];

  if (cand && relSecondaryPath === '.') {
    return {
      entryPoint: path.join(mainPkgPath, cand),
      packageName,
      version,
      esm: true
    };
  }

  const secondaryPgkPath = path.join(projectRoot, 'node_modules', packageName);
  const secondaryPgkJsonPath = path.join(secondaryPgkPath, 'package.json');
  let secondaryPgkJson: PartialPackageJson | null = null;
  if (fs.existsSync(secondaryPgkJsonPath)) {
    secondaryPgkJson = readJson(secondaryPgkJsonPath);
  }

  if (secondaryPgkJson && secondaryPgkJson.module) {
    return {
      entryPoint: path.join(secondaryPgkPath, secondaryPgkJson.module),
      packageName,
      version,
      esm: true
    };
  }

  cand = path.join(secondaryPgkPath, 'index.mjs');
  if (fs.existsSync(cand)) {
    return {
      entryPoint: cand,
      packageName,
      version,
      esm: true
    };
  }

  if (secondaryPgkJson && secondaryPgkJson.main) {
    return {
      entryPoint: path.join(secondaryPgkPath, secondaryPgkJson.main),
      packageName,
      version,
      esm
    };
  }

  cand = path.join(secondaryPgkPath, 'index.js');
  if (fs.existsSync(cand)) {
    return {
      entryPoint: cand,
      packageName,
      version,
      esm
    };
  }

  // TODO: Add logger
  console.warn('No entry point found for ' + packageName);
  console.warn(
    '  >> Did you confuse dependencies with depDependencies in your package.json or your federation config?'
  );

  return null;
}

function readJson(mainPkgJsonPath: string) {
  return JSON.parse(fs.readFileSync(mainPkgJsonPath, 'utf-8'));
}

function getPkgFolder(packageName: string) {
  const parts = packageName.split('/');

  let folder = parts[0];

  if (folder.startsWith('@')) {
    folder += '/' + parts[1];
  }

  return folder;
}

// const pkg = process.argv[2]
// console.log('pkg', pkg);

// const r = getPackageInfo('D:/Dokumente/projekte/mf-plugin/angular-architects/', pkg);
// console.log('entry', r);