import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { expect, test } from '@playwright/test';
import { Constants } from '../../../playwright-e2e/fixtures/constants';

test.describe('Typescript Monorepo', () => {
  test('checks example wiring in package.json', async () => {
    const packageJsonPath = path.resolve(
      __dirname,
      '../../..',
      Constants.filesPath.typeScriptMonoRepoPackageJsonPath,
    );

    const packageJsonRaw = await readFile(packageJsonPath, 'utf8');
    expect(packageJsonRaw).toContain(
      Constants.commonPhrases.typeScriptMonoRepoApp.yarnWorkspaceDependency,
    );

    const packageJson = JSON.parse(packageJsonRaw) as { scripts?: Record<string, string> };
    expect(packageJson.scripts?.start || '').toContain('typescript-monorepo_app');
  });
});
