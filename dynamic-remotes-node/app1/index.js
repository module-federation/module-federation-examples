const {injectScript, getModule} = require('@module-federation/utilities')
console.log('hello from host app1')
// fake import needed in order to tell webpack to include chunk loading runtime code
import('fake')
injectScript({
  global: 'app2',
  url: 'http://localhost:3002/remoteEntry.js',
}).then((container) => {
  console.log(container);
  container.get('./sample').then((sample) => {
    console.log(sample())
  })
})

getModule({
  remoteContainer: {
    global: 'app2',
    url: 'http://localhost:3002/remoteEntry.js',
  },
  modulePath: './sample'
}).then((sample) => {
  console.log(sample)
});
