import {Constants} from "../fixtures/constants";

export const baseSelectors = {
    button: 'button',
    divElement: 'div',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    paragraph: 'p',
    section: 'section',
    appId: '#app',
    image: 'img',
    linkTag: 'a',
    root: '#root',
    style: '[style="{style}"]',
    code: 'code',
    navigation: 'nav',
    navigationItem: '.nav-item',
    table: 'table',
    tableRow: 'tr',
    tableDataCell: 'td',
    tableHeader: 'th',
    input: 'input',
    strong: 'strong',
    toolTip: '.tool-tip',
    textarea: 'textarea',
    tspan: 'tspan',
    header: 'header',
    label: 'label'
}

export const selectors = {
    vueAppTabActiveState: '.router-link-active',
    vueCliAppHomeTabInfo: '.hello',
    vueCliAppAboutTabInfo: '.about',
    hrefSelector: '[href="{link}"]',
    vueAppButton: '.{appType}-content div',
    vueAppButtonsBlock: '.main',
    vueAppAllButtonsClass: '[class*= "content"]',
    sharedStoreCrossFrameworkAppClicksCounter: '[data-e2e="CLICKS_COUNTER"]',
    sharedStoreCrossFrameworkAppButtonsBlock: '[data-e2e="REMOTE_{blockType}__BUTTONS_BLOCK_MODULE"]',
    sharedRoutingAppChart: '.recharts-surface',
    sharedRoutingAppChartGraph: '#recharts_measurement_span',
    sharedRoutingAppRecentOrderRow: '[data-e2e="RECENT_ORDERS_WIDGET__ORDER_ROW"]',
    sharedRoutingAppCloseSideMenuButton: '[data-e2e="CLOSE_SIDE_MENU__BUTTON"]',
    sharedRoutingAppSideMenuVisitPageButtonsBlock: '[data-e2e="VISIT_PAGE__BUTTONS_BLOCK"]',
    sharedRoutingAppInputShrinkAnimation: '[data-shrink="{state}"]',
    sharedRoutingAppCardProfileImage: '[data-e2e="CARD_PROFILE__IMAGE"]',
}

export const updatedSelectors = {
    navigationActiveStateTab:`${baseSelectors.navigation} ${selectors.vueAppTabActiveState}`,
    vueCliAppLinkContainer:`${selectors.vueCliAppHomeTabInfo} ${baseSelectors.linkTag}`,
    viteButtonSelector: selectors.vueAppButton.replace('{appType}', Constants.vueAppButtonTypes.viteType),
    webpackButtonSelector: selectors.vueAppButton.replace('{appType}', Constants.vueAppButtonTypes.webpackType),
    vueAppCommonButtonSelector: `${baseSelectors.divElement}${selectors.vueAppAllButtonsClass}`,
    commonAppNameSelector: `${baseSelectors.divElement} ${baseSelectors.h2}`,
    hamburgerMenuButton: `${baseSelectors.header} ${baseSelectors.button}`
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
    nameField: '[data-e2e="FORM__FILED_NAME"]',
    emailField: '[data-e2e="FORM__FILED_EMAIL"]',
    commonField: '[data-e2e="FORM_FIELD__{fieldName}"]'
}

export const buttons = {
    buttonPrimary: '.btn-primary',
    buttonDanger: '.btn-danger',
    sharedStoreCrossFrameworkAppActionsButtons: {
        decrementButton: '[data-e2e="DECREMENT_BUTTON"]',
        incrementButton: '[data-e2e="INCREMENT_BUTTON"]'
    }
}

export const alertMessages = {
    angularAlertMessage: '.alert-danger'
}

