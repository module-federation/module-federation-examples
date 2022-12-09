import {Constants} from "../fixtures/constants";

export const baseSelectors = {
    button: 'button',
    divElement: 'div',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
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
    nextApp: '#__next',
    listElement: 'li',
    heroSection: '.hero',
    preElement: 'pre',
    cardElement: '.card',
}

export const selectors = {
    vueAppTabActiveState: '.router-link-active',
    vueCliAppHomeTabInfo: '.hello',
    vueCliAppAboutTabInfo: '.about',
    hrefSelector: '[href="{link}"]',
    vueAppButton: '.{appType}-content div',
    vueAppButtonsBlock: '.main',
    vueAppAllButtonsClass: '[class*= "content"]'
}

export const updatedSelectors = {
    navigationActiveStateTab:`${baseSelectors.navigation} ${selectors.vueAppTabActiveState}`,
    vueCliAppLinkContainer:`${selectors.vueCliAppHomeTabInfo} ${baseSelectors.linkTag}`,
    viteButtonSelector: selectors.vueAppButton.replace('{appType}', Constants.vueAppButtonTypes.viteType),
    webpackButtonSelector: selectors.vueAppButton.replace('{appType}', Constants.vueAppButtonTypes.webpackType),
    vueAppCommonButtonSelector: `${baseSelectors.divElement}${selectors.vueAppAllButtonsClass}`,
    commonAppNameSelector: `${baseSelectors.divElement} ${baseSelectors.h2}`,
}

export const widgets = {
    dynamicRemotesWidget: '[data-e2e="APP_{appQuantity}__WIDGET"]',
}

export const blocks = {
    cardBody: '.card-body',
    formGroup: '.form-group'
}

export const fields = {
    nameField: '[data-e2e="FORM__FILED_NAME"]',
    emailField: '[data-e2e="FORM__FILED_EMAIL"]'
}

export const buttons = {
    buttonPrimary: '.btn-primary',
    buttonDanger: '.btn-danger'
}

export const alertMessages = {
    angularAlertMessage: '.alert-danger'
}

