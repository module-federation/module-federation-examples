import {Constants} from "../fixtures/constants";

export const baseSelectors = {
    tags: {
        coreElements: {
            button: 'button',
            div: 'div',
            body: 'body',
            label: 'label',
            link: 'a',
            list: 'li',
            image: 'img',
            spans: {
                span: 'span',
                tspan: 'tspan',
            },
        },
        headers: {
            h1: 'h1',
            h2: 'h2',
            h3: 'h3',
            h4: 'h4',
            h5: 'h5',
            h6: 'h6',
            header: 'header',
        },
        tableElements: {
            table: 'table',
            row: 'tr',
            dataCell: 'td',
            header: 'th'
        },
        inputs: {
            input: 'input',
            textarea: 'textarea',
        },
        paragraph: 'p',
        section: 'section',
        navigation: 'nav',
        code: 'code',
        strong: 'strong',
        emphasis: 'em',
        appRoot: 'app-root',
        pre: 'pre',
        footer: 'footer'
    },
    ids: {
        app: '#app',
        root: '#root',
        parent: '#parent',
    },
    css: {
        style: '[style="{style}"]',
        navigation: '.nav-item',
        checkbox: '[type="checkbox"]',
        href: '[href="{link}"]',
    },
}

export const commonSelectors = {
    commonAngularAppsSelectors: {
        alertMessage: '.alert-danger',
        buttons: {
            primary: '.btn-primary',
            danger: '.btn-danger',
        },
        blocks: {
            cardBody: '.card-body',
            formGroup: '.form-group'
        }
    },
    commonWidget: '[data-e2e="APP_{appQuantity}__WIDGET"]',
    formField: '[data-e2e="FORM_FIELD__{fieldName}"]',
    commonMicroFrontendsAppsCard: '[data-e2e="APP__CARD"]',
    nextJsAppsLinkCard: '[data-e2e="TEXTED_LINK_CARD"]'
}

export const selectors = {
    vue3CliDemoApp: {
        tabs: {
            home: '.hello',
            about: '.about',
        }
    },
    vue3DemoFederationWithViteApp: {
        buttonsBlock: '.main',
        vueAppButton: '.{appType}-content div',
    },
    differentReactVersionsIsolatedApp: {
        divParent: '#parent',
        sharedBlock: '[data-e2e="SHARED__REACT_BLOCK"]',
        commonReactBlock: '[data-e2e="REACT__{blockType}_BLOCK"]'
    },
    reactApp: {
        app2ContentBlock: '[data-e2e="APP_2_CONTENT_BLOCK"]',
    },
    react18Server2Server: {
        idField: '[data-e2e="ID"]',
        NameField: '[data-e2e="Name"]',
        CompanyField: '[data-e2e="Company"]',
    },
    sharedStoreCrossFrameworkApp: {
        clicksCounter: '[data-e2e="CLICKS_COUNTER"]',
        buttonsBlock: '[data-e2e="REMOTE_{blockType}__BUTTONS_BLOCK_MODULE"]',
        actionButtons: {
            increment: '[data-e2e="INCREMENT_BUTTON"]',
            decrement: '[data-e2e="DECREMENT_BUTTON"]',
        }
    },
    sharedRoutingApp: {
        chartComponents: {
            chart: '.recharts-surface',
            graph: '#recharts_measurement_span',
        },
        recentOrdersRow: '[data-e2e="RECENT_ORDERS_WIDGET__ORDER_ROW"]',
        closeSideMenuButton: '[data-e2e="CLOSE_SIDE_MENU__BUTTON"]',
        navigationButtonsBlock: '[data-e2e="NAVIGATION_BUTTONS_BLOCK"]',
        inputShrinkAnimation: '[data-shrink="{state}"]',
        profileImage: '[data-e2e="CARD_PROFILE__IMAGE"]',
        recentOrdersWidgetCell: '[data-e2e="RECENT_ORDERS_WIDGET__{cellType}_CELL"]',
        commonWidgetSelector: '[data-e2e="WIDGET__{selector}_BLOCK"]',
    },
    cssIsolationApp: {
        header: '#root h1',
        name: '#root h2',
    },
    vue3DemoApp : {
        components: {
            remote: '.remote-component',
            layout: '.layout-app',
        },
    },
    viteReactMicroFrontendsApp : {
        symbols: {
            star: '[data-e2e="STAR__SYMBOL"]',
            cloud: '[data-e2e="CLOUD__SYMBOL"]',
        }
    },
    quasarCliVue3WebPackJavaScriptApp: {
        apps: {
            exposes: {
                names: '[data-e2e="EXPOSES_APP_NAMES"]',
                closeButton: '[data-e2e="CLOSE_BUTTON"]',
                counter: '[data-cy="app-button-counter"]',
            },
            general: {
                counter: '[data-e2e="GENERAL_COUNTER"]',
            }
        }
    },
    rustWasmApp: {
        gameBoard: '[data-e2e="GAME_BOARD"]',
    },
    craReactRewiredApp: {
        componentInfo: '[data-e2e="REMOTE_COMPONENT_INFO"]',
    },
    angularUniversalSsrApp: {
        activeTab: '[class="active"]',
        citiesBlock: 'app-client-cities-home',
        selectedCityInfo: 'app-client-city',
    },
    rollupFederationDemoApp: {
        header: '[data-e2e="APP_HEADER"]'
    },
    comprehensiveDemoApp: {
        app2Dialog: '[role="dialog"]',
        blockSelectors: {
            firstBlock: '.makeStyles-root-1',
            secondBlock: '.makeStyles-content-2',
            thirdBlock: '.makeStyles-root-3',
            sideBarBlock: '.makeStyles-drawerPaper-3',
        },
        closeButton: '.closebtn',
        alert: '.alert'
    },
    nativeFederationReactApp: {
        buttons: {
            host: '[data-e2e="HOST_BUTTON"]',
            remote: '[data-e2e="REMOTE_BUTTON"]'
        }
    },
    nextJsSsrApp: {
        nextApp: '#__next',
        heroSection: '.hero',
    },
    completeReactCaseApp: {
        toolTip: '.tool-tip',
    },
    angularVue: {
        btn: '[data="VUE_IN_ANGULAR_BUTTON"]',
        webComponent: 'unique-name',
        interactionText: '[data="VUE_IN_ANGULAR_INTERACTION_TEXT"]',
    },
    federatedCssButton: '[data-e2e="FEDERATED_CSS_BUTTON"]',
    viteReactSimple: {
        reactLink: '[data-e2e="VITE_REACT_APP__LEARN_REACT_LINK"]',
        viteLink: '[data-e2e="VITE_REACT_APP__VITE_DOCS_LINK"]'
    }
}

export const updatedSelectors = {
    common: {
        appName: `${baseSelectors.tags.coreElements.div} ${baseSelectors.tags.headers.h2}`,
    },
    vue3CliDemoApp: {
        navigationActiveStateTab:`${baseSelectors.tags.navigation} .router-link-active`,
        linkContainer: `${selectors.vue3CliDemoApp.tabs.home} ${baseSelectors.tags.coreElements.link}`,
    },
    vue3DemoFederationWithViteApp: {
        buttons: {
            vite: selectors.vue3DemoFederationWithViteApp.vueAppButton.replace('{appType}', Constants.selectorParts.vue3DemoFederationWithViteApp.vite),
            webpack: selectors.vue3DemoFederationWithViteApp.vueAppButton.replace('{appType}', Constants.commonConstantsData.webpack),
            common: `${baseSelectors.tags.coreElements.div}[class*= "content"]`,
        }
    },
    sharedRoutingApp: {
        hamburgerMenuButton: `${baseSelectors.tags.headers.header} ${baseSelectors.tags.coreElements.button}`,
    },
    vueCliApp: {
        sectionElements: {
            name: `${baseSelectors.tags.section} ${baseSelectors.tags.headers.h1}`,
            button: `${baseSelectors.tags.section} ${baseSelectors.tags.coreElements.button}`,
        }
    },
    angularUniversalSsrApp: {
        tab: `${baseSelectors.tags.coreElements.div} ${baseSelectors.tags.coreElements.link}`,
        addedCity: `${selectors.angularUniversalSsrApp.citiesBlock} ${baseSelectors.tags.coreElements.list}`,
    },
    craReactAppRewiredApp: {
        componentBorder: `${selectors.craReactRewiredApp.componentInfo}${baseSelectors.css.style
            .replace('{style}', Constants.color.nonRgbValues.borderRed)}`
    },
    viteReactSimpleApp: {
        headerBlock: `${baseSelectors.tags.headers.header} ${baseSelectors.tags.coreElements.div}`,
    }
}

