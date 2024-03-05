const {loadRemote, init} = require('@module-federation/runtime')
console.log('hello from host app1')


init({
  name: 'app1',
  remotes: [
    {
      name:'app2',
      entry: 'http://localhost:3002/remoteEntry.js'
    },
  ]
})


loadRemote('app2/sample').then((sample) => {
  console.log(sample)
});
