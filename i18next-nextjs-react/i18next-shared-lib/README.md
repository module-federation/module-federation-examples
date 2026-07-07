This is a quite simple lib giving access to 2 things : i18nService and useInstanceTranslation hook.

# i18nService.ts

## How it works

This service is a singleton, registering i18n instances, and handling language change across all registered instances.

## Useful functions

### switchLanguage

This function basically switch language

### getCurrentLanguage

This function returns the current Language. It is useful to pass the language to libraries such as Luxon.

### getOrCreateI18nInstance

It creates an instance of i18next using an instance name and an I18nAvailableInitOptions object.
I18nAvailableInitOptions is a custom type removing the default options, already set in the service
("initImmediate", "debug", "fallbackLng", "supportedLngs", "interpolation" and "detection").

This I18nAvailableInitOptions is the place to give the resource object containing the translations.

This function is used by the hook to create the instance with the language resource files, or get the existing one.

# useInstanceTranslation.ts

This hook takes two parameters, an instance name, and an i18next.Resource object, and it returns a function taking
a filename in parameter that returns a version of i18next useTranslation(filename) contextualized with the instance
identified with the given instance name and using the given language resources.

<img width="0" height="0" alt="" src="https://www.google-analytics.com/g/collect?v=2&tid=G-DRPXW0EEVT&cid=ae045149-9d17-0367-bbb0-11c41d92b411&en=readme_view&ep.repository=module-federation-examples&ep.example=i18next-nextjs-react&ep.readme_path=i18next-nextjs-react%2Fi18next-shared-lib%2FREADME.md&dl=https%3A%2F%2Fgithub.com%2Fmodule-federation%2Fmodule-federation-examples%2Ftree%2Fmaster%2Fi18next-nextjs-react%2Fi18next-shared-lib&dt=ModuleFederationExamples+i18next-nextjs-react%2Fi18next-shared-lib%2FREADME.md">
