
// Windows temporarily needs this file, https://github.com/module-federation/vite/issues/68

    const importMap = {
      
        "react": async () => {
          let pkg = await import("__mf__virtual/_mf_0_namespace_mf_1_viteViteRemote__prebuild__react__prebuild__.js")
          return pkg
        }
      ,
        "react/jsx-dev-runtime": async () => {
          let pkg = await import("__mf__virtual/_mf_0_namespace_mf_1_viteViteRemote__prebuild__react_mf_1_jsx_mf_2_dev_mf_2_runtime__prebuild__.js")
          return pkg
        }
      ,
        "react/jsx-runtime": async () => {
          let pkg = await import("__mf__virtual/_mf_0_namespace_mf_1_viteViteRemote__prebuild__react_mf_1_jsx_mf_2_runtime__prebuild__.js")
          return pkg
        }
      ,
        "react-dom/client": async () => {
          let pkg = await import("__mf__virtual/_mf_0_namespace_mf_1_viteViteRemote__prebuild__react_mf_2_dom_mf_1_client__prebuild__.js")
          return pkg
        }
      ,
        "react-dom": async () => {
          let pkg = await import("__mf__virtual/_mf_0_namespace_mf_1_viteViteRemote__prebuild__react_mf_2_dom__prebuild__.js")
          return pkg
        }
      
    }
      const usedShared = {
      
          "react": {
            name: "react",
            version: "18.3.1",
            scope: ["default"],
            loaded: false,
            from: "@namespace/viteViteRemote",
            async get () {
              usedShared["react"].loaded = true
              const {"react": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: false,
              requiredVersion: "18"
            }
          }
        ,
          "react/jsx-dev-runtime": {
            name: "react/jsx-dev-runtime",
            version: "18.3.1",
            scope: ["default"],
            loaded: false,
            from: "@namespace/viteViteRemote",
            async get () {
              usedShared["react/jsx-dev-runtime"].loaded = true
              const {"react/jsx-dev-runtime": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: false,
              requiredVersion: "18"
            }
          }
        ,
          "react/jsx-runtime": {
            name: "react/jsx-runtime",
            version: "18.3.1",
            scope: ["default"],
            loaded: false,
            from: "@namespace/viteViteRemote",
            async get () {
              usedShared["react/jsx-runtime"].loaded = true
              const {"react/jsx-runtime": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: false,
              requiredVersion: "18"
            }
          }
        ,
          "react-dom/client": {
            name: "react-dom/client",
            version: "18.3.1",
            scope: ["default"],
            loaded: false,
            from: "@namespace/viteViteRemote",
            async get () {
              usedShared["react-dom/client"].loaded = true
              const {"react-dom/client": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: false,
              requiredVersion: "^18.3.1"
            }
          }
        ,
          "react-dom": {
            name: "react-dom",
            version: "18.3.1",
            scope: ["default"],
            loaded: false,
            from: "@namespace/viteViteRemote",
            async get () {
              usedShared["react-dom"].loaded = true
              const {"react-dom": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: false,
              requiredVersion: "^18.3.1"
            }
          }
        
    }
      const usedRemotes = [
                {
                  entryGlobalName: "shared",
                  name: "shared",
                  type: "var",
                  entry: "https://shared.js",
                }
          
      ]
      export {
        usedShared,
        usedRemotes
      }
      