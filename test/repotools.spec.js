const fs = require('fs');
const os = require('os');
const path = require('path');

test('getPackages only traverses the requested directory', async () => {
  jest.spyOn(console, 'log').mockImplementation(() => {});

  const { getPackages } = require('../repotools');
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'repotools-'));
  const runtimeExample = path.join(tmpDir, 'runtime-plugins', 'example');
  const siblingExample = path.join(tmpDir, 'other-example');

  fs.mkdirSync(runtimeExample, { recursive: true });
  fs.mkdirSync(siblingExample, { recursive: true });

  fs.writeFileSync(
    path.join(runtimeExample, 'package.json'),
    `${JSON.stringify({
      devDependencies: {
        '@module-federation/runtime': '2.0.1',
      },
    })}\n`,
  );
  fs.writeFileSync(
    path.join(siblingExample, 'package.json'),
    `${JSON.stringify({
      devDependencies: {
        '@module-federation/runtime': '2.0.1',
      },
    })}\n`,
  );

  global.fetch = jest.fn(async url => ({
    json: async () => ({ version: url.includes('@module-federation') ? '9.9.9' : '1.0.0' }),
  }));

  const results = await getPackages(path.join(tmpDir, 'runtime-plugins'));

  expect(results['@module-federation/runtime']).toEqual([
    path.join(tmpDir, 'runtime-plugins', 'example'),
  ]);
  const runtimePackage = JSON.parse(fs.readFileSync(path.join(runtimeExample, 'package.json'), 'utf8'));
  const siblingPackage = JSON.parse(fs.readFileSync(path.join(siblingExample, 'package.json'), 'utf8'));

  expect(runtimePackage.devDependencies['@module-federation/runtime']).toBe('9.9.9');
  expect(siblingPackage.devDependencies['@module-federation/runtime']).toBe('2.0.1');
});
