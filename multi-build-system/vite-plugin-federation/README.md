# Vite Plugin Federation

This example demos using @originjs/vite-plugin-federation in 3 variants.



- `vite-to-webpack` is the example for  `vite as remote and webpack as host`.
- `rollup-to-webpack` is the example for  `rollup as remote and webpack as host`.
- `webpack-to-vite` is the example for  `webpack as remote and vite as host`.


# Running each Demo

1. vite-to-webpack,  
  - cd vite-remote, yarn start 
  - cd webpack-host, yarn start

  commands will run host `http://localhost:3001/` and remote `http://localhost:5001/`
  - [localhost:3001](http://localhost:3001/) (Webpack)
  - [localhost:5001](http://localhost:5001/) (Vite)

1. rollup-to-webpack,  
  - cd rollup-remote, yarn start 
  - cd webpack-host, yarn start

  commands will run host `http://localhost:3002/` and remote `http://localhost:5002/`
  - [localhost:3002](http://localhost:3002/) (Webpack)
  - [localhost:5002](http://localhost:5002/) (Vite)

2. webpack-to-vite,  
  - cd vite-host, yarn start 
  - cd webpack-remote, yarn start

  commands will run host `http://localhost:5003/` and remote `http://localhost:3003/`
  - [localhost:3003](http://localhost:3003/) (Webpack)
  - [localhost:5003](http://localhost:5003/) (Vite)


## Usage
Using the `Module Federation` usually requires more than 2 projects, one as the `host side` and one as the `remote side`.
#### Step 1: Configure the remote side.

Note, that for using plugin with webpack need set 

```js
// vite.config.js
import federation from "@originjs/vite-plugin-federation";
export default {
    plugins: [
        federation({
            name: 'remote-app',
            filename: 'remoteEntry.js',
            // Modules to expose
            exposes: {
                './Button': './src/Button.jsx',
            },
            shared: []
        })
    ]
}
```

- for a rollup project, modify `rollup.config.js`:

```js
// rollup.config.js
import federation from '@originjs/vite-plugin-federation'
export default {
    input: 'src/index.js',
    plugins: [
        federation({
            name: 'remote-app',
            filename: 'remoteEntry.js',
            // Modules to expose
            exposes: {
                './Button': './src/Button.jsx'.
            },
            shared: ['vue']
        })
    ]
}
```

#### Step 2: Configure the host side

Note that use Current plugin in host and webpack in remote need set `format: var` 

- for a vite project, modify `vite.config.js`:

```js
// vite.config.js
import federation from "@originjs/vite-plugin-federation";
export default {
    plugins: [
        federation({
          name: 'vite',      
          remotes: {
            nav: {
              external: 'http://localhost:3003/remoteEntry.js',
              format: 'var'
            }
          },
          shared: []
        })
    ]
}
```

- for a rollup project, modify `rollup.config.js`:

```js
// rollup.config.js
import federation from '@originjs/vite-plugin-federation'
export default {
    input: 'src/index.js',
    plugins: [
        federation({
          name: 'rollup',      
          remotes: {
            nav: {
              external: 'http://localhost:3003/remoteEntry.js',
              format: 'var'
            }
          },
          shared: []
        })
    ]
}
```

- for a webpack project, modify `webpack.config.js`, using custom module loaders:

Note that use Current plugin in remote and webpack in host need write custom remote module loader

```js
// webpack.config.js
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
module.export = {
  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      filename: "remoteEntry.js",
      remotes: {
        "my-nav": `promise new Promise((resolve) => {
                    const url = "http://localhost:5001/assets/remoteEntry.js";
                    
                    import(url).then(lib => {
                      const proxy = {
                        get: (request) => lib.get(request),
                        init: (arg) => {
                          try {
                            return lib.init(arg)
                          } catch(e) {
                            console.log('remote container already initialized')
                          }
                        }
                      }
                      resolve(proxy);  
                    })
                  })`,
      },
      shared: {}
    }),
  ]
}
```
