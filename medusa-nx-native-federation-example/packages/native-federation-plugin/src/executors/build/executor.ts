import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { exec } from 'child_process';
import { ExecutorContext } from '@nrwl/devkit';
import { NFPBuildExecutorOptions } from './schema';
import { NFPWorkspacePaths, getWorkspacePaths } from './build';

/**
 * Creates a builder name for a specific project
 */
const NFP_PROJECT_BUILDER_NAME = (projectName: string): string => {
  return `${projectName}-build`;
};

/**
 * Creates the file which contains Typescript code to execute the native federation build
 * for a specific project
 * Example: dist/remote-build.ts
 */
function createProjectBuilderTsFile(workspace: NFPWorkspacePaths) {
  const { workspaceRootPath, workspaceDistPath, projectName } = workspace;
  const builderOutputTsFile = path.join(
    workspaceDistPath,
    `./${NFP_PROJECT_BUILDER_NAME(projectName)}.ts`
  );

  const builderTypescript = `
    import { executeProjectBuild } from './build';
    executeProjectBuild('${workspaceRootPath}', '${workspaceDistPath}', '${projectName}');
  `;

  fs.mkdirSync(workspaceDistPath, { recursive: true });
  fs.writeFileSync(builderOutputTsFile, builderTypescript, {
    encoding: 'utf8',
    flag: 'w',
  });
}

/**
 * Removes Typescript file which was created by `createProjectBuilderTsFile(..)`
 */
function removeProjectBuilderTsFile(workspace: NFPWorkspacePaths) {
  const { workspaceDistPath, projectName } = workspace;
  const builderOutputTsFile = path.join(
    workspaceDistPath,
    `./${NFP_PROJECT_BUILDER_NAME(projectName)}.ts`
  );

  if (fs.existsSync(builderOutputTsFile)) {
    fs.unlinkSync(builderOutputTsFile);
  }
}

/**
 *
 */
async function compileCommonBuilderTsFile(
  workspace: NFPWorkspacePaths
): Promise<{ stdout: string; stderr: string }> {
  const { workspaceDistPath } = workspace;
  const builderTsFile = path.join(__dirname, './build.ts');
  const bundleBuilderTsFileCommand = `
    npx tsc --skipLibCheck ${builderTsFile} --outDir ${workspaceDistPath}
  `;

  return promisify(exec)(bundleBuilderTsFileCommand);
}

/**
 *
 */
async function compileAndRunProjectBuilderFiles(
  workspace: NFPWorkspacePaths
): Promise<{ stdout: string; stderr: string }> {
  const { workspaceDistPath, projectName } = workspace;
  const builderOutputTsFile = path.join(
    workspaceDistPath,
    `./${NFP_PROJECT_BUILDER_NAME(projectName)}.ts`
  );
  const builderOutputJsFile = path.join(
    workspaceDistPath,
    `./${NFP_PROJECT_BUILDER_NAME(projectName)}.js`
  );
  const bundleAndRunCommand = `
    npx tsc --skipLibCheck ${builderOutputTsFile} --outDir ${workspaceDistPath} && node ${builderOutputJsFile}
  `;

  return promisify(exec)(bundleAndRunCommand);
}

/**
 * Nx Local Executor entry function
 */
export default async function runExecutor(
  options: NFPBuildExecutorOptions,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  const { root, projectName } = context;
  const { outputPath } = options;
  const workspace: NFPWorkspacePaths = getWorkspacePaths(root, outputPath, projectName);

  console.log(`Nx Native Federation: Building`);

  try {
    await compileCommonBuilderTsFile(workspace);
  } catch (e) {
    console.error(e);
    throw e;
  }

  createProjectBuilderTsFile(workspace);

  try {
    await compileAndRunProjectBuilderFiles(workspace);
    removeProjectBuilderTsFile(workspace);
  } catch (e) {
    console.error(e);
    throw e;
  }

  console.log(`Nx Native Federation: Built successfully`);

  return { success: true };
}
