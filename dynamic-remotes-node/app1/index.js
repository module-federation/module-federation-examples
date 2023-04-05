const {injectScript} = require('@module-federation/utilities')
console.log('hello from host app1')
import('fake')
injectScript({
  global: 'app2',
  url: 'http://localhost:3002/remoteEntry.js',
}).then((container)=>{
  console.log(container);
  container.get('./sample').then((sample)=>{
    console.log(sample())
  })
})
