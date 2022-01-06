const express = require('express');
const chalk = require('chalk');
const initMiddleware = require('./middleware');

const { raw: env } = require('../build/env')();

const app = express();

/**
 * All application expressjs middleware
 */
// likely dont need to track running server since im not stopping express, but webpack.
// might be useful to time the restart for when whatever the current request is complete
let runningServer;
const done = () => {
  runningServer = app.listen(env.PORT, () => {
    console.info(
      `[${new Date().toISOString()}]`,
      chalk.blue(`App is running: 🌎 http://localhost:${env.PORT}`),
    );
  });
};

app.use('/restart', (req, res) => {
  process.on('exit', function () {
    require('child_process').spawn(process.argv.shift(), process.argv, {
      cwd: process.cwd(),
      detached: false,
      stdio: 'inherit',
    });
  });

  res.status = 200;
  res.send();
  res.on('finish', function () {
    console.log('OK response sent, killing and restarting application');

    process.exit();
  });

  //   var wipeCache = require('wipe-webpack-cache');
  //   function resolver(stubs, fileName, module) {
  //     return true
  //   }
  // console.log(__webpack_require__.hmrD);
  // module.hot.dispose()
  // module.hot.invalidate()
  // module.hot.accept(module.id,initMiddleware)
  // module.hot.addStatusHandler(()=>{
  //   return 'ready'
  // })
  // module.hot.addDisposeHandler(()=>{
  //   console.log(module.hot.status())
  // })
  //

  // module.hot.apply(()=>{})
  // wipe everything, except node_modules

  //
  // for (var moduleId in __non_webpack_require__.cache) {
  //   delete __non_webpack_require__.cache[moduleId];
  // }
  //
  // for (var moduleId in require.cache) {
  //   delete require.cache[moduleId];
  // }
  // app.close();
  // const resolved = __non_webpack_require__.resolve('../src/external.js')
  // delete __non_webpack_require__.cache[resolved]
  // delete require.cache[require.resolve('special')]
  //
  // console.log(__non_webpack_require__.cache);
  // delete require.cache[require.resolve('./index')]
  // require('./index');
  //
  // const cpecial = require('special')
  // cpecial()
  // res.status = 200
  // res.end()
});
if (module.hot) {
  // module.hot.dispose(console.log)
  module.hot.accept('./index', () => {
    console.log('is hot reloading');
    // eslint-disable-next-line
    require('./index');
  });
}
console.log('basline app');
initMiddleware(express, app, done);

module.exports = app;
