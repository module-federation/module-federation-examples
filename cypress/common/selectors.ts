import {Constants} from "../fixtures/constants";

export const baseSelectors = {
    button: 'button',
    divElement: 'div',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    paragraph: 'p',
    section: 'section',
    appId: '#app',
    input: 'input',
    image: 'img',
    navigation: 'nav',
    linkTag: 'a',
    root: '#root',
    style: '[style="{style}"]',
    code: 'code',
    parent: '#parent',
    navigationItem: '.nav-item',
    table: 'table',
    tableRow: 'tr',
    tableDataCell: 'td',
    tableHeader: 'th',
    nextApp: '#__next',
    listElement: 'li',
    heroSection: '.hero',
    preElement: 'pre',
    cardElement: '.card',
    strong: 'strong',
    toolTip: '.tool-tip',
    textarea: 'textarea',
    tspan: 'tspan',
    header: 'header',
    label: 'label',
    emphasis: 'em',
    body: 'body',
    unorderedList: 'ul',
    span: 'span',
    checkbox: 'input[type="checkbox"]'
}

export const selectors = {
    vueAppTabActiveState: '.router-link-active',
    vueCliAppHomeTabInfo: '.hello',
    vueCliAppAboutTabInfo: '.about',
    hrefSelector: '[href="{link}"]',
    vueAppButton: '.{appType}-content div',
    vueAppButtonsBlock: '.main',
    vueAppAllButtonsClass: '[class*= "content"]',
    differentReactVersionsIsolatedDivParent: '#parent',
    differentReactVersionsIsolatedDivRoot: '#root',
    sharedStoreCrossFrameworkAppClicksCounter: '[data-e2e="CLICKS_COUNTER"]',
    sharedStoreCrossFrameworkAppButtonsBlock: '[data-e2e="REMOTE_{blockType}__BUTTONS_BLOCK_MODULE"]',
    sharedRoutingAppChart: '.recharts-surface',
    sharedRoutingAppChartGraph: '#recharts_measurement_span',
    sharedRoutingAppRecentOrderRow: '[data-e2e="RECENT_ORDERS_WIDGET__ORDER_ROW"]',
    sharedRoutingAppCloseSideMenuButton: '[data-e2e="CLOSE_SIDE_MENU__BUTTON"]',
    sharedRoutingAppSideMenuVisitPageButtonsBlock: '[data-e2e="VISIT_PAGE__BUTTONS_BLOCK"]',
    sharedRoutingAppInputShrinkAnimation: '[data-shrink="{state}"]',
    sharedRoutingAppCardProfileImage: '[data-e2e="CARD_PROFILE__IMAGE"]',
    cssIsolationAppHeader: '#root h1',
    cssIsolationAppName: '#root h2',
    vue3DemoComponents : {
        remote: '.remote-component',
        layout: '.layout-app',
    },
    commonCardSelector: '[data-e2e="APP__CARD"]',
    viteReactMicroFrontendsCardsSymbols : {
        starSymbol: '[data-e2e="STAR__SYMBOL"]',
        cloudSymbol: '[data-e2e="CLOUD__SYMBOL"]',
    },
    appExposesNames: '[data-e2e="exposesAppNames"]',
    appExposesCloseButton: '[data-e2e="exposesAppNamesClose"]',
    appGeneralCounter: '[data-e2e="General-counter"]',
    appExposesCounter: '[data-cy="app-button-counter"]',
}

export const updatedSelectors = {
    navigationActiveStateTab:`${baseSelectors.navigation} ${selectors.vueAppTabActiveState}`,
    vueCliAppLinkContainer:`${selectors.vueCliAppHomeTabInfo} ${baseSelectors.linkTag}`,
    viteButtonSelector: selectors.vueAppButton.replace('{appType}', Constants.vueAppButtonTypes.viteType),
    webpackButtonSelector: selectors.vueAppButton.replace('{appType}', Constants.vueAppButtonTypes.webpackType),
    vueAppCommonButtonSelector: `${baseSelectors.divElement}${selectors.vueAppAllButtonsClass}`,
    commonAppNameSelector: `${baseSelectors.divElement} ${baseSelectors.h2}`,
    hamburgerMenuButton: `${baseSelectors.header} ${baseSelectors.button}`,
    sectionName: `${baseSelectors.section} ${baseSelectors.h1}`,
    sectionButton: `${baseSelectors.section} ${baseSelectors.button}`
}

export const widgets = {
    dynamicRemotesWidget: '[data-e2e="APP_{appQuantity}__WIDGET"]',
    recentOrdersWidgetCell: '[data-e2e="RECENT_ORDERS_WIDGET__{cellType}_CELL"]',
    sharedRoutingAppCommonWidgetSelector: '[data-e2e="WIDGET__{selector}_BLOCK"]',
}

export const blocks = {
    cardBody: '.card-body',
    formGroup: '.form-group'
}

export const fields = {
    commonField: '[data-e2e="FORM_FIELD__{fieldName}"]'
}

export const buttons = {
    buttonPrimary: '.btn-primary',
    buttonDanger: '.btn-danger',
    sharedStoreCrossFrameworkAppActionsButtons: {
        decrementButton: '[data-e2e="DECREMENT_BUTTON"]',
        incrementButton: '[data-e2e="INCREMENT_BUTTON"]'
    },
    nativeFederationReactButtons: {
        hostButton: '[data-e2e="HOST_BUTTON"]',
        remoteButton: '[data-e2e="REMOTE_BUTTON"]'
    },
    actionButton: 'action-button',
    closeButton: '.closebtn',
    appExposesButton: '[data-cy="app-button"]'
}

export const alertMessages = {
    angularAlertMessage: '.alert-danger',
    alertBox: 'alert-box',
    alert: '.alert'
}

export const block = {
    comprehensiveDemoBlockSelectors: {
        firstBlock: '.makeStyles-root-1',
        secondBlock: '.makeStyles-content-2',
        thirdBlock: '.makeStyles-root-3',
        sideBarBlock: '.makeStyles-drawerPaper-3'
    },
    differentReactVersionsIsolatedSharedBlock: '[data-e2e="SHARED__REACT_BLOCK"]',
    commonReactBlock: '[data-e2e="REACT__{blockType}_BLOCK"]'
}
export const dialogs = {
    comprehensiveDemoDialogApp2: 'div[role="dialog"]'
}
