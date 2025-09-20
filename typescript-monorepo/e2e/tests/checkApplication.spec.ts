import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { expect, test } from '@playwright/test';
import { Constants } from '../../../playwright-e2e/fixtures/constants';

test.describe('Typescript Monorepo', () => {
  test('checks apps package.json includes yarn workspaces', async () => {
    const packageJsonPath = path.resolve(
      __dirname,
      '../../..',
      Constants.filesPath.typeScriptMonoRepoPackageJsonPath,
    );

    const packageJsonRaw = await readFile(packageJsonPath, 'utf8');
    expect(packageJsonRaw).toContain(
      Constants.commonPhrases.typeScriptMonoRepoApp.yarnWorkspaceDependency,
    );

    const packageJson = JSON.parse(packageJsonRaw) as { workspaces?: unknown };
    expect(Array.isArray(packageJson.workspaces) || typeof packageJson.workspaces === 'object').toBeTruthy();
  });
});
