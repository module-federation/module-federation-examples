import { loadRemote, init } from '@module-federation/runtime';
import {performReload, revalidate } from '@module-federation/node/utils';

console.log('hello from host host');

let instance;
let loadedString;
let loadedClass: (new() => any) | null;
let loadedClassInstance;

async function initAndLoad() {
  await performReload(true)

  // here we assign the return value of the init() function, which can be used to do some more complex
  // things with the module federation runtime
  instance = init({
    name: 'host',
    remotes: [
      {
        name: 'remote',
        entry: 'http://localhost:3002/remoteEntry.js',
      },
    ],
  });

  // NOTE - below we use .default as the "export default" style in the remote. This changes
  // based on the remote's export style.
  //
  // Other examples:
  // - using module.exports would not require the .default
  // - using named exports would require the specific export name on the remotely loaded object
  //   (e.g. export class TestClass {} would require loadedObject.TestClass)

  loadedString = (await loadRemote('remote/string') as any).default;
  console.log('loaded string', loadedString);

  loadedClass = (await loadRemote('remote/class') as any).default;
  loadedClassInstance = loadedClass ? new loadedClass() : null;

  console.log('current loaded class', loadedClass);
  console.log('current loaded class test value', loadedClassInstance?.getTestValue());
  console.log('current loaded class run test', await loadedClassInstance?.runTest());
}

initAndLoad();

setInterval(async () => {
  console.log('host(): checking remote for updates');

  // NOTE: this is called the first time an update is detected on the remote and never again
  // NOTE: had to patch hot-reload.js to get this to not throw an error
  // we automatically reset require cache, so the reload callback is only if you need to do something else
  const shouldReload = await revalidate();

  // do something extra after revalidation
  if (shouldReload) {
    // reload the server
    console.log('host(): should reload');
    initAndLoad();
  } else {
    console.log('host(): should not reload');
  }
}, 5000);
