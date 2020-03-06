# Self-Healing Example

This example demos self-healing capabilities with Module Federation. `app2` depends on and is expecting a shared dependency to be provided in `app1`.

---

In `app2`'s webpack config we are expecting `styled-components` to be a shared dependency with the `app1` host application.

```js
// app1 webpack.config.js
new ModuleFederationPlugin({
    // ...
    shared: ["react", "react-dom"] // note lack of "styled-components"
}),
```

```js
// app2 webpack.config.js
new ModuleFederationPlugin({
    // ...
    shared: ["react", "react-dom", "styled-components"],
}),
```

# Running Demo

Run `yarn start`. This will build and serve both `app1` and `app2` on ports 3001 and 3002 respectively.

- HOST: [localhost:3001](http://localhost:3001/)
- REMOTE: [localhost:3002](http://localhost:3002/)

Notice that the button in both apps are the same even though the host app didn't provide `styled-components` as a dependency. If you open DevTools and checkout the "Network" tab you can see 2 requests were made to `app2`; the remote `<Button />` component and the missing `styled-components` vendor code.
