# Server Side Rendering with Different type of styling Example

Module Federation Server Side Rendering example using React Suspense.

This example demonstrates a basic shell application loading remote components and rendering them server side.
With different types of components styling

# Remotes
It combines three different approaches of styling 
1. with plain CSS/(CSS Modules)/Scss/Less/(Tailwind)
2. React-Jss
3. Styled-Components

- There First One `CSS/(CSS Modules)/Scss/Less/(Tailwind)` requires to use `isomorphic-style-loader` and expose `StyleContext`from it from each remote that use it.
So basically each remote application can expose any amount of components styled with `withStyles` and also need to expose single `StyleContext` which is used in this app.
```
        exposes: {
            './Content': './src/Content',
            './LoaderContext': './src/LoaderContext'
        },
```
- For the React-Jss you can expose any amount of components the only required thing is to add `react-jss` into shared and make it singletone
```
        exposes: {
            './Content': './src/Content',
        },
        shared: {
            ...YOUR_SHARED_DEPS,
            "react-jss": {
                singleton: true,
            },
        },
```
- For the Styled-Components you can expose any amount of components the only required thing is to add `styled-components` into shared and make it singleton
```
        exposes: {
            './Content': './src/Content',
            './LoaderContext': './src/LoaderContext'
        },
        shared: {
            ...YOUR_SHARED_DEPS,
            "styled-components": {
                singleton: true,
            },
        },
```

# Shells
Configs:
- `isomorphic-style-loader` styling type only require to consume the remote
- `react-jss` - require to add `react-jss` as a shared singleton to your Shell MF config
- `styled-components` - require to add `styled-components` as a shared singleton to your Shell MF config

Rendering:
Basically there is two main parts of this 
1. Server Side Rendering
2. Application Hydration in runtime

The main SSR related staff of each shell is a `/shell/server/render.js`;
Overall understanding: before you send the response with you SSR html you need to collect all `CSS` that is used inside your application.
For `isomorphic-style-loader` and `react-jss` this could be done through corresponding ContextProviders during the DOM Rendering function call 
and for `styled-components` after DOM Rendering;

- for the `isomorphic-style-loader` you need to provide `insertCss` (which will collect styles into some variable and then those could be added to the response.)
 to each of your consumed `StyleContext`
- for the `react-jss` you need to provide `SheetsRegistry` instance to the `JssProvider` and then you will be able to extract `CSS` from this instance;
- for `styled-components` you need to create `ServerStyleSheet` instance use its method `collectStyles` and after that you will be able to extract style tags with `getStyleTags` method of it.

The main Application Hydration related things could be found in corresponding library official doc:
- `isomorphic-style-loader` - [DOC](https://github.com/kriasoft/isomorphic-style-loader#:~:text=Then%20on%20client%2Dside%20use%20hydrate%20to%20make%20your%20markup%20interactive%3A)
- JSS - [DOC](https://cssinjs.org/server-side-rendering/?v=v10.9.2)
- styled-components -[DOC](https://styled-components.com/docs/advanced#server-side-rendering)


# Examples
- if you are going to consume components styled with `isomorphic-style-loader` you will need to import each `StyleContext` and compose them for your App. 
  There is basic example of React Context Provider composition `ComposeProviders.js` (of course you can use your own)
  For this approach the basic scenario in `render.js` will look something like this
  ```ecmascript 6
    import React from 'react';
    import { renderToString } from 'react-dom/server';
    import App from '../src/components/App';
    // Your Compose Component
    import Compose from '../src/ComposeProviders';
    // Your Array of `isomorphic-style-loader` StyleContext providers
    import providers from '../src/StyleProviders';
    
    export default async function(req, res) {
        const css = new Set();
        // required function that will collect css
        const insertCss = (...styles) => {
            styles.forEach(style => css.add(style._getCss()));
        };
        const combinedProviders = providers.map(p => [p, { value: { insertCss } }]);
    
        const component = renderToString(
          <Compose providers={combinedProviders}>
            <App />
          </Compose>
        );
    
        const html = `<!doctype html>
            <html>
              <head>
                <!--Here we add our collected styles-->
                <style>${[...css].join('')}</style>
              </head>
              <body>
                <div id="root">${component}</div>
                <script async data-chunk="main" src="http://localhost:4001/static/main.js"></script>
              </body>
            </html>`
        res.status(200).send(html);
    };
    ```
- if you are going to consume components styled with `react-jss` you will need to use `JssProvider` and compose it for your App. 
  There is basic example of React Context Provider composition `ComposeProviders.js` (of course you can use your own)
  For this approach the basic scenario in `render.js` will look something like this
  ```ecmascript 6
    import React from 'react';
    import { renderToString } from 'react-dom/server';
    import App from '../src/components/App';
    // Your Compose Component
    import Compose from '../src/ComposeProviders';
    // Jss related
    import {JssProvider, SheetsRegistry} from 'react-jss';
    
    export default async function(req, res) {
        const sheets = new SheetsRegistry();
        const combinedProviders = [[JssProvider, { registry: sheets }]];
    
        const component = renderToString(
          <Compose providers={combinedProviders}>
            <App />
          </Compose>
        );
    
        const html = `<!doctype html>
            <html>
              <head>
                <!--Here we add our collected styles-->
                <style>${sheets.toString()}</style>
              </head>
              <body>
                <div id="root">${component}</div>
                <script async data-chunk="main" src="http://localhost:4001/static/main.js"></script>
              </body>
            </html>`
        res.status(200).send(html);
    };
    ```
- if you are going to consume components styled with `styled-components` you will need to use `ServerStyleSheet` and use it for App Rendering. 
  There is basic example of React Context Provider composition `ComposeProviders.js` (of course you can use your own)
  For this approach the basic scenario in `render.js` will look something like this
  ```ecmascript 6
    import React from 'react';
    import { renderToString } from 'react-dom/server';
    import App from '../src/components/App';
    // Your Compose Component
    import Compose from '../src/ComposeProviders';
    // Styled-components related
    import {ServerStyleSheet} from "styled-components";
    
    export default async function(req, res) {
        const sheet = new ServerStyleSheet();
        const combinedProviders = [];
    
        const component = renderToString(sheet.collectStyles(
          <Compose providers={combinedProviders}>
            <App />
          </Compose>
        ));
        const styleTags = sheet.getStyleTags();
    
        const html = `<!doctype html>
            <html>
              <head>
                <!--Here we add our collected styles-->
                ${styleTags}
              </head>
              <body>
                <div id="root">${component}</div>
                <script async data-chunk="main" src="http://localhost:4001/static/main.js"></script>
              </body>
            </html>`
        res.status(200).send(html);
    };
    ```
  

# Comparison Table

|           Exposed Styling | React |
|--------------------------:|-------|
| Css                       | ✅     |
| Scss                      | ✅     |
| Less                      | ✅     |
| Css Module                | ✅     |
| react-jss                 | ✅     |
| styled-components         | ✅     |
| tailwind css (as module)  | ✅     |


## Running Demo

Run `yarn` to install the dependencies.

Run `yarn build` to build the packages.

Run `yarn serve` in the shell and related expose remotes folders to start the servers.

This will build the packages and serve them.

Expose Remotes
- [localhost:3001](http://localhost:3001/) (STANDALONE CSS-EXPOSE)
- [localhost:3002](http://localhost:3002/) (STANDALONE JSS-EXPOSE)
- [localhost:3003](http://localhost:3003/) (STANDALONE TAILWIND EXPOSE)
- [localhost:3004](http://localhost:3004/) (STANDALONE SCSS-EXPOSE)
- [localhost:3005](http://localhost:3005/) (STANDALONE STYLED-COMPONENT-EXPOSE)
- [localhost:3006](http://localhost:3006/) (STANDALONE CSS-MODULE-EXPOSE)
- [localhost:3007](http://localhost:3007/) (STANDALONE LESS-EXPOSE)

Shells
- [localhost:4000](http://localhost:4000/) (SHELL CSS-JSS)
- [localhost:4000](http://localhost:4001/) (SHELL CSS-SCSS)
- [localhost:4000](http://localhost:4002/) (SHELL JSS-STYLED-COMPONENTS)
- [localhost:4000](http://localhost:4003/) (SHELL JSS-STYLED-COMPONENTS-CSS-MODULE)
- [localhost:4000](http://localhost:4004/) (SHELL LESS-SCSS)
- [localhost:4000](http://localhost:4005/) (SHELL SCSS-TAILWIND)
