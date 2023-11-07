# Quasar cli with Javascript

app-exposes: quasar project which exposes components

app-general: quasar project which consume those components 

## Working
### Step 1
Run app-exposes project first runs on 3001
```bash
cd app-exposes
yarn
quasar dev 
```
### Step 2
Then run app-general project on 3002
```bash
cd app-general
yarn
quasar dev 
```
Note: You may change the port number as you wish but make sure the address is correct while adding a remote.

## Explanation

To setup module federation in a quasar project. We need to do 3 things

### Step 1

To solve [Eager consumption error](https://webpack.js.org/concepts/module-federation/#uncaught-error-shared-module-is-not-available-for-eager-consumption)
```javascript
// In '.quasar' directory, create 'main.js' file and add this line
import('./client-entry');
// client-entry.js file is the default entry point in quasar project and we are invoking it from main.js now
```
and set the new entry point to `main.js` from `quasar.config.js`
```javascript
// in 'quasar.config.js'
extendWebpack(cfg){
    cfg.entry = path.resolve(__dirname, './.quasar/main.js')
}
```
This way we are bootstrapping the application.

### Step 2
Add this link in `quasar.config.js` inside `chainWebpack` function
```javascript
 chainWebpack (chain) {
    // ...
        chain.optimization.delete('splitChunks');
      }
```

### Step 3
Import the `ModuleFederationPlugin` and initialise inside `extendWebpack`
```javascript
 extendWebpack(cfg) {
        cfg.entry = path.resolve(__dirname, './.quasar/main.js') // from step 1
        cfg.plugins.push(
          new ModuleFederationPlugin({
            name: 'app_remote',
            filename: 'remoteEntry.js',
            exposes: {},
            remotes: {},
            shared: {
              ...dependencies,
            }
          }),
        );
      },
```
Now you can start using the plugin!
