import { BaseMethods } from '../../cypress/common/base';
import { baseSelectors, selectors } from '../../cypress/common/selectors';
import { Constants } from '../../cypress/fixtures/constants';
import { CssAttr } from '../../cypress/types/cssAttr';

const basePage: BaseMethods = new BaseMethods()

let appsData = [
    {
        headerSelector: selectors.cssIsolationAppHeader,
        subHeaderSelector: selectors.cssIsolationAppName,
        buttonSelector: baseSelectors.button,
        headerText: Constants.elementsText.cssIsolationApp1Header,
        appNameText: Constants.elementsText.cssIsolationApp1Name,
        host: 3001
    },
    {
        headerSelector: selectors.cssIsolationAppHeader,
        subHeaderSelector: selectors.cssIsolationAppName,
        buttonSelector: baseSelectors.button,
        headerText: Constants.elementsText.cssIsolationApp2Header,
        appNameText: Constants.elementsText.cssIsolationApp2Name,
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

    describe(`Check ${appName}`, () => {
        it(`Check ${appName} built and running`, () => {
            basePage.openLocalhost(host)
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

describe(`Check App 1`, () => {
    it(`Check button in App 1 exist`, () => {
        basePage.openLocalhost(3001)
        basePage.checkElementInsideShadowRoot({
            selector: baseSelectors.parent,
            text: Constants.commonText.cssIsolationButton
        })
    })
})
describe(`Check App 1 colors`, () => {
    beforeEach(() => {
        basePage.openLocalhost(3001)
        });
    it(`Check App 1 color text`, () => {
        
        basePage.checkElementHaveProperty({
            selector: baseSelectors.h1,
            prop: CssAttr.color,
            value: Constants.color.green,
        })
    })
    it(`Update background color of App 2 Inside App 1 if click on the "Make Everything Yellow" button`, () => {
        basePage.clickElementInsideShadowRoot({
            selector: baseSelectors.parent,
            text: Constants.commonText.cssIsolationButton
        })
        basePage.checkElementPropertyInsideShadowRoot({
            selector: baseSelectors.parent,
            subSelector: 'style',
            prop: CssAttr.backgroundColor,
            value: Constants.color.yellow,
        })
    })
})
describe(`Check App 2 colors`, () => {
    beforeEach(() => {
        basePage.openLocalhost(3002)
        });
    it(`Check button in App 2 exist`, () => {
        
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.commonText.cssIsolationButton
        })
    })
    it(`Update background color of App 2 if click on the "Make Everything Yellow" button`, () => {
        basePage.clickElementWithText({
            selector: baseSelectors.button,
            text: Constants.commonText.cssIsolationButton
        })
        basePage.checkElementHaveProperty({
            selector: baseSelectors.root,
            prop: CssAttr.backgroundColor,
            value: Constants.color.yellow,
        })
    })
})



