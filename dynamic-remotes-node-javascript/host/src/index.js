const { loadRemote, init } = require('@module-federation/runtime');
const {performReload, revalidate} = require('@module-federation/node/utils');

console.log('hello from host');

let instance;
let loadedString;
let loadedClass;
let loadedClassInstance;

async function initAndLoad() {
  await performReload(true)

  instance = init({
    name: 'host',
    remotes: [
      {
        name: 'remote',
        entry: 'http://localhost:3002/remoteEntry.js',
      },
    ],
  });


  loadRemote('remote/string').then(value => {
    loadedString = value;
    console.log('loaded string', loadedString);
  });

  loadRemote('remote/class').then(async value => {
    loadedClass = value;
    loadedClassInstance = new value();

    console.log('current loaded class', loadedClass);
    console.log('current loaded class test value', loadedClassInstance.getTestValue());
    console.log('current loaded class run test', await loadedClassInstance.runTest());
  });
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
