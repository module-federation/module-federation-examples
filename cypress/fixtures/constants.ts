export class Constants {
    public static readonly samplesPath = {
        AdvancedApiAutomaticVendorSharing: 'advanced-api/automatic-vendor-sharing/',
        vue3DemoFederationWithVite: 'vue3-demo-federation-with-vite/',
        i18nextNextjsReact: 'i18next-nextjs-react',
        vue3CliDemo: 'vue3-cli-demo/',
        nested: 'nested',
        nextjsReact: 'nextjs-react',
        typeScriptMonoRepoPackageJsonPath: 'typescript-monorepo/package.json',
        selfHealingApp1WebpackConfigPath: 'self-healing/app1/webpack.config.js',
        selfHealingApp2WebpackConfigPath: 'self-healing/app2/webpack.config.js',
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
        basicHostRemoteFirstAppName: 'App 1',
        basicHostRemoteSecondAppName: 'App 2',
        basicHostRemoteHeader: 'Basic Host-Remote',
        basicHostRemoteButton: 'App 2 Button',
        nestedApp3Button: 'App 3 Button',
        nestedApp2Container: 'App 2 Container',
        nesterApp1Text: 'app 1 body',
        vue2AppButtonText: 'vue2 button click',
        mdmfShell: { name: 'MDMF SHELL', path: 'home' },
        mdmfProfile: { name: 'MDMF PROFILE', path: 'profile' },
        mdmfNavigationItemLogo: { link: 'http://mellondev.net', targetBlank: '_blank', index: 1 },
        mdfmShellHeader: 'Microfrontend Shell',
        mdfmProfileHeader: 'Profile (Microfrontend)',
        mdmfSharedHeader: 'Component from shared module',
        mdmfAppTableHeader: 'List users from the shared application state',
        mdmfTableRowName: { name: 'Name', index: 0 },
        mdmfTableRowEmail: { name: 'Email', index: 1},
        mdmfTableRowAction: { name: 'Action', index: 2},
        typescriptProjectReferencesAppsButtonText: 'App 2 Button',
        selfHealingAppButtonText: '💅 Button',
        sharedContextApp1H1: 'Context Provider',
        sharedContextApp1H2: 'App 1',
        sharedContextApp2H2: 'App 2',
        sharedContextApp1Paragraph: 'Welcome, Billy',
        sharedContextApp2Paragraph: 'Welcome, Susan'
    }

    public static readonly tabsNames = {
        aboutTab: 'About',
        homeTab: 'Home',
        mdmfNavigationItemHome: { name: 'Home', index: 1 },
        mdmfNavigationItemProfile: { name: 'Profile', index: 2 },
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
        vueCliAppAboutTabMessage: 'This is an about page',
        mdmfShellWelcome: 'Welcome to the Angular 11 Microfrontend demo using Webpack 5 Module Federation',
        mdmfShellParagraph: 'This component is part of the shell application, the Profile component that is linked from the `Profile` link at the top is a Microfrontend that is remotely loaded into the application. Check the network settings to see the remote being loaded.',
        mdmfProfileParagraph: 'This profile component is being remotely loaded into the application using Module Federation, angular is shared so the download is minimal for the frontend',
        mdmfSharedParagraph: 'mdmf-shared works!',
        name: { text: 'Test Name', index: 0 },
        email: { text: 'test@test.com', index: 1 },
        secondName: { text: 'Test Name Second', index: 3 },
        secondEmail: { text: 'testSecond@test.com', index: 4 },
        nameIsRequired: 'Name is required.',
        emailIsRequired: 'Email is required.',
        vue2AppName: 'Vue2 App',
        vue3AppName: 'Vue3 App',
        vueAppsDefaultCounterText: 'count: 0',
        vue2AppComponentState: 'Component in Action..',
        vue3AppComponentState: 'Remote Component in Action..',
        selfHealingAppHeaderName: 'Self-Healing',
        app1Name: 'App 1',
        app2Name: 'App 2',
        selfHealingWebpackConfigSeparator: 'shared:',
        selfHealingWebpackConfigSearchedString: 'styled-components',
        typescriptProjectReferencesAppsHeader: 'Typescript',
        typescriptProjectReferencesAppsApp1Name: 'App 1',
        typescriptProjectReferencesAppsApp2Name: 'App 2',
        versionDiscrepancyApp1Name: 'App 1 Host',
        versionDiscrepancyApp2Name: 'App 2: Remote',
        versionDiscrepancyApp1LodashVersion: 'Lodash v4.10.0',
        versionDiscrepancyApp2LodashVersion: 'Lodash v4.17.21',
        lodashVersionNotAvailableMessage: '(lodash.nth not available until lodash@4.11)',
        lodashVersionUndefinedVersionMessage: 'typeof lodash.nth// => undefined',
        lodashVersionDefinedVersionMessage: 'typeof lodash.nth// => function',
        ntxCode: 'nth([\'a\', \'b\'], -1)// => "b"',
        lodashRemoteComponentHeader: 'Remote Component',
    }

    public static readonly commonText = {
        button: 'Button',
        background: 'background',
        widget: 'Widget',
        attr: 'attr',
        href: 'href',
        target: 'target',
        remoteButton: 'Remote Button',
        nextJSButton: 'Next JS Button',
        typeScriptMonoRepoYarnWorkspaceDependency: 'app1/*,app2/*'
    }

    public static readonly color = {
        red: 'rgb(136, 0, 0)',
        blue: 'rgb(0, 0, 204)',
        dynamicRemotesWidgetColor: [
            'rgb(255, 0, 0)',
            'rgb(128, 0, 128)'
        ],
        nonRgbRed: 'color: red;',
        aquamarine: 'rgb(127, 255, 212)',
        chineseSilver: 'rgb(204, 204, 204)',
        darkMutedBlue: 'rgb(75, 75, 232)',
        lightSaturatedYellow: 'rgb(255, 198, 0)',
        pink: 'rgb(219, 112, 147)',
        nonRgbBorderBlack: 'border: 1px solid black; padding: 12px;'
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
