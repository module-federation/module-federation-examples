import { promisify } from 'util';
import { exec, spawn } from 'child_process';
import { ExecutorContext } from '@nrwl/devkit';
import { NFPServeExecutorOptions } from './schema';

/**
 *
 */
async function executeProjectBuild(
  options: NFPServeExecutorOptions
): Promise<{ stdout: string; stderr: string }> {
  const { buildTarget, watch = false } = options;
  const buildCommand = `
    npx nx run ${buildTarget} --skip-nx-cache ${watch ? '--watch': ''}
  `;

  return promisify(exec)(buildCommand);
}

/**
 *
 */
function executeProjectServe(
  projectName: string,
  options: NFPServeExecutorOptions
): Promise<{ stdout: string; stderr: string }> {
  const { port = 3000 } = options;
  const workspaceDistPath = `dist/${projectName}`;

  return new Promise((resolve, reject) => {
    try {
      const processSpawn = spawn(
        'serve',
        [workspaceDistPath, '-p', `${port}`, `--cors`],
        {
          stdio: 'inherit',
          shell: true,
        }
      );

      ['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach((signal) =>
        process.on(signal, () => {
          processSpawn.unref();
          resolve(null);
        })
      );
    } catch (e) {
      reject(e);
    }
  });
}

/**
 *
 */
export default async function runExecutor(
  options: NFPServeExecutorOptions,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  const { projectName } = context;

  try {
    await executeProjectBuild(options);
  } catch (e) {
    console.error(e);
    throw e;
  }

  try {
    console.log(
      `Nx Native Federation: Server is running on port: ${options.port}`
    );
    await executeProjectServe(projectName, options);
  } catch (e) {
    console.error(e);
    throw e;
  }

  return {
    success: true,
  };
}
