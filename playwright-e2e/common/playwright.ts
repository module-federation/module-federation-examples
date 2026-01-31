import path from 'node:path';
import { createRequire } from 'node:module';

const requireFromCwd = createRequire(path.join(process.cwd(), 'package.json'));

export const playwrightTest = requireFromCwd('@playwright/test') as typeof import('@playwright/test');
export const test = playwrightTest.test;
export const expect = playwrightTest.expect;
