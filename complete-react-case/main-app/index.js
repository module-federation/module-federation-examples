const promises = []
__webpack_require__.f.remotes('main',promises);
await Promise.all(promises);
console.log(promises)
const thing = await new Promise((r)=>r('test'))
console.log(thing);
require('./bootstrap');
if(globalThis.neverTrue) {
  // dynamic import data uri
  import('data:text/javascript,export default 42');
}
export default {}
