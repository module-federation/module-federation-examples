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
        nextjsSsr: 'nextjs-ssr',
    }

    public static readonly vueAppButtonTypes = {
        viteType: 'vite',
        webpackType: 'webpack'
    }

    public static readonly elementsText = {
        commonButtonWithEmoji: '💅 Button',
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
        dispatchRemoteAppNewNameButton: 'Dispatch RemoteApp new name',
        dispatchRemoteAppNewNameInput: 'test input',
        nestedApp3Button: 'App 3 Button',
        nestedApp2Container: 'App 2 Container',
        nesterApp1Text: 'app 1 body',
        vue2AppButtonText: 'vue2 button click',
        mdmfShell: { name: 'MDMF SHELL', path: 'home' },
        mdmfProfile: { name: 'MDMF PROFILE', path: 'profile' },
        mdmfNavigationItemLogo: { link: 'http://mellondev.net', gitHubLink: 'https://github.com/pegaltier/', targetBlank: '_blank', index: 1 },
        mdfmShellHeader: 'Microfrontend Shell',
        mdfmProfileHeader: 'Profile (Microfrontend)',
        mdfmProductHeader: 'Product (Microfrontend)',
        mdmfSharedHeader: 'Component from shared module',
        mdmfAppTableHeader: 'List users from the shared application state',
        mdmfTableRowName: { name: 'Name', index: 0 },
        mdmfTableRowEmail: { name: 'Email', index: 1},
        mdmfTableRowAction: { name: 'Action', index: 2},
        commonExposedButtonText: 'App 2 Button',
        diferentReactVersionsHeader: 'Basic Host-Remote',
        diferentReactVersionsApp1Subheader: 'App 1, Uses react version not compatible with hooks',
        diferentReactVersionsApp2Subheader: 'App2',
        diferentReactVersionsApp1ReactBlockParagraph: 'This Component uses hooks, if loaded on localhost:3001, it should work, even though that host does not support React Hooks',
        diferentReactVersionsApp1ReactBlockHeader: 'Text form legacy React app:',
        diferentReactVersionsApp1ReactBlockSubheader: 'And these are children passed into it from the legacy app',
        diferentReactVersionsParagraph: 'More react components from App2 using non-legacy React to render',
        diferentReactVersionsButtonName: 'App 2 Button',
        comprehensiveDemo: {
            alertMessage: 'You have pressed a button.',

            App1: {
                mainPage: {
                    alertMessage: 'Alert from LitElement',
                    headerText: 'Module Federation Demo',
                    paragraphs: {
                        first: 'Welcome to the Module Federation Demo!',
                        second: 'Click any of the items on the left to get started.',
                        third: 'Feel free to leave me feedback: https://github.com/module-federation/mfe-webpack-demo'
                    },
                    buttonText: 'Lit Element Action',
                },
                uiLibrary: {
                    headerText: 'UI Library Demo',
                    paragraphs: {
                        first: 'Simple example showing host app and external component using separate CSS solutions.',
                        second: 'This Button component can be found in App #3.',
                        third: 'This button is also used in the routing demo.'
                    },
                    dialogHeader: 'Dialog Demo',
                    dialogParagraph: 'Clicking the button below will render a Dialog using React Portal. This dialog component is being lazy loaded from the app #2.',
                },
                svelte: {
                    headerText: 'Svelte Demo',
                    updatedText: 'Hello From Svelte May The Force Be With You!'
                },
                routing: {
                    headerText: 'Routing Demo',
                    paragraphs: {
                        first: 'The following tab components are being imported remotely from "bravo-app".',
                        second: 'Notice that your browser\'s route is /routing/<foo|bar> depending on which tab is active.',
                        third: 'If you open http://localhost:3002 you will see the same tab components at the root level',
                        forth: 'The "Bar" tab also lazily renders the styled-component Button from the UI Library demo only when rendered.'
                    }
                },
                sideNavHeaderText: 'SideNav'

            },
            App2: {
                headerText: 'Material UI App',
                paragraphText: 'Dialog Component',
                openDialogButtonText: 'Open Dialog',
                dialogHeader: 'Dialog Example',
                dialogParagraph: 'This is a dialog from the Material UI app rendered in a React Portal.',
                dialogButtonText: 'Nice',
                dialogTabs: {
                    headerText: 'Tabs Component',
                    firstTab: {
                        name: 'Foo',
                        paragraphText: 'Foo Content'
                    },
                    secondTab: {
                        name: 'Bar',
                        paragraphText: 'Bar Content',
                        buttonText: 'Bar Button'
                    }
                }
            },
            App3: {
                headerText: 'Styled Components App',
                buttonText: 'Test Button'
            },
            App4: {
                headerText: 'Hello From Svelte world!'
            },
            App5: {
                buttonText: 'bar',
                alertText: 'Hello'
            },

            comprehensiveDemoDemoPages: [
                { name: 'Main', link: '#/', index: 0},
                { name: 'UI Library', link: '#/ui-library', index: 1},
                { name: 'Dialog', link: '#/dialog', index: 2},
                { name: 'Svelte Page', link: '#/svelte', index: 3},
                { name: 'Routing', link: '#/routing/foo', index: 4},
            ],
            comprehensiveDemoAppsList: [
                { name: 'App #1', link: 'http://localhost:3001', index: 5},
                { name: 'App #2', link: 'http://localhost:3002', index: 6},
                { name: 'App #3', link: 'http://localhost:3003', index: 7},
                { name: 'App #4', link: 'http://localhost:3004', index: 8},
                { name: 'App #5', link: 'http://localhost:3005', index: 9},
            ],
        },
        angularReactShellHeader: 'Profile (Angular Shell)',
        angularReactShellSubHeader: 'User List (React Microfrontend)',
        angularReactShellParagraph: 'This user list component is being remotely loaded into the application from React App using Webpack Module Federation',
        angularReactShellEmptyTable: '----- Create user to see data here -----',
        angularReactShellCreateUserButton: 'Create User',
        angularReactShellRemoveUserButton: 'Remove User',
        craHeader: 'Basic Host-Remote',
        craHostParagraph: 'Host',
        craRemoteParagraph: 'Remote',
        craButtontext: 'Hello from remote',
        biDirectionalHeader: 'Bi-Directional',
        biDirectionalButton1: 'App 1 Button',
        biDirectionalButton2: 'App 2 Button',
        competeReactCaseHeader: 'Open Dev Tool And Focus On Network,checkout resources details',
        competeReactCaseFirstParagraph: 'lib-app',
        competeReactCaseSecondParagraph: 'component-app',
        primaryButton: 'primary',
        warningButton: 'warning',
        clickToOpenDialogButton: 'click me to open Dialog',
        h4Buttons: 'Buttons:',
        h4Dialog: 'Dialog:',
        h4HoverMePlease: 'hover me please',
        compeateReactCaseWhatIsYourName: 'What is your name ?',
        closeItButton: 'close It!',
        differentReactIsolatedHeaderApp1: 'Host Application - React Version 17.0.2',
        differentReactIsolatedApp1Name: 'App 1',
        differentReactIsolatedHeaderApp2: 'Remote Application - React Version 16.14.0',
        differentReactIsolatedApp2Name: 'App 2',
        differentReactIsolatedApp2ButtonName: 'App 2 Button',
        serverSideRenderOnlyHeaderHost: 'Host Server',
        serverSideRenderOnlyHeaderRemote: 'Remote Server',
        serverSideRenderOnlySharedComponent: 'Shared Component2222',
        serverSideRenderOnlyUpdatedSharedComponent: 'Updated Shared conponent in test',
        serverSideRenderOnlyChangeFilePath: 'server-side-render-only/remoteServer/SharedComponent.js',
        serverSideRenderOnlyChangeContent: 'import React from \'react\';\n\nconst SharedComponent = () => <div>Updated Shared conponent in test</div>;\n\nexport default SharedComponent;\n',
        serverSideRenderOnlyOriginalContent: 'import React from \'react\';\n\nconst SharedComponent = () => <div>Shared Component2222</div>;\n\nexport default SharedComponent;\n',
        nextjsSsrHome: 'Home',
        nextjsSsrShop: 'Shop',
        nextjsSsrCheckout: 'Checkout',
        nextjsSsrZeitText: 'ZEIT',
        nextjsSsrGiHubText: 'GitHub',
        nextjsSsrCheckoutPage: 'checkout page',
        helloWorldMessage: 'Hello World',
        nextjsSsrMainWelcome: 'Welcome to Next.js on Webpack 5! ',
        nextjsSsrMainCheckoutText: 'This is a federated page owned by localhost:3000',
        nextjsSsrText1: 'Data from federated ',
        nextjsSsrText2: 'getInitalProps',
        nextjsSsrText3: 'This came fom checkout !!!',
        nextjsSsrText4: 'And it works like a charm v2',
        nextjsSsrText5: 'To get started, edit pages/index.js and save to reload.',
        nextjsSsrShopPage: 'Shop Page',
        nextjsSsrMainShopText: 'This is a federated page owned by localhost:3002',
        nextjsSsrDocumentationTile: 'Documentation →',
        nextjsSsrLearnTile: 'Next.js Learn →',
        nextjsSsrExamplesTile: 'Examples →',
        nextjsSsrJSON: '{\n  "userId": 1,\n  "id": 1,\n  "title": "delectus aut autem",\n  "completed": false\n}',
        sharedStoreCrossFrameworkShellPageMark: 'Shell',
        sharedRoutingAppEditProfileBlockInfo: {
            editProfile: 'Edit Profile',
            completeProfile: 'Complete your profile',
        },
        sharedRoutingAppChartInfo: {
            today: 'Today',
            sales: 'Sales ($)'
        },
        sharedRoutingAppHorizontalChartMarks: [
            '00:00',
            '03:00',
            '06:00',
            '09:00',
            '12:00',
            '15:00',
            '18:00',
            '21:00',
            '24:00',
        ],
        sharedRoutingAppVerticalChartMarks: [
            '0',
            '600',
            '1200',
            '1800',
            '2400',
        ],
        sharedRoutingAppSelectorsParts: {
            chart: 'Chart',
            recentDeposits: 'Recent_deposits',
            recentOrders: 'Recent_orders',
            editProfile: 'Edit_profile',
            userInfo: 'User_info',
            cardProfile: 'Card_profile',
        },
        sharedRoutingAppButtonTexts: {
            viewBalance: 'View balance',
            updateProfile: 'Update Profile',
            follow: 'Follow',
            seeMoreOrders: 'See more orders',
        },
        sharedRoutingAppPageHeaders: {
            dashboard: 'Dashboard',
            orders: 'Orders',
            profile: 'Profile'
        },
        sharedRoutingAppRecentDepositsInfo: {
            recentDeposits: 'Recent Deposits',
            sum: '$3,024.00',
            date: 'on 15 March, 2019',
        },
        sharedRoutingAppRecentOrdersHeader: 'Recent Orders',
        sharedRoutingAppRecentOrdersTableColumnsHeaders: [
            'Date',
            'Name',
            'Ship To',
            'Payment Method',
            'Sale Amount',
        ],
        sharedRoutingAppRecentOrderInfo: [
            '16 Mar, 2019',
            'Elvis Presley',
            'Tupelo, MS',
            'VISA ⠀•••• 3719',
            '312.44',
        ],
        sharedRoutingAppSideMenuButtonsTypes: [
            'Dashboard',
            'Orders',
            'Profile',
        ],
        sharedRoutingAppEditProfileBlockLabels: [
            'Company (disabled)',
            'Username',
            'First Name',
            'Last Name',
            'City',
            'Country',
            'Postal Code',
            'Lamborghini Mercy, Your chick she so thirsty, I\'m in that two seat Lambo.',
            'About me',
        ],
        sharedRoutingAppAboutUser: {
            shortProfession: 'PRINCIPAL ENGINEER',
            name: 'Zack Jackson',
            longProfession: 'Principal Engineer at lululemon Distributed JavaScript Orchestration at scale. Maintainer of Webpack, inventor of Module Federation.',
        },
        dynamicSystemRemotesRuntime: {
            host: {
                header: 'Dynamic System Host',
                subHeader: 'Host',
                hostH3: 'my env is https://host.api.com',
                button: 'Load Remote Widget'
            },
            remote: {
                subHeader: 'Remote'
            },
            paragraph: 'The Dynamic System will take advantage Module Federation remotes and exposes. It will no load components that have been loaded already.',
            loading: 'Loading',
            buttonHeader: 'Remote Widget',
            buttonH2: 'My env is ',
            buttonParagraph: 'Using momentjs for format the date'
        },
        sharedContext: {
            app1: {
                subheader: 'App 1',
                paragraph: 'Welcome, Billy'
            },
            app2: {
                subheader: 'App 2',
                paragraph: 'Welcome, Susan',
            },
            header: 'Context Provider'
        },
        cssIsolationApp1Name: 'App 1',
        cssIsolationApp2Name: 'App 2',
        cssIsolationApp1Header: 'Host Application - React Version',
        cssIsolationApp2Header: 'Remote Application - React Version',
        sharedRoutes2HomeButtonH1: 'Home Page',
        sharedRoutes2AboutButtonH1: 'About Page',
        sharedRoutes2HomeButtonH2: 'Welcome to the future!',
        sharedRoutes2HomeButtonEM: 'a page being provided by App 1',
        sharedRoutes2AboutButtonEM: 'a page being provided by App 2',
        reactNestedRoutersPage1App1: 'Page 1 from App1',
        reactNestedRoutersPage1App2: 'Page 1 from App2',
        reactNestedRoutersPage2App1: 'Page 2 from App1',
        reactNestedRoutersPage2App2: 'Page 2 from App2',
        reactNestedRoutersGoToPage: 'Go to Page',
        reactNestedRoutersApp1: 'App 1',
        reactNestedRoutersApp2: 'App 2',
        reactNestedRoutersNav: [
            {
                name: 'App1 Page1',
                link: '/app-1/page-1',
                index: 0,
                text: 'Page 1 from App1',
                linkText: 'Go to Page 2',
                linkRouting: '/page-2'
            },
            {
                name: 'App1 Page2',
                link: '/app-1/page-2',
                index: 1,
                text: 'Page 2 from App1',
                linkText: 'Go to Page 1',
                linkRouting: '/page-1'
            },
            {
                name: 'App2 Page1',
                link: '/app-2/page-1',
                index: 2,
                text: 'Page 1 from App2',
                linkText: 'Go to Page 2',
                linkRouting: '/page-2'
            },
            {
                name: 'App2 Page2',
                link: '/app-2/page-2',
                index: 3,
                text: 'Page 2 from App2',
                linkText: 'Go to Page 1',
                linkRouting: '/page-1'
            }
        ],
        nativeFederationReactConsoleMessages: {
            dateMessage: '2023-01-01 is a Sun.',
            weekendMessage: 'No long weekend ☹',
            loadingModuleMessage: 'loading remote module ...',
            remoteModuleMessage: 'got remote module: '
        },
        commonComponentsNames: {
            host: 'Host',
            remote: 'Remote'
        },
        nativeFederationReactPageMessages: {
            checkConsoleMessage: 'Have a look into your JavaScript console ...',
            remoteComponentGreeting: 'I\'m the remote\'s React Component!',
            changeComponentMessage: 'Edit src/App.tsx and save to reload.',
        },
        nativeFederationElementsTexts: {
            linkName: 'Learn React',
            buttonText: 'click me 0',
        },
        nativeFederationReactButtonsNames: {
            host: 'Host button: ',
            remote: 'Remote button: '
        },
        reactHostRemoteContainerHeader: 'This is the container App hosted at localhost:8080',
        reactHostRemoteContainerDiv: 'This component is from the Host React App hosted at localhost:8081',
        reactHostRemoteHostedDiv: 'This is the Remote App hosted at localhost:8081)',
        reactHostRemoteHostedButtonNames: {
            invoices: 'Invoices',
            expenses: 'Expenses'
        },
        reactHostNextJsRemoteHeader: 'This is the React container App hosted at localhost:8080',
        reactHostNextJsRemoteNav: 'Hello from Remote Nextjs component hosted on localhost:8081',

        vueCliSectionsDescriptions: {
            otherSection: 'This is a component from /other-app.I am being imported.I also has my own behavior like fetching data',
            coreSection: 'This is a section from /code.',
            consumerCoreSection: 'I\'m inside the Section component loaded from /core, but my text is defined in /consumer'
        },
        vueCliButtonsText: {
            otherSectionButton: 'Click to fetch from FakeApi',
            coreSectionButton: 'Button',
            consumerCoreSectionButton: 'Button imported from /core',
        },
        vueCliOtherSectionCodeBlock: '{ "userId": 1, "id": 1, "title": "delectus aut autem", "completed": false }',
        vueCliConsumerSectionHeader: 'This is /consumer.',
        vueCliConsumerImportMessages: {
            coreImportMessage: 'The content below is imported from /core',
            otherImportMessage: 'The content below is imported from /other'
        },
        umdFederation: {
            App1: {
                firstHeader: 'Host App 1',
                secondHeader: 'MF App 01',
                thirdHeader: 'UMD App2'
            }
        },
        quasarCli: {
            appExposes: {
                appName: 'App Exposes',
                list: 'List',
                banner: 'App Exposes Home Page',
                componentsButton: 'Components'
            },
            appGeneral: {
                name: 'Child FE',
                banner: 'App Remote Home Page',
                routeButton: 'Route',
                subheader1: 'Exposed from Child',
                subheader2: 'Listening in Parent',
                counter: 'Counter',
            },
            appButtonDiv: 'App Button',
            appButtonClickMeButton: 'Click me',
            appListDiv: 'AppList',
            counter: {
                startValue: '0',
                valueAfterClick: '1'
            },
            names: [
                { name: 'Gualtiero', index: 5 },
                { name: 'Riyaz', index: 4 },
                { name: 'Quy', index: 3 },
                { name: 'Sang', index: 2 },
                { name: 'Loris', index: 1}
            ]
        },
        viteReactMicroFrontendsCardsMessages: {
            remoteCard: 'I\'m the remote app',
            hostCard: 'I\'m the host app'
        },
        viteReactMicroFrontendsButtonsText: {
            hostButton: 'Host counter: 0',
            remoteButton: 'Remote counter: 0'
        },
        reactInVue: {
            App1: {
                header: 'React in Vue',
                subHeader: 'Vue State/Input',
                checkBoxText: 'Show button:',
                buttonInputText: 'Button text:',
                counterText: 'Times button clicked:',
                buttonHeader: 'React Button - loaded via Module Federation',
                buttonText: 'React button',
                updatedButtonText: 'Make cool'
            },
            App2: {
                header: 'Basic Host-Remote',
                subHeader: 'Home',
                buttonText: 'Home Button',
            }
        },
        reactHmr: {
            remote: {
                text: 'Remote 1\'s counter: ',
                button: 'increment'
            },
            host: {
                headerText1: 'HOST',
                headerText2: 'HOST ONLY SUPPORTS LIVE RELOAD. GO TO http://localhost:3001 to try out HMR',
                heading: 'This is the heading',
                button: 'from remote1: GO HOME'
            }
        },
        angularUniversalSsrValueInputButtonText: 'Add value',
        angularUniversalSsrTabsNames: [
            'Home',
            'Angular lazy module',
            'Federation lazy module'
         ],
        angularUniversalSsrAddedCities: [
            'Prague',
            'Saint-Petersburg'
        ],
    }

    public static readonly tabsNames = {
        aboutTab: 'About',
        homeTab: 'Home',
        mdmfNavigationItemHome: { name: 'Home', index: 1 },
        mdmfNavigationItemProfile: { name: 'Profile', index: 2 },
        mdmfNavigationItemProduct: { name: 'Product', index: 3 },
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
        welcomeToHostApp: 'Welcome to Host App',
        commonHostAppName: 'Host App',
        remoteAppText: 'RemoteApp',
        remoteAppsNameFromReduxStore: "RemoteApp's name from the redux store : ",
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
        mdmfProductParagraph: 'This product component is being remotely loaded into the application using Module Federation, angular is shared so the download is minimal for the frontend',
        mdmfProductLinkText: 'Detail',
        commonLoadingText: 'Loading...',
        mdmfBackLink: 'Back',
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
        dynamicSytemHostParagraph: 'The Dynamic System will take advantage Module Federation ',
        dynamicSystemHostParagraphText: [
            'App2 Moment Dep',
            'for format the date'
        ],
        commonVueAppComponentState: 'Remote Component in Action..',
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
        compleateReactCaseInput: 'Test Input',
        randomSymbolsString: '@#$%^&*()_+',
        startupCodeAppsHeader: 'Basic Host-Remote',
        startupCodeAppsNames : {
            app1: 'App 1',
            app2: 'App 2'
        },
        vue3DemoLayoutAppHeaders : {
            host: '# Hosting App [HOST]',
            remote: '#remote-component [REMOTE]'
        },
        vue3DemoLayoutAppNames : {
            layout: 'Layout App 1',
            remote: 'Main App'
        },
        standartText: 'May The Force Be With You',
        vueCliOtherAppAlertMessage: 'Data fetched',
        viteSvelteMicroFrontEndsConsoleMessages: [
            'I\'m RxJs from host',
            'I\'m RxJs from remote',
            'remote got message:'
        ],
        rustWasmConsoleMessages: {
            startLoopMessage:'Infinite looping in progress',
            stopLoopMessage:'Looping successfully stopped',
            tickLoopMessage:'Game board successfully rerendered',
            resetLoopMessage:'Game board successfully reset',
            baseLoadingMessage: 'I love rust and wasm!'
        },
        craReactAppAppsPhrases: {
            hostApp: 'This is the host application.',
            hostAppRemoteMessage: 'This is a component from the remote application',
            remoteApp: 'Remote Application'
        },
        angularUniversalSsrComponentsMessages: {
            rootComponent: 'Root component',
            homeComponent: 'Home component',
            angularLazyComponent: 'Angular lazy route component'
        },
        angularUniversalSsrCitiesBlockHeaderText: 'Select a city:',
        angularUniversalSsrSelectedCityInfo: [
            'The weather in Prague is good![ Angular lazy component ]',
            'The weather in Saint-Petersburg is good![ Angular lazy component ]'
        ],
        thirdPartyScriptsAppPhrases: {
            header: 'Basic Host-Remote',
            description: 'Check the network tab to see all the third party calls'
        },
    }

    public static readonly commonText = {
        button: 'Button',
        background: 'background',
        backgroundColor: 'background-color',
        widget: 'Widget',
        attr: 'attr',
        href: 'href',
        target: 'target',
        src: 'src',
        style: 'style',
        remoteButton: 'Remote Button',
        nextJSButton: 'Next JS Button',
        typeScriptMonoRepoYarnWorkspaceDependency: 'workspaces',
        border: 'border',
        standartText: 'May The Force Be With You',
        sharedRoutingAppReplaceSelectorPart: 'RECENT_',
        sharedStoreCrossFrameworkAppComponentsTypes: {
            reactType: 'React',
            vueType: 'Vue',
        },
        sharedStoreCrossFrameworkAppButtonsBlocksNames:  {
            reactModule: 'Remote React module',
            vueModule: 'Remote Vue module'
        },
        commonMathSigns: {
            plusSign: '+',
            minusSign: '-'
        },
        sharedStoreCrossFrameworkCounterValues: {
            minusOne: '-1',
            zero: '0',
            one: '1',
            two: '2'
        },
        cssIsolationButton: 'Make Everything Yellow',
        viteReactMicroFrontendsCardsNames: {
            hostCard: 'host',
            remoteCard: 'remote'
        },
        viteReactMicroFrontendsCardsSymbolsNames: {
            starSymbol: 'star',
            cloudSymbol: 'cloud'
        },
        displayNone: 'display: none;',
        rustWasmAppButtonsNames: [
            'Play ▶️',
            'Tick 🔂',
            'Reset ♻️',
            'Stop 🛑'
        ],
        angularUniversalSsrAddedValuesNames: [
            'one',
            'two',
            'three',
        ],
    }

    public static readonly color = {
        red: 'rgb(136, 0, 0)',
        deepBlue: 'rgb(0, 0, 204)',
        dynamicRemotesWidgetColor: [
            'rgb(255, 0, 0)',
            'rgb(128, 0, 128)'
        ],
        nonRgbRed: 'color: red;',
        aquamarine: 'rgb(127, 255, 212)',
        chineseSilver: 'rgb(204, 204, 204)',
        darkMutedBlue: 'rgb(75, 75, 232)',
        lightSaturatedYellow: 'rgb(255, 198, 0)',
        nonRgbBorderBlack: 'border: 1px solid black; padding: 12px;',
        lightWashedAzure: 'rgb(64, 158, 255)',
        lightWashedOrange: 'rgb(230, 162, 60)',
        pink: 'rgb(219, 112, 147)',
        lightBlue: 'rgb(188, 225, 255)',
        lightGreen: 'rgb(136, 218, 153)',
        greenyellow: 'rgb(173, 255, 47)',
        purple: 'rgb(63, 81, 181)',
        deepPink: 'rgb(156, 39, 176)',
        yellow: 'rgb(255, 255, 0)',
        green: 'rgb(0, 128, 0)',
        borderColorRed1px: '1px solid rgb(255, 0, 0)',
        orange: 'rgb(246, 179, 82)',
        blue: 'rgb(49, 120, 198)',
        black: 'rgb(31, 33, 36)',
        oceanBluePearl: 'rgb(63, 81, 181)',
        alabaster: 'rgb(250, 250, 250)',
        paleVioletRed: 'rgb(219, 112, 147)',
        white: 'rgb(255, 255, 255)',
        lightGrey: 'rgb(239, 239, 239)',
        darkGrey: 'rgb(40, 44, 52)',
        nonRgbBorderRed: 'border: 2px dotted red; padding: 20px;'
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
        nextjsSsrHomeLink: '/',
        nextjsSsrShopLink: '/shop',
        nextjsSsrCheckoutLink: '/checkout',
        nextjsSsrGitHubLink: 'https://github.com/zeit/next.js',
        nextjsSsrZeitLink: 'https://zeit.co/now',
        nextjsSsrDocumentationLink: 'https://nextjs.org/docs',
        nextjsSsrLearnLink: 'https://nextjs.org/learn',
        nextjsSsrExamplesLink: 'https://github.com/zeit/next.js/tree/master/examples',
        nextjsSsrGitHubUrl: 'https://github.com/vercel/next.js',
        nextjsSsrZeitUrl: 'https://vercel.com/home',
        nextjsSsrDocumentationUrl: 'https://nextjs.org/docs',
        nextjsSsrLearnUrl: 'https://nextjs.org/learn/foundations/about-nextjs',
        nextjsSsrExamplesUrl: 'https://github.com/vercel/next.js/tree/deprecated-main/examples',
        nativeFederationReactUrl: 'https://reactjs.org',
        reactNestedRoutersPage2: '/page-2',
        comprehensiveDemoGitHubLink: { link: 'https://github.com/module-federation/mfe-webpack-demo', index: 10 },
        comprehensiveDemoApp3Link: { link: 'http://localhost:3003/', index: 10 },
        comprehensiveDemoRoutingDemoLink: { link: 'http://localhost:3001/#/routing/foo', index: 11 },
        comprehensiveDemoUiLibraryLink: '#/ui-library',
        comprehensiveDemoDialogLink: '#/dialog',
        comprehensiveDemoSvelteLink: '#/svelte',
        reactHmrHomeLink: '/',
        reactHmrButtonLink: '/button',
        reactHmrHeadingLink: '/heading',
        angularUniversalSsrLinks : {
            angularLink: '/lazy',
            federationLink: '/federation'
        },
        thirdPartyScriptsPostRequestPath: 'https://www.google-analytics.com/j/collect?**',
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
        reactHmrHostHomeText: 'Home',
        reactHmrHostButtonText: 'Button',
        reactHmrHostHeadingText: 'Heading',
    }

    public static readonly fieldsNames = {
        nameField: 'NAME',
        emailField: 'EMAIL'
    }
}
