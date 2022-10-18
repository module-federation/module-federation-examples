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
