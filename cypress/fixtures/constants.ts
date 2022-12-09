export class Constants {
    public static readonly samplesPath = {
        AdvancedApiAutomaticVendorSharing: 'advanced-api/automatic-vendor-sharing/',
        vue3DemoFederationWithVite: 'vue3-demo-federation-with-vite/',
        i18nextNextjsReact: 'i18next-nextjs-react',
        vue3CliDemo: 'vue3-cli-demo/',
        nested: 'nested',
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
        ],
        nestedApp3Button: 'App 3 Button',
        nestedApp2Container: 'App 2 Container',
        nesterApp1Text: 'app 1 body'
    }

    public static readonly tabsNames = {
        aboutTab: 'About',
        homeTab: 'Home',
    }

    public static readonly commonPhrases = {
        viteGreeting: 'im from Vite',
        webpackGreeting: 'im from Webpack',
        button: 'Button',
        paragraphText: 'The Dynamic System will take advantage Module Federation remotes and exposes. It will no load components that have been loaded already.',
        dynamicRemotesWidgetParagraphText: [
            'Moment shouldn\'t download twice, the host has no moment.js',
            'Using momentjs for format the date'
        ],
        vueCliAppWelcomeMessage: 'Welcome to Your Vue.js + TypeScript App',
        vueCliAppConfigurationMessage: 'For a guide and recipes on how to configure / customize this project, check out the vue-cli documentation.',
        vueCliAppInstalledCliPluginsMessage: 'Installed CLI Plugins',
        vueCliAppEssentialLinksMessage: 'Essential Links',
        vueCliAppEcosystemLinksMessage: 'Ecosystem',
        vueCliAppAboutTabMessage: 'This is an about page'
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
        ],
        aquamarine: 'rgb(127, 255, 212)',
        chineseSilver: 'rgb(204, 204, 204)'
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

    public static readonly hrefs = {
        vueCliAppDocumentationLink: 'https://cli.vuejs.org',
        vueCliAppBabelLink: 'https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel',
        vueCliAppRouterLink: 'https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router',
        vueCliAppVuexLink: 'https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex',
        vueCliAppEsLintLink: 'https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint',
        vueCliAppTypeScriptLink: 'https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-typescript',
        vueCliAppCoreDocsLink: 'https://vuejs.org',
        vueCliAppForumLink: 'https://forum.vuejs.org',
        vueCliAppCommunityChatLink: 'https://chat.vuejs.org',
        vueCliAppTwitterLink: 'https://twitter.com/vuejs',
        vueCliAppNewsLink: 'https://news.vuejs.org',
        vueCliAppVueRouterLink: 'https://router.vuejs.org',
        vueCliAppEcosystemVuexLink: 'https://vuex.vuejs.org',
        vueCliAppVueDevToolsLink: 'https://github.com/vuejs/vue-devtools#vue-devtools',
        vueCliAppVueLoaderLink: 'https://vue-loader.vuejs.org',
        vueCliAppAwesomeVueLink: 'https://github.com/vuejs/awesome-vue',
        vueCliAppAboutTabLink: '#/about',
        vueCliAppHomeTabLink: '#/',
    }
    public static readonly linksNames = {
        vueCliAppDocumentationLinkName: 'vue-cli documentation',
        vueCliAppBabelLinkName: 'babel',
        vueCliAppRouterLinkName: 'router',
        vueCliAppVuexLinkName: 'vuex',
        vueCliAppEsLintLinkName: 'eslint',
        vueCliAppTypeScriptLinkName: 'typescript',
        vueCliAppCoreDocsLinkName: 'Core Docs',
        vueCliAppForumLinkName: 'Forum',
        vueCliAppCommunityChatLinkName: 'Community Chat',
        vueCliAppTwitterLinkName: 'Twitter',
        vueCliAppNewsLinkName: 'News',
        vueCliAppVueRouterLinkName: 'vue-router',
        vueCliAppVueDevtoolsLinkName: 'vue-devtools',
        vueCliAppVueLoaderLinkName: 'vue-loader',
        vueCliAppAwesomeVueLinkName: 'awesome-vue',
    }
}
