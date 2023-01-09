import { BaseMethods } from '../../cypress/common/base';
import { baseSelectors, selectors } from '../../cypress/common/selectors';
import { Constants } from '../../cypress/fixtures/constants';
import { CssAttr } from '../../cypress/types/cssAttr';

const basePage: BaseMethods = new BaseMethods()

let appsData = [
    {
        headerSelector: selectors.cssIsolationApp.header,
        subHeaderSelector: selectors.cssIsolationApp.name,
        buttonSelector: baseSelectors.tags.coreElements.button,
        headerText: Constants.elementsText.cssIsolationApp.headers.app1,
        appNameText: Constants.commonConstantsData.commonCountAppNames.app1,
        host: 3001
    },
    {
        headerSelector: selectors.cssIsolationApp.header,
        subHeaderSelector: selectors.cssIsolationApp.name,
        buttonSelector: baseSelectors.tags.coreElements.button,
        headerText: Constants.elementsText.cssIsolationApp.headers.app2,
        appNameText: Constants.commonConstantsData.commonCountAppNames.app2,
        host: 3002
    }
]

appsData.forEach(
    function(
        property: { 
            headerSelector: string
            subHeaderSelector: string
            buttonSelector: string,
            headerText: string,
            appNameText: string,
            host: number
    }) {
    let host = property.host === 3002 ? appsData[1].host : appsData[0].host;
    let appName = property.host === 3002 ? appsData[1].appNameText : appsData[0].appNameText;

    describe('CSS isolation', () => {
        context(`Check ${appName}`, () => {
            it(`Check ${appName} built and running`, () => {
                basePage.openLocalhost({
                    number: host
                })
                basePage.checkElementWithTextPresence({
                    selector: property.headerSelector,
                    text: property.headerText
                })
                basePage.checkElementWithTextPresence({
                    selector: property.subHeaderSelector,
                    text: `${appName}`
                })
            })
        })
    })
})

describe('CSS isolation', () => {
    context('Check App 1', () => {
        it(`Check button in App 1 exist`, () => {
            basePage.openLocalhost({
                number: 3001
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.ids.parent,
                text: Constants.elementsText.cssIsolationApp.buttonText,
                isShadowRoot: true
            })
        })
    })
})

describe('CSS isolation', () => {
    context('Check App 1 colors', () => {
        beforeEach(() => {
            basePage.openLocalhost({
                number: 3001
            })
            });
        it(`Check App 1 color text`, () => {
            
            basePage.checkElementHaveProperty({
                selector: baseSelectors.tags.headers.h1,
                prop: CssAttr.color,
                value: Constants.color.green,
            })
        })
        it(`Update background color of App 2 Inside App 1 if click on the "Make Everything Yellow" button`, () => {
            basePage.clickElementWithText({
                selector: baseSelectors.ids.parent,
                text: Constants.elementsText.cssIsolationApp.buttonText,
                isShadowRoot: true
            })
            basePage.checkElementHaveProperty({
                parentSelector: baseSelectors.ids.parent,
                selector: 'style',
                prop: CssAttr.backgroundColor,
                value: Constants.color.yellow,
                isShadowElement: true
            })
        })
    })
})

describe('CSS isolation', () => {
    context('Check App 2 colors', () => {
        beforeEach(() => {
            basePage.openLocalhost({
                number: 3002
            })
            });
        it(`Check button in App 2 exist`, () => {
            
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.cssIsolationApp.buttonText
            })
        })
        it(`Update background color of App 2 if click on the "Make Everything Yellow" button`, () => {
            basePage.clickElementWithText({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.cssIsolationApp.buttonText
            })
            basePage.checkElementHaveProperty({
                selector: baseSelectors.ids.root,
                prop: CssAttr.backgroundColor,
                value: Constants.color.yellow,
            })
        })
    })
})
