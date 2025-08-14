# react-webpack-MF

[English](./README.md)

一个相对完整的应用`Webpack Module Federation`的 React 项目案例

# 目录结构

## lib-app

底层 App，暴露了一些库模块：`react`，`react-dom`。它是一个纯粹的 `remote`。

## component-app

组件层 App，依赖`lib-app`暴露的`react`、`react-dom`模块，也暴露了一些组件如对话框`Dialog`、按钮`Button`给另一个 app：`main-app`

它既是 `host` 也是 `remote`。

## main-app

上层 App，依赖`lib-app`和`component-app`应用。它也是一个纯粹的 `host`。

# 如何使用

- `pnpm install`
- `pnpm run start`

执行完上述命令，打开浏览器，输入 `http://localhost:3002` 查看页面结果。

# 运行 Cypress E2E 测试

- 在仓库根目录运行 `pnpm run cypress:debug` 可以以交互模式运行测试。想了解更多内容，可参阅[《如何运行测试》](../../cypress-e2e/README.md#how-to-run-tests)。
- 构建应用并在无界面模式下运行测试，可执行 `pnpm run e2e:ci`。如果测试失败，Cypress 会在示例根目录下创建 `cypress` 目录，包含截图和视频。

[最佳实践、规则和更多信息请参阅](../../cypress-e2e/README.md)
