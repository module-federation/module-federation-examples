export class Constants {
    public static readonly filesPath = {
        typeScriptMonoRepoPackageJsonPath: 'typescript-monorepo/package.json',
        selfHealingAppsConfigs: {
            app1: 'self-healing/app1/webpack.config.js',
            app2: 'self-healing/app2/webpack.config.js',
        },
        serverSideRenderOnlyChangeFilePath: 'server-side-render-only/remoteServer/SharedComponent.js',
        nextJsHostReactRemoteApp: {
            files: {
                root: 'react-nextjs/nextjs-host-react-remote/host/pages/index.js',
                changedContent: 'react-nextjs/nextjs-host-react-remote/e2e/fixtures/changedContent.js',
                originalContent: 'react-nextjs/nextjs-host-react-remote/e2e/fixtures/originalContent.js'
            }
        },
        nextJsHostRemoteApp: {
            files: {
                roots: {
                    host: 'react-nextjs/nextjs-host-remote/host/pages/index.js',
                    remote: 'react-nextjs/nextjs-host-remote/remote/pages/index.js',
                },
                contents: {
                   original: {
                       host: 'react-nextjs/nextjs-host-remote/e2e/fixtures/host/originalContent.js',
                       remote: 'react-nextjs/nextjs-host-remote/e2e/fixtures/remote/originalContent.js',
                   },
                    changed: {
                       host: 'react-nextjs/nextjs-host-remote/e2e/fixtures/host/changedContent.js',
                       remote: 'react-nextjs/nextjs-host-remote/e2e/fixtures/remote/changedContent.js',
                    }
                },
            }
        }
    }

    public static readonly selectorParts = {
        vue3DemoFederationWithViteApp: {
            vite: 'vite',
        },
        sharedRoutingAppReplaceSelectorPart: 'RECENT_',
        formFieldNames: {
            nameField: 'NAME',
            emailField: 'EMAIL'
        },
        sharedRoutingAppSelectorsParts: {
            chart: 'Chart',
            recentDeposits: 'Recent_deposits',
            recentOrders: 'Recent_orders',
            editProfile: 'Edit_profile',
            userInfo: 'User_info',
            cardProfile: 'Card_profile',
        },
    }

    public static readonly commonConstantsData = {
        commonCountAppNames: {
            app1: 'App 1',
            app2: 'App 2',
            app3: 'App 3'
        },
        button: 'Button',
        header: 'Header',
        widget: 'Widget',
        webpack: 'webpack',
        counter: 'Counter',
        home: 'Home',
        commonIndexes: {
            minusOne: -1,
            zero: 0,
            one: 1,
            two: 2,
            three: 3,
            four: 4,
            five: 5,
            ten: 10,
            eleven: 11
        },
        basicComponents: {
            host: 'Host',
            remote: 'Remote',
            basicHostRemote: 'Basic Host-Remote'
        },
        commonButtonWithEmoji: '💅 Button',
        loading: 'Loading',
        biDirectional: 'Bi-Directional',
        sharedRoutingAppPagesComponents: {
            dashboard: 'Dashboard',
            orders: 'Orders',
            profile: 'Profile'
        },
        standardPhrase: 'May The Force Be With You',
        commonLinks: {
            page1: '/page-1',
            page2: '/page-2',
            baseLink: '/',
            cellLink: '#/',
            react: 'https://reactjs.org',
            vercel: 'https://vercel.com',
            nextJs: 'https://nextjs.org/',
            nextJsAppsCardsLinks: [
                'https://nextjs.org/docs',
                'https://nextjs.org/learn/foundations/about-nextjs',
                'https://github.com/vercel/next.js/tree/canary/examples',
                'https://vercel.com',
            ]
        },
        typeScript: 'typescript',
        commonMicroFrontendsAppsCardsSymbolsNames: {
            starSymbol: 'star',
            cloudSymbol: 'cloud'
        },
        commonAttributes: {
            attr: 'attr',
            href: 'href',
            target: 'target',
            src: 'src',
            style: 'style',
            border: 'border',
            displayNone: 'display: none;',
        },
        translationInfo: {
            reactAppsTranslations: {
                reactTypes: {
                    host: 'React Host :',
                    remote: 'React Remote :'
                },
                remoteMicroFrontEndIntroduction: {
                    english: 'Here\'s my micro frontend remote child :',
                    francais: 'Voici mon micro frontend remote child :',
                },
                changeLanguageMessage: {
                    english: 'change language',
                    francais: 'changer la langue'
                },
                mainTextMessage: 'This is the main text',
                fromNextHostMessage: 'from Next Host',
            }
        },
        commonAngularAppsData: {
            mdmfShellName: 'MDMF SHELL',
            mdmfProfile: {name: 'MDMF PROFILE', path: 'profile'},
            mdmfNavigationItemLogo: {
                link: 'http://mellondev.net',
                gitHubLink: 'https://github.com/pegaltier/',
                targetBlank: '_blank'
            },
            headers: {
                shell: 'Microfrontend Shell',
                profile: 'Profile (Microfrontend)',
                table: 'List users from the shared application state',
            },
            mdmfTableRowName: 'Name',
            mdmfTableRowEmail: 'Email',
            mdmfTableRowAction: 'Action',
            mdmfNavigationItems: {
                profile: 'Profile',
                product: 'Product'
            },
            messages: {
                shellWelcome: 'Welcome to the Angular 11 Microfrontend demo using Webpack 5 Module Federation',
                shellParagraph: 'This component is part of the shell application, the Profile component that is linked from the `Profile` link at the top is a Microfrontend that is remotely loaded into the application. Check the network settings to see the remote being loaded.',
                profileParagraph: 'This profile component is being remotely loaded into the application using Module Federation, angular is shared so the download is minimal for the frontend',
                sharedParagraph: 'mdmf-shared works!',
                testName: {
                    first: 'Test Name',
                    second: 'Test Name Second'
                },
                email: {
                    first: 'test@test.com',
                    second: 'testSecond@test.com'
                },
                requiresMessages: {
                    name: 'Name is required.',
                    email: 'Email is required.',
                }
            }
        },
        helloWorldMessage: 'Hello World',
        commonVueAppComponentState: 'Remote Component in Action..',
        nextJsAppsCommonPhrases: {
            linksCardsText: [
                'Documentation →Find in-depth information about Next.js features and API.',
                'Learn →Learn about Next.js in an interactive course with quizzes!',
                'Examples →Discover and deploy boilerplate example Next.js projects.',
                'Deploy →Instantly deploy your Next.js site to a public URL with Vercel.'
            ],
            messages: {
                start: 'Get started by editing pages/index.js',
                engine: 'Powered by',
                welcome: 'Welcome to Next.js!',
                footer: 'Scipt is only needed if you are not using the federation @ syntax when setting your remotes.',
            }
        }
    }

    public static readonly updatedConstantsData = {
        commonAppWithButton: {
            app1: `${Constants.commonConstantsData.commonCountAppNames.app1} ${Constants.commonConstantsData.button}`,
            app2: `${Constants.commonConstantsData.commonCountAppNames.app2} ${Constants.commonConstantsData.button}`,
            app3: `${Constants.commonConstantsData.commonCountAppNames.app3} ${Constants.commonConstantsData.button}`,
        },
        commonAppWithWidget: {
            app1: `${Constants.commonConstantsData.commonCountAppNames.app1} ${Constants.commonConstantsData.widget}`,
            app2: `${Constants.commonConstantsData.commonCountAppNames.app2} ${Constants.commonConstantsData.widget}`,
            app3: `${Constants.commonConstantsData.commonCountAppNames.app3} ${Constants.commonConstantsData.widget}`,
        },
        updatedLoadingMessage: `${Constants.commonConstantsData.loading}...`,
        baseSvelteIntroMessage: `Hello From Svelte ${Constants.commonConstantsData.standardPhrase}!`,
        reactAppsTranslations: {
            host: {
                english: {
                    title: `${Constants.commonConstantsData.translationInfo.reactAppsTranslations.reactTypes.host} ${Constants.commonConstantsData.translationInfo.reactAppsTranslations.remoteMicroFrontEndIntroduction.english}`,
                    button: `${Constants.commonConstantsData.translationInfo.reactAppsTranslations.reactTypes.host} ${Constants.commonConstantsData.translationInfo.reactAppsTranslations.changeLanguageMessage.english}`,
                    text: `${Constants.commonConstantsData.translationInfo.reactAppsTranslations.reactTypes.host} ${Constants.commonConstantsData.translationInfo.reactAppsTranslations.mainTextMessage}`,
                },
                francais: {
                    title: `${Constants.commonConstantsData.translationInfo.reactAppsTranslations.reactTypes.host} ${Constants.commonConstantsData.translationInfo.reactAppsTranslations.remoteMicroFrontEndIntroduction.francais}`,
                    button: `${Constants.commonConstantsData.translationInfo.reactAppsTranslations.reactTypes.host} ${Constants.commonConstantsData.translationInfo.reactAppsTranslations.changeLanguageMessage.francais}`,
                    text: `${Constants.commonConstantsData.translationInfo.reactAppsTranslations.reactTypes.host} Ceci est le texte principal`,
                }
            },
            remote: {
                english: {
                    title: `${Constants.commonConstantsData.translationInfo.reactAppsTranslations.reactTypes.remote} Title`,
                    button: `${Constants.commonConstantsData.translationInfo.reactAppsTranslations.reactTypes.remote} ${Constants.commonConstantsData.translationInfo.reactAppsTranslations.changeLanguageMessage.english}`,
                    text: `${Constants.commonConstantsData.translationInfo.reactAppsTranslations.reactTypes.remote} I\'m the remote child !`,
                },
                francais: {
                    title: `${Constants.commonConstantsData.translationInfo.reactAppsTranslations.reactTypes.remote} Titre`,
                    button: `${Constants.commonConstantsData.translationInfo.reactAppsTranslations.reactTypes.remote} ${Constants.commonConstantsData.translationInfo.reactAppsTranslations.changeLanguageMessage.francais}`,
                    text: `${Constants.commonConstantsData.translationInfo.reactAppsTranslations.reactTypes.remote} Je suis le remote child`,
                }
            },
            nextHost: {
                english: {
                    title: Constants.commonConstantsData.translationInfo.reactAppsTranslations.remoteMicroFrontEndIntroduction.english,
                    button: `${Constants.commonConstantsData.translationInfo.reactAppsTranslations.changeLanguageMessage.english} ${Constants.commonConstantsData.translationInfo.reactAppsTranslations.fromNextHostMessage}`,
                    text: `${Constants.commonConstantsData.translationInfo.reactAppsTranslations.mainTextMessage} ${Constants.commonConstantsData.translationInfo.reactAppsTranslations.fromNextHostMessage.replace('from', 'of')}`,
                },
                francais: {
                    title: Constants.commonConstantsData.translationInfo.reactAppsTranslations.remoteMicroFrontEndIntroduction.francais,
                    button: `${Constants.commonConstantsData.translationInfo.reactAppsTranslations.changeLanguageMessage.francais} depuis ${Constants.commonConstantsData.translationInfo.reactAppsTranslations.fromNextHostMessage}`,
                    text: `Ceci est le texte principal ${Constants.commonConstantsData.translationInfo.reactAppsTranslations.fromNextHostMessage.replace('from', 'de')}`
                },
            },
        },
        typeScriptApp: {
            buttons: {
                small: `${Constants.commonConstantsData.commonCountAppNames.app2} Small ${Constants.commonConstantsData.button}`,
                large: `${Constants.commonConstantsData.commonCountAppNames.app2.replace(' ', '')} Large ${Constants.commonConstantsData.button}`,
            }
        },
    }

    public static readonly elementsText = {
        reactNestedRoutersApp: {
            shellAppTextedLinks: [
                'App1 Page1',
                'App1 Page2',
                'App2 PageA',
                'App2 PageB',
                'Go to Page 2',
            ],
            shellAppLinks: [
                '/app-1/page-1',
                '/app-1/page-2',
                '/app-2/page-a',
                '/app-2/page-b',
            ],
            replaceValues: [
                '2',
                'B',
                'Page 1',
                'Page 2',
                '1',
                'Page A',
                'Page B',
                'A'
            ]
        },
        vue3DemoFederationWithViteApp: {
            viteContent: 'Vite Content',
            webpackContent: 'Webpack Content',
        },
        dynamicRemotesApp: {
            header: 'Dynamic System Host',
            buttonsText: [
                'Load App 2 Widget',
                'Load App 3 Widget',
            ],
            widgetsNames: [
                Constants.updatedConstantsData.commonAppWithWidget.app2,
                Constants.updatedConstantsData.commonAppWithWidget.app3,
            ],
            synchronousImportWidgetsNames: [
                Constants.updatedConstantsData.commonAppWithWidget.app1,
                Constants.updatedConstantsData.commonAppWithWidget.app2,
            ],
        },
        dispatchRemoteApp: {
            button: 'Dispatch RemoteApp new name',
            input: 'test input',
        },
        nestedApp: {
            app1Text: 'app 1 body',
            app2Container: 'App 2 Container',
        },
        vue2InVue3App: {
            commonButtonText: 'vue2 button click',
        },
        differentAngularVersionsApps: {
            mdmfProductHeader: 'Product (Microfrontend)',
            mdmfSharedHeader: 'Component from shared module',
        },
        differentReactVersionsApps: {
            subheader: 'App 1, Uses react version not compatible with hooks',
            reactBlockParagraph: 'This Component uses hooks, if loaded on localhost:3001, it should work, even though that host does not support React Hooks',
            reactBlockHeader: 'Text form legacy React app:',
            reactBlockSubheader: 'And these are children passed into it from the legacy app',
            paragraph: 'More react components from App2 using non-legacy React to render',
        },
        comprehensiveDemoApp: {
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
                {
                    name: 'Main',
                    link: Constants.commonConstantsData.commonLinks.cellLink,
                    index: Constants.commonConstantsData.commonIndexes.zero
                },
                {name: 'UI Library', link: '#/ui-library', index: Constants.commonConstantsData.commonIndexes.one},
                {name: 'Dialog', link: '#/dialog', index: Constants.commonConstantsData.commonIndexes.two},
                {name: 'Svelte Page', link: '#/svelte', index: Constants.commonConstantsData.commonIndexes.three},
                {name: 'Routing', link: '#/routing/foo', index: Constants.commonConstantsData.commonIndexes.four},
            ],
        },
        angularReactShellApp: {
            header: 'Profile (Angular Shell)',
            subHeader: 'User List (React Microfrontend)',
            paragraph: 'This user list component is being remotely loaded into the application from React App using Webpack Module Federation',
            emptyTableState: '----- Create user to see data here -----',
            userActions: {
                create: 'Create User',
                remove: 'Remove User',
            }
        },
        craApp: {
            buttonText: 'Hello from remote',
        },
        completeReactCaseApp: {
            header: 'Open Dev Tool And Focus On Network,checkout resources details',
            paragraphs: {
                firstParagraph: 'lib-app',
                secondParagraph: 'component-app',
            },
            buttons: {
                primaryButton: 'primary',
                warningButton: 'warning',
                openDialogButton: 'click me to open Dialog',
                h4Buttons: 'Buttons:',
                closeButton: 'close It!',
            },
            h4Dialog: 'Dialog:',
            h4HoverElement: 'hover me please',
            nameMessage: 'What is your name ?',
        },
        differentReactVersionsIsolatedApp: {
            headers: {
                app1: 'Host Application - React Version 17.0.2',
                app2: 'Remote Application - React Version 16.14.0',
            }
        },
        serverSideRenderOnlyApp: {
            headers: {
                host: 'Host Server',
                remote: 'Remote Server',
            },
            components: {
                sharedComponent: 'Shared Component2222',
                updatedSharedComponent: 'Updated Shared conponent in test',
            },
            contents: {
                originalContent: 'import React from \'react\';\n\nconst SharedComponent = () => <div>Shared Component2222</div>;\n\nexport default SharedComponent;\n',
                changedContent: 'import React from \'react\';\n\nconst SharedComponent = () => <div>Updated Shared conponent in test</div>;\n\nexport default SharedComponent;\n',
            }
        },
        nextJsSsrApp: {
            shop: 'Shop',
            checkout: 'Checkout',
            zeit: 'ZEIT',
            gitHub: 'GitHub',
            messages: {
                welcomeMessage: 'Welcome to Next.js on Webpack 5! ',
                checkoutMessage: 'This is a federated page owned by localhost:3000',
            },
            texts: {
                text1: 'Data from federated ',
                text2: 'getInitalProps',
                text3: 'This came fom checkout !!!',
                text4: 'And it works like a charm v2',
                text5: 'To get started, edit pages/index.js and save to reload.',
                mainShopText: 'This is a federated page owned by localhost:3002',
            },
            pages: {
                checkoutPage: 'checkout page',
                shopPage: 'Shop Page',
            },
            tiles: {
                documentation: 'Documentation →',
                learn: 'Next.js Learn →',
                examples: 'Examples →',
            },
            json: '{\n  "userId": 1,\n  "id": 1,\n  "title": "delectus aut autem",\n  "completed": false\n}',
        },
        sharedStoreCrossFrameworkApp: {
            pageMark: 'Shell',
            componentsTypes: {
                reactType: 'React',
                vueType: 'Vue',
            },
            blocksNames: {
                reactModule: 'Remote React module',
                vueModule: 'Remote Vue module'
            },
            mathSigns: {
                plus: '+',
                minus: '-'
            },
        },
        sharedRoutingApp: {
            profileActions: {
                edit: 'Edit Profile',
                complete: 'Complete your profile',
            },
            chartInfo: {
                today: 'Today',
                sales: 'Sales ($)'
            },
            chartMarks: {
                horizontal: [
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
                vertical: [
                    '0',
                    '600',
                    '1200',
                    '1800',
                    '2400',
                ]
            },
            buttonsTexts: {
                viewBalance: 'View balance',
                updateProfile: 'Update Profile',
                follow: 'Follow',
                seeMoreOrders: 'See more orders',
            },
            depositsInfo: {
                recentDeposits: 'Recent Deposits',
                sum: '$3,024.00',
                date: 'on 15 March, 2019',
            },
            orders: {
                ordersHeader: 'Recent Orders',
                recentOrdersTableColumnsHeaders: [
                    'Date',
                    'Name',
                    'Ship To',
                    'Payment Method',
                    'Sale Amount',
                ],
                recentOrderInfo: [
                    '16 Mar, 2019',
                    'Elvis Presley',
                    'Tupelo, MS',
                    'VISA ⠀•••• 3719',
                    '312.44',
                ],
            },
            sideMenuButtonsTypes: [
                Constants.commonConstantsData.sharedRoutingAppPagesComponents.dashboard,
                Constants.commonConstantsData.sharedRoutingAppPagesComponents.orders,
                Constants.commonConstantsData.sharedRoutingAppPagesComponents.profile,
            ],
            editProfileBlockLabels: [
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
            aboutUserBlock: {
                shortProfession: 'PRINCIPAL ENGINEER',
                name: 'Zack Jackson',
                longProfession: 'Principal Engineer at lululemon Distributed JavaScript Orchestration at scale. Maintainer of Webpack, inventor of Module Federation.',
            }
        },
        dynamicSystemRemotesRuntimeApp: {
            host: {
                header: 'Dynamic System Host',
                hostH3: 'my env is https://host.api.com',
                button: 'Load Remote Widget'
            },
            paragraph: 'The Dynamic System will take advantage Module Federation remotes and exposes. It will no load components that have been loaded already.',
            buttonHeader: 'Remote Widget',
            buttonH2: 'My env is ',
            buttonParagraph: 'Using momentjs for format the date'
        },
        sharedContextApp: {
            app1: {
                paragraph: 'Welcome, Billy'
            },
            app2: {
                paragraph: 'Welcome, Susan',
            },
            header: 'Context Provider'
        },
        cssIsolationApp: {
            headers: {
                app1: 'Host Application - React Version',
                app2: 'Remote Application - React Version',
            },
            buttonText: 'Make Everything Yellow',
        },
        sharedRoutes2App: {
            buttons: {
                homeButtons: {
                    h1: 'Home Page',
                    h2: 'Welcome to the future!',
                    em: 'a page being provided by App 1',
                },
                aboutButtons: {
                    h1: 'About Page',
                    em: 'a page being provided by App 2',
                }
            }
        },
        nativeFederationReactApp: {
            messages: {
                consoleMessages: {
                    dateMessage: '2023-01-01 is a Sun.',
                    weekendMessage: 'No long weekend ☹',
                    loadingModuleMessage: 'loading remote module ...',
                    remoteModuleMessage: 'got remote module: '
                },
                pageMessages: {
                    checkConsoleMessage: 'Have a look into your JavaScript console ...',
                    remoteComponentGreeting: 'I\'m the remote\'s React Component!',
                    changeComponentMessage: 'Edit src/App.tsx and save to reload.',
                }
            },
            elementsTexts: {
                linkName: 'Learn React',
                buttonText: 'click me 0',
            },
            buttons: {
                host: 'Host button: ',
                remote: 'Remote button: '
            }
        },
        reactHostRemoteApp: {
            containers: {
                header: 'This is the container App hosted at localhost:8080',
                div: 'This component is from the Host React App hosted at localhost:8081',
            },
            hostedDiv: 'This is the Remote App hosted at localhost:8081)',
            buttons: {
                invoices: 'Invoices',
                expenses: 'Expenses'
            },
        },
        react18CodeSplittingApp: {
            app1: {
                appName: 'App1',
            },
            app2: {
                appName: 'App2'
            },
            header: 'Module Federation Example: React 18 Code Splitting',
            button: 'Toggle Content',
            test: 'test'
        },
        reactApps:{
            app1: {
                subHeader: 'This is the App 1 application.',
            },
            app2: {
                subHeader: 'This is the App 2 application.',
            }, 
            splitedApp:{
                header: 'App 2: Content',
                subHeader: 'This is the content from app2.',
                inputText: 'Custom text: '
            },
            header: 'Module Federation Example: Server Side Rendering',
            header3: 'Type something into this input',
            idField: "1337",
            nameField: "John Doe",
            companyfield: "Acme Inc.",
            regularButton: 'Regular Button',
            loadableButton: 'Loadable Button'
        },
        reactHostNextJsApp: {
            remoteComponents: {
                header: 'This is the React container App hosted at localhost:8080',
                nav: 'Hello from Remote Nextjs component hosted on localhost:8081',
            }
        },
        vueCliApp: {
            sectionsDescriptions: {
                otherSection: 'This is a component from /other-app.I am being imported.I also has my own behavior like fetching data',
                coreSection: 'This is a section from /code.',
                consumerCoreSection: 'I\'m inside the Section component loaded from /core, but my text is defined in /consumer'
            },
            buttonsText: {
                otherSectionButton: 'Click to fetch from FakeApi',
                consumerCoreSectionButton: 'Button imported from /core',
            },
            otherSectionCodeBlock: '{ "userId": 1, "id": 1, "title": "delectus aut autem", "completed": false }',
            consumerSection: {
                header: 'This is /consumer.',
                importMessages: {
                    core: 'The content below is imported from /core',
                    other: 'The content below is imported from /other'
                }
            }
        },
        umdFederationApp: {
            App1: {
                firstHeader: 'Host App 1',
                secondHeader: 'MF App 01',
                thirdHeader: 'UMD App2'
            }
        },
        quasarCliApp: {
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
                counter: 'Counter'
            },
            appButtonDiv: 'App Button',
            appButtonClickMeButton: 'Click me',
            appListDiv: 'AppList',
            names: [
                {name: 'Gualtiero', index: Constants.commonConstantsData.commonIndexes.five},
                {name: 'Riyaz', index: Constants.commonConstantsData.commonIndexes.four},
                {name: 'Quy', index: Constants.commonConstantsData.commonIndexes.three},
                {name: 'Sang', index: Constants.commonConstantsData.commonIndexes.two},
                {name: 'Loris', index: Constants.commonConstantsData.commonIndexes.one}
            ]
        },
        commonMicroFrontendsApps: {
            cardMessages: {
                remoteCard: 'I\'m the remote app',
                hostCard: 'I\'m the host app'
            },
            buttonsText: {
                hostButton: 'Host counter: 0',
                remoteButton: 'Remote counter: 0'
            }
        },
        reactInVueApp: {
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
                buttonText: 'Home Button',
            }
        },
        reactHmrApp: {
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
        angularUniversalSsrApp: {
            inputButtonText: 'Add value',
            tabsNames: [
                Constants.commonConstantsData.home,
                'Angular lazy module',
                'Federation lazy module'
            ],
            addedCities: [
                'Prague',
                'Saint-Petersburg'
            ],
            angularUniversalSsrAddedValuesNames: [
                'one',
                'two',
                'three',
            ],
        },
        vue3CliDemoApp: {
            aboutTab: 'About',
        },
        nextJsReactApp: {
            buttons: {
                remote: 'Remote Button',
                nextJS: 'Next JS Button',
            }
        },
        rustWasmApp: {
            buttonsNames: [
                'Play ▶️',
                'Tick 🔂',
                'Reset ♻️',
                'Stop 🛑'
            ],
        },
        viteReactSimpleApp: {
            buttons: {
                webpack: 'Webpack Remote Button',
                counter: 'count is: 0'
            },
            links: [
                'Learn React',
                'Vite Docs'
            ]
        },
        angularVue: {
            angularAppHead: 'Welcome to the Angular 15 Microfrontend demo using Webpack 5 Module Federation',
            vueWebComponentTitle: 'Vue Remote Custom Element Content',
            vueAsApplicationTitle: 'Vue Remote Create App Content',
            interactionTextInitial: 'Some Content',
            interactionTextChanged: 'Interaction Works'
        },
        nextJSv12App: {
            federatedButton: {
                name: 'Federated Catch All',
                header: 'PDP!!!'
            }
        }
    }

    public static readonly commonPhrases = {
        reactNestedRoutersApp: {
            pagesMessages: {
                page1App1: 'Page 1 from App1',
                pageAApp2: 'Page A from App2',
                page2App1: 'Page 2 from App1',
                pageBApp2: 'Page B from App2',
            },
            loadingMessage: 'Loading App1...',
        },
        vue3DemoFederationWithViteApp: {
            greetings: {
                vite: 'im from Vite',
                webpack: 'im from Webpack',
            }
        },
        dynamicRemotesApp: {
            paragraphText: 'The Dynamic System will take advantage Module Federation remotes and exposes. It will no load components that have been loaded already.',
            widgetParagraphText: [
                'Moment shouldn\'t download twice, the host has no moment.js',
                'Using momentjs for format the date'
            ],
        },
        reduxReducerInjectionApp: {
            welcomeMessage: 'Welcome to Host App',
            remoteAppText: 'RemoteApp',
            remoteAppsNameFromReduxStore: "RemoteApp's name from the redux store : ",
        },
        rustWasmApp: {
            commonHostAppName: 'Host App',
            consoleMessages: {
                startLoopMessage: 'Infinite looping in progress',
                stopLoopMessage: 'Looping successfully stopped',
                tickLoopMessage: 'Game board successfully rerendered',
                resetLoopMessage: 'Game board successfully reset',
                baseLoadingMessage: 'I love rust and wasm!'
            },
        },
        vueCliApp: {
            welcomeMessage: 'Welcome to Your Vue.js + TypeScript App',
            configurationMessage: 'For a guide and recipes on how to configure / customize this project, check out the vue-cli documentation.',
            installedCliPluginsMessage: 'Installed CLI Plugins',
            essentialLinksMessage: 'Essential Links',
            ecosystemLinksMessage: 'Ecosystem',
            aboutTabMessage: 'This is an about page',
            otherAppAlertMessage: 'Data fetched',
        },
        differentAngularVersionsApps: {
            productParagraph: 'This product component is being remotely loaded into the application using Module Federation, angular is shared so the download is minimal for the frontend',
            productLinkText: 'Detail',
            backLink: 'Back',
        },
        vue2InVue3App: {
            appsNames: {
                vue2: 'Vue2 App',
                vue3: 'Vue3 App',
            },
            defaultCounterText: 'count: 0',
            componentState: 'Component in Action..',
        },
        dynamicSystemHostApp: {
            hostParagraph: 'The Dynamic System will take advantage Module Federation ',
            paragraphText: [
                'App2 Moment Dep',
                'for format the date'
            ],
        },
        selfHealingApp: {
            headerName: 'Self-Healing',
            configs: {
                separator: 'shared:',
                searchedString: 'styled-components',
            }
        },
        versionDiscrepancyApp: {
            appsNames: {
                app1: 'App 1 Host',
                app2: 'App 2: Remote',
            },
            lodashVersions: {
                app1: 'Lodash v4.10.0',
                app2: 'Lodash v4.17.21',
            },
            messages: {
                notAvailable: '(lodash.nth not available until lodash@4.11)',
                undefinedVersion: 'typeof lodash.nth// => undefined',
                definedVersion: 'typeof lodash.nth// => function',
            },
            ntxCode: 'nth([\'a\', \'b\'], -1)// => "b"',
            remoteComponentHeader: 'Remote Component',
        },
        completeReactCaseApp: {
            input: 'Test Input',
        },
        sharedRoutingApp: {
            randomSymbolsString: '@#$%^&*()_+',
        },
        vue3DemoApp: {
            appsHeaders: {
                host: '# Hosting App [HOST]',
                remote: '#remote-component [REMOTE]'
            },
            appsNames: {
                layout: 'Layout App 1',
                remote: 'Main App'
            }
        },
        viteSvelteMicroFrontEndsApp: {
            consoleMessages: [
                'I\'m RxJs from host',
                'I\'m RxJs from remote',
                'remote got message:'
            ]
        },
        federatedStyles: {
            header: 'Federated Styles',
            reactAppContainer: 'React App Container',
            nextJsAppContainer: 'NextJs App Container',
            buttonsText: {
                red: 'Red className Button Federated Css injected',
                black: 'Black Button Federated Css variables inject and used in internal css',
                orange: 'Orange Button Federated Scss injected',
                brown: 'Brown Button Federated Less injected',
                yellow: 'Yellow Button Federated Css Module',
                redBlue: 'Red className Button but blue Css Module (classname collision does not affect)',
                aquamarine: 'App 3 Button with Federated Jss styling',
                purple: 'Federated Styled Button',
                tailwindBlue: 'Federated button styled with Tailwind',
                tailwindGreen: 'Button with Federated Tailwind css.',
            }
        },
        craReactApp: {
            hostApp: 'This is the host application.',
            hostAppRemoteMessage: 'This is a component from the remote application',
            remoteApp: 'Remote Application'
        },
        angularUniversalSsrApp: {
            components: {
                rootComponent: 'Root component',
                homeComponent: 'Home component',
                angularLazyComponent: 'Angular lazy route component'
            },
            blockHeaderText: 'Select a city:',
            selectedCityInfo: [
                'The weather in Prague is good![ Angular lazy component ]',
                'The weather in Saint-Petersburg is good![ Angular lazy component ]'
            ],
        },
        thirdPartyScriptsApp: {
            description: 'Check the network tab to see all the third party calls'
        },
        typeScriptMonoRepoApp: {
            yarnWorkspaceDependency: 'workspaces',
        },
        rollupFederationDemoApp: {
            messages: {
                webpackRemote: 'Webpack Remote',
                rollupHost: 'Rollup Host'
            },
            buttonText: 'Webpack Remote Button'
        },
        viteReactSimpleApp: {
            messages: {
                intro: 'Hello Vite + federation! +1+2+3+4',
                edit: 'Edit App.tsx and save to test HMR updates.'
            }
        },
        nextJsHostReactRemoteApp: {
            messages: {
                remotes: {
                    component: 'This component is from the Host React App hosted at localhost:8081',
                    page: 'This is the Remote App'
                },
            },
        },
        nextJsHostRemoteApp: {
            remoteComponentMessage: 'Hello from Remote Nextjs component'
        }
    }

    public static readonly color = {
        nonRgbValues: {
            red: 'color: red;',
            borderBlack: 'border: 1px solid black; padding: 12px;',
            borderRed1px: '1px solid rgb(255, 0, 0)',
            borderRed: 'border: 2px dotted red; padding: 20px;'
        },
        red: 'rgb(136, 0, 0)',
        deepBlue: 'rgb(0, 0, 204)',
        dynamicRemotesWidgetColor: [
            'rgb(255, 0, 0)',
            'rgb(128, 0, 128)'
        ],
        aquamarine: 'rgb(127, 255, 212)',
        chineseSilver: 'rgb(204, 204, 204)',
        darkMutedBlue: 'rgb(75, 75, 232)',
        lightSaturatedYellow: 'rgb(255, 198, 0)',
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
        orange: 'rgb(246, 179, 82)',
        blue: 'rgb(49, 120, 198)',
        black: 'rgb(31, 33, 36)',
        oceanBluePearl: 'rgb(63, 81, 181)',
        alabaster: 'rgb(250, 250, 250)',
        paleVioletRed: 'rgb(219, 112, 147)',
        white: 'rgb(255, 255, 255)',
        lightGrey: 'rgb(239, 239, 239)',
        darkGrey: 'rgb(40, 44, 52)',
        darkSaturatedBlue: 'rgb(0, 0, 255)',
        mint: 'rgb(97, 218, 251)',
        skyBlue: 'rgb(0, 112, 243)',
        lightMint: 'rgb(95, 158, 160)',
        absoluteOrange: 'rgb(255, 165, 0)',
        brown: 'rgb(165, 42, 42)',
        absoluteBlue: 'rgb(0, 0, 255)',
        absoluteRed: 'rgb(255, 0, 0)',
        absolutePurple: 'rgb(128, 0, 128)',
        absoluteBlack: 'rgb(0, 0, 0)',
        tailwindBlue: 'rgb(59, 130, 246)',
        tailwindGreen: 'rgb(34, 197, 94)',
        transparent: 'rgba(0, 0, 0, 0)',
    }

    public static readonly hrefs = {
        vueCliApp: {
            documentation: {
                link: 'https://cli.vuejs.org',
                name: 'vue-cli documentation',
            },
            babel: {
                link: 'https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel',
                name: 'babel',
            },
            router: {
                link: 'https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router',
                name: 'router',
            },
            vuex: {
                link: 'https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex',
                name: 'vuex',
            },
            esLint: {
                link: 'https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint',
                name: 'eslint',
            },
            typeScript: 'https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-typescript',
            coreDocs: {
                link: 'https://vuejs.org',
                name: 'Core Docs',
            },
            forum: {
                link: 'https://forum.vuejs.org',
                name: 'Forum',
            },
            communityChat: {
                link: 'https://chat.vuejs.org',
                name: 'Community Chat',
            },
            twitter: {
                link: 'https://twitter.com/vuejs',
                name: 'Twitter',
            },
            news: {
                link: 'https://news.vuejs.org',
                name: 'News'
            },
            vueRouter: {
                link: 'https://router.vuejs.org',
                name: 'vue-router',
            },
            ecosystemVuex: 'https://vuex.vuejs.org',
            vueDevTools: {
                link: 'https://github.com/vuejs/vue-devtools#vue-devtools',
                name: 'vue-devtools',
            },
            vueLoader: {
                link: 'https://vue-loader.vuejs.org',
                name: 'vue-loader',
            },
            awesomeVue: {
                link: 'https://github.com/vuejs/awesome-vue',
                name: 'awesome-vue',
            },
            aboutTab: '#/about',
        },
        nextJsSsrApp: {
            shop: '/shop',
            checkout: '/checkout',
            zeitGitHub: 'https://github.com/zeit/next.js',
            zeit: 'https://zeit.co/now',
            documentation: 'https://nextjs.org/docs',
            learn: 'https://nextjs.org/learn',
            examples: 'https://github.com/zeit/next.js/tree/master/examples',
            vercelGitHub: 'https://github.com/vercel/next.js',
            vercelHome: 'https://vercel.com/home',
            learnAboutNext: 'https://nextjs.org/learn/foundations/about-nextjs',
            deprecatedMainExamples: 'https://github.com/vercel/next.js/tree/deprecated-main/examples',
        },
        comprehensiveDemoApp: {
            gitHub: 'https://github.com/module-federation/mfe-webpack-demo',
            app3: 'http://localhost:3003/',
            routingDemo: 'http://localhost:3001/#/routing/foo',
            uiLibrary: '#/ui-library',
            demoDialog: '#/dialog',
            demoSvelte: '#/svelte',
        },
        reactHmrApp: {
            button: '/button',
            heading: {
                link: '/heading',
                name: 'Heading',
            },
        },
        angularUniversalSsrLinks: {
            angularLink: '/lazy',
            federationLink: '/federation'
        },
        thirdPartyScriptsPostRequestPath: 'https://www.google-analytics.com/j/collect?**',
        viteReactSimpleApp: {
            viteLink: 'https://vitejs.dev/guide/features.html'
        },
        reactNestedRoutersApp: {
            pageB: '/page-b',
            app1: '/app-1',
        },
        nextJsHostReactRemoteApp: {
            nextJsLink: 'https://nextjs.org/',
            cardsLinks: [
                'https://nextjs.org/docs',
                'https://nextjs.org/learn/foundations/about-nextjs',
                'https://github.com/vercel/next.js/tree/canary/examples',
                Constants.commonConstantsData.commonLinks.vercel
            ]
        },
        angular11SkullyApp: {
            product: '/product'
        }
    }
    public static readonly fullTestData = {
        federatedCssTestData: {
            css: {
                path: 'consume-css-page',
                bgColor: Constants.color.absoluteRed,
            },
            cssModule: {
                path: 'consume-css-module-page',
                bgColor: Constants.color.absoluteRed,
            },
            jss: {
                path: 'consume-jss-page',
                bgColor: Constants.color.aquamarine,
            },
            less: {
                path: 'consume-less-page',
                bgColor: Constants.color.brown,
            },
            scss: {
                path: 'consume-scss-page',
                bgColor: Constants.color.absoluteOrange,
            },
            styledComponent: {
                path: 'consume-styled-component-page',
                bgColor: Constants.color.absolutePurple,
            },
            tailwindGlobal: {
                path: 'consume-tailwind-global-css-page',
                bgColor: Constants.color.tailwindGreen,
            },
            tailwindModule: {
                path: 'consume-tailwind-module-css-page',
                bgColor: Constants.color.tailwindBlue,
            }
        }
    }
}
