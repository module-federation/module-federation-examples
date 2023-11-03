// top level await based
const promises = []
__webpack_require__.f.remotes('main',promises);
await Promise.all(promises);
console.log(promises)
const thing = await new Promise((r)=>r('test'))
console.log(thing);


if(globalThis.neverTrue) {
  // dynamic import data uri
  import('data:text/javascript,export default 42');
}
export default {}


// promise based


// const promises = []
// __webpack_require__.f.remotes('main',promises);

// const exportedModule = Promise.all(promises).then(()=>{
//   // can also be
//   // return require('./bootstrap')
//   return import(/* webpackMode: "eager" */'./bootstrap');
// })
// import(/* webpackMode: "eager" */'./bootstrap');
// if(globalThis.neverTrue) {
//   // dynamic import data uri
//   import('data:text/javascript,export default 42');
// }
// export default exportedModule
