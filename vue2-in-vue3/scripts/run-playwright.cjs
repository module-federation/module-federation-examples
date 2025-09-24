#!/usr/bin/env node
const { spawn } = require('node:child_process');
const path = require('node:path');

const cli = require.resolve('@playwright/test/cli');
const aliasHook = path.resolve(__dirname, 'register-playwright-alias.cjs');
const args = process.argv.slice(2);

const child = spawn(process.execPath, ['--require', aliasHook, cli, ...args], {
  stdio: 'inherit',
});

child.on('exit', code => {
  if (code !== null) {
    process.exit(code);
  }
});
