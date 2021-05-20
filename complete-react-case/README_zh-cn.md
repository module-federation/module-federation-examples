# react-webpack-MF
[English](./README.md)

一个相对完整的应用`Webpack Module Federation`的React项目案例
# 目录结构
## lib-app
底层App，暴露了一些库模块：`react`，`react-dom`。它是一个纯粹的remote
## component-app
组件层App，依赖`lib-app`暴露的`react`、`react-dom`模块，也暴露了一些组件如对话框`Dialog`、按钮`Button`给另一个app：`main-app`

它既是host也是remote
## main-app
上层App，依赖`lib-app`和`component-app`应用。它也是一个纯粹host。
# 如何使用
- `npm install`
- `npx lerna bootstrap`
- `npm run start`

执行完上述命令，打开浏览器，输入`http://localhost:3002` 查看页面结果。
