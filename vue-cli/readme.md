# Module Federation example for vue-cli

> a.k.a Vue 2.

- Consumer: the main app, shell, root module.
- Core: the components that are used.
- Other: another app of importedinside consumer

## Running

- Run
  - `yarn`
  - `yarn serve`
- Build
  - `yarn build`
- Run builded app
  - `yarn start`

---

The project has `bootstrap.js` files as well as `shared: ` option at vue config. It means you can import any uikit or other libraries you want and share then between the micro frontends.
