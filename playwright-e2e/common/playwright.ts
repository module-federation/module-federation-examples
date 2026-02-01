import path from 'node:path';
import { createRequire } from 'node:module';

const requireBase =
  process.env.npm_package_json ??
  (process.env.PNPM_SCRIPT_SRC_DIR ? path.join(process.env.PNPM_SCRIPT_SRC_DIR, 'package.json') : null) ??
  path.join(process.cwd(), 'package.json');

const requireFromCwd = createRequire(requireBase);

export const playwrightTest = requireFromCwd('@playwright/test') as typeof import('@playwright/test');
export const test = playwrightTest.test;
export const expect = playwrightTest.expect;
