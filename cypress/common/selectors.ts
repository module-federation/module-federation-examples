import {Constants} from "../fixtures/constants";

export const baseSelectors = {
    button: 'button',
    divElement: 'div',
    h1: 'h1',
    h2: 'h2',
    paragraph: 'p',
    section: 'section',
    appId: '#app',
    image: 'img',
    navigation: 'nav',
    linkTag: 'a',
    root: '#root',
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
    vueAppCommonButtonSelector: `${baseSelectors.divElement}${selectors.vueAppAllButtonsClass}`
}

export const widgets = {
    dynamicRemotesWidget: '[data-e2e="APP_{appQuantity}__WIDGET"]',
}

