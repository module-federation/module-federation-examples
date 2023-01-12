// declare const __non_webpack_require__: NodeRequire;

const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule?.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  import('./server-bootstrap.ts').then(x => x.run());
}
