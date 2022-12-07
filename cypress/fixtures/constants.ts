export class Constants {
    public static readonly samplesPath = {
        AdvancedApiAutomaticVendorSharing: 'advanced-api/automatic-vendor-sharing/',
        vue3DemoFederationWithVite: 'vue3-demo-federation-with-vite/',
        i18nextNextjsReact: 'i18next-nextjs-react'
    }

    public static readonly vueAppButtonTypes = {
        viteType: 'vite',
        webpackType: 'webpack'
    }

    public static readonly elementsText = {
        viteContent: 'Vite Content',
        webpackContent: 'Webpack Content',
        automaticVendorContent: 'Bi-Directional',
        automaticVendorFirstAppName: 'App 1',
        automaticVendorSecondAppName: 'App 2',
        dynamicRemotesHeader: 'Dynamic System Host',
        dynamicRemotesFirstAppName: 'App 1',
        dynamicRemotesSecondAppName: 'App 2',
        dynamicRemotesThirdAppName: 'App 3',
        dynamicRemotesButtonsText: [
            'Load App 2 Widget',
            'Load App 3 Widget',
        ],
        dynamicRemotesWidgetName: [
            'App 2 Widget',
            'App 3 Widget'
        ],
        dynamicRemotesSynchronousImportWidgetName: [
            'App 1 Widget',
            'App 2 Widget'
        ]
    }

    public static readonly commonPhrases = {
        button: 'Button',
        paragraphText: 'The Dynamic System will take advantage Module Federation remotes and exposes. It will no load components that have been loaded already.',
        viteGreeting: 'im from Vite',
        webpackGreeting: 'im from Webpack',
        dynamicRemotesWidgetParagraphText: [
            'Moment shouldn\'t download twice, the host has no moment.js',
            'Using momentjs for format the date'
        ]
    }

    public static readonly commonText = {
        button: 'Button',
        background: 'background',
        widget: 'Widget'
    }

    public static readonly color = {
        red: 'rgb(136, 0, 0)',
        blue: 'rgb(0, 0, 204)',
        dynamicRemotesWidgetColor: [
            'rgb(255, 0, 0)',
            'rgb(128, 0, 128)'
        ]
    }

    public static readonly translation = {
        reactRemoteTitleEn: 'React Remote : Title',
        reactRemoteButtonEn: 'React Remote : change language',
        reactRemoteTextEn: 'React Remote : I\'m the remote child !',
        reactRemoteTitleFr: 'React Remote : Titre',
        reactRemoteButtonFr: 'React Remote : changer la langue',
        reactRemoteTextFr: 'React Remote : Je suis le remote child',
        reactHostButtonEn: 'React Host : change language',
        reactHostTextEn: 'React Host : This is the main text',
        reactHostTitleEn: 'React Host : Here\'s my micro frontend remote child :',
        reactHostButtonFr: 'React Host : changer la langue',
        reactHostTextFr: 'React Host : Ceci est le texte principal',
        reactHostTitleFr: 'React Host : Voici mon micro frontend remote child :',
        nextHostButtonEn: 'change language from Next Host',
        nextHostTextEn: 'This is the main text of Next Host',
        nextHostTitleEn: 'Here\'s my micro frontend remote child :',
        nextHostButtonFr: 'changer la langue depuis from Next Host',
        nextHostTextFr: 'Ceci est le texte principal de Next Host',
        nextHostTitleFr: 'Voici mon micro frontend remote child :',
    }
}
