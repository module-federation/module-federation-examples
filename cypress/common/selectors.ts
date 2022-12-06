import {Constants} from "../fixtures/constants";

export const baseSelectors = {
    button: 'button',
    divElement: 'div',
    h1: 'h1',
    h2: 'h2',
    paragraph: 'p'
}

export const selectors = {
    vueAppButton: '.{appType}-content div',
    vueAppButtonsBlock: '.main',
    vueAppAllButtonsClass: '[class*= "content"]'
}

export const updatedSelectors = {
    viteButtonSelector: selectors.vueAppButton.replace('{appType}', Constants.vueAppButtonTypes.viteType),
    webpackButtonSelector: selectors.vueAppButton.replace('{appType}', Constants.vueAppButtonTypes.webpackType),
    vueAppCommonButtonSelector: `${baseSelectors.divElement}${selectors.vueAppAllButtonsClass}`
}

export const widgets = {
    dynamicRemotesWidget: '[data-e2e="APP_{appQuantity}__WIDGET"]',
}

