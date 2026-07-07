# React in Vue - Module Federation Demo

This demo is a simple proof of concept approach for fetching a React component from a _"remote"_ React app and mounting it within a Vue _"host"_ app using module federation.

The Vue app fetches and renders a **React button which can be used to increment a counter controlled by Vue**. The button text can be manipulated via a text input and it can also be unmounted/mounted using a checkbox.

This illusatrates that the approach used allows communication to-and-fro Vue and React, as well as correctly handling React lifecycle hooks when the host app unmounts the parent component.

---

## Running

Install dependencies

`yarn`

Then run development servers with

`pnpm run start`

This will build and serve both `home` and `layout` on ports `3002` and `3001` respectively.

- Host (layout, Vue app): [localhost:3001](http://localhost:3001/)
- Remote (home, React app): [localhost:3002](http://localhost:3002/)

["Best Practices, Rules amd more interesting information here](../../playwright-e2e/README.md)

<img width="0" height="0" alt="" src="https://www.google-analytics.com/g/collect?v=2&tid=G-DRPXW0EEVT&cid=ae045149-9d17-0367-bbb0-11c41d92b411&en=readme_view&ep.repository=module-federation-examples&ep.example=react-in-vue&ep.readme_path=react-in-vue%2FREADME.md&dl=https%3A%2F%2Fgithub.com%2Fmodule-federation%2Fmodule-federation-examples%2Ftree%2Fmaster%2Freact-in-vue&dt=ModuleFederationExamples+react-in-vue%2FREADME.md">
