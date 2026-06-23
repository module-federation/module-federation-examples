<div align="center">
  <h1>
    Playwright e2e<br />
    (Module Federation Examples)
  </h1>
  <p>
    <a href="https://github.com/module-federation/module-federation-examples/actions/workflows/on-pull-request.yml">
      <img src="https://github.com/module-federation/module-federation-examples/actions/workflows/on-pull-request.yml/badge.svg" />
    </a>
  </p>
</div>

## Structure

```
playwright-e2e
├── common
│   ├── base.ts
│   ├── basePage.ts
│   ├── selectors.ts
│   └── testFixtures.ts
├── fixtures
│   ├── constants.ts
│   ├── commonTestData.ts
│   └── nextjsSsr.json
├── helpers
│   ├── base-helper.ts
│   └── file-actions-helper.ts
├── types
│   ├── cssAttr.ts
│   ├── dates.ts
│   ├── requestsTypes.ts
│   └── stubTypes.ts
└── results (optional)
```

- `common` holds reusable test helpers and selectors.
- `fixtures` contains shared test data.
- `helpers` contains utilities for data generation and file operations.
- `types` contains enums and shared types used by tests.
- `results` is used by reporters when enabled (optional).

## Run tests

All commands should be executed from the repo root.

### Interactive

```bash
pnpm exec playwright test --ui
```

### Headless

```bash
pnpm exec playwright test --reporter=list
```

### Run a single sample

Most samples include a Playwright config in the sample directory:

```bash
pnpm exec playwright test --config <sample>/playwright.config.ts
```

Or via the sample script:

```bash
pnpm --filter <sample-name> e2e:ci
```

## Writing tests

Use Playwright's test runner and shared helpers from `playwright-e2e`.

```ts
import { test } from '@playwright/test';
import { BaseMethods } from '../../playwright-e2e/common/base';

// Example
// test('does something', async ({ page }) => {
//   const base = new BaseMethods(page);
//   await base.openLocalhost({ number: 3000 });
// });
```

When adding reusable helpers, place them in `playwright-e2e/common/base.ts`.
