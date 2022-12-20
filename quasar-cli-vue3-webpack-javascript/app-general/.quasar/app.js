/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding startup/initialization code.
 * Use "quasar new boot <name>" and add it there.
 * One boot file per concern. Then reference the file(s) in quasar.config.js > boot:
 * boot: ['file', ...] // do not add ".js" extension to it.
 *
 * Boot files are your "main.js"
 **/



import { Quasar } from 'quasar'
import { markRaw } from 'vue'
import RootComponent from 'app/src/App.vue'


import createRouter from 'app/src/router/index'







export default async function (createAppFn, quasarUserOptions) {
  // Create the app instance.
  // Here we inject into it the Quasar UI, the router & possibly the store.
  const app = createAppFn(RootComponent)

  
  app.config.performance = true
  

  app.use(Quasar, quasarUserOptions)

  

  

  const router = markRaw(
    typeof createRouter === 'function'
      ? await createRouter({})
      : createRouter
  )

  

  // Expose the app, the router and the store.
  // Note that we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return {
    app,
    
    router
  }
}
