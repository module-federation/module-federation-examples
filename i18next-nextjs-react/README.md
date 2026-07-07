# i18next using module federation

This example shows how to use dedicated instances of i18next in micro frontends.

Every micro frontend must be able to change language from any of them while impacting every single one of them.

# Architecture

This example is made of 4 packages :

- Next-Host
- React-Host
- React-Remote
- I18Next-Shared-lib

## Next-Host

This is a NextJS server, using a dedicated i18next instance for internationalization, showing a single button to change language.
It is using a component exposed by React-Remote.

## React-Host

This is a simple react application, using a dedicated i18next instance for internationalization, showing a single button to change language.
It is using a component exposed by React-Remote.

## React-remote

This is a micro frontend, using a dedicated i18next instance for internationalization, exposing a single component with a button to change language.

## Lib

A shared lib sharing a module to handle i18next instances

["Best Practices, Rules amd more interesting information here](../../playwright-e2e/README.md)

<img width="0" height="0" alt="" src="https://www.google-analytics.com/g/collect?v=2&tid=G-DRPXW0EEVT&cid=ae045149-9d17-0367-bbb0-11c41d92b411&en=readme_view&ep.repository=module-federation-examples&ep.example=i18next-nextjs-react&ep.readme_path=i18next-nextjs-react%2FREADME.md&dl=https%3A%2F%2Fgithub.com%2Fmodule-federation%2Fmodule-federation-examples%2Ftree%2Fmaster%2Fi18next-nextjs-react&dt=ModuleFederationExamples+i18next-nextjs-react%2FREADME.md">
