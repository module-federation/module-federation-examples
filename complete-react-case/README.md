# react-webpack-MF
A complete Webpack Module Federation Case with React.

一个应用Webpack Module Federation的React项目案例
# project directory
## lib-app
It is a low-level or basic app, which exposes libraries like `react`, `react-dom`. It is a pure `remote`

底层App，暴露了一些库模块：`react`，`react-dom`。它是一个纯粹的remote
## component-app
It is a middle-level app, which depends on modules exposed from `lib-app` : `react` ,`react-dom`. In the meantime, it also exposes components: `Dialog`, `Button` to another app called `main-app`. 

组件层App，依赖`lib-app`暴露的`react`、`react-dom`模块，也暴露了一些组件如对话框`Dialog`、按钮`Button`给另一个app：`main-app`

It is both host and remote.

它既是host也是remote
## main-app
the top-level app, which depends on  `lib-app` and `component-app`.

上层App，依赖`lib-app`和`component-app`应用。

It is a pure host.

它也是一个纯粹host。
# how to use
- `npm install`
- `npx lerna bootstrap`
- `npm run start`
after all the commands done, open your browser at `http://localhost:3002` 
