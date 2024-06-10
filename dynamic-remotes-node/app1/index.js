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
  if(process.env.TEST) {
    if(sample === 'dynamically consumed from app2') {
      process.exit(0)
    } else {
      process.exit(1)
    }
  }
  console.log(sample)
});
