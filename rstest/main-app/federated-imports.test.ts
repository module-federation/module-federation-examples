import { expect, test } from '@rstest/core';

test.skip('can import app code that uses federated module specifiers', async () => {
  // App transitively loads federated imports:
  // - component-app/Button, Dialog, ToolTip
  // With Module Federation configured in `rstest.config.ts` and remotes online,
  // this should load naturally (no mocks).
  const mod = await import('./App.jsx');
  expect(typeof mod.default).toBe('function');
});
