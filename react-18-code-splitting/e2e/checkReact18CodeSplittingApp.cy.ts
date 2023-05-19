import { Constants } from '../../cypress/fixtures/constants';
import { baseSelectors, selectors } from '../../cypress/common/selectors';
import { BaseMethods } from "../../cypress/common/base";

const basePage: BaseMethods = new BaseMethods()

const appsData = [
    {
        appName: Constants.elementsText.react18CodeSplittingApp.app1.appName,
        appHeader2: Constants.elementsText.reactApps.app1.subHeader,
        host: 3000
    },
    {
        appName: Constants.elementsText.react18CodeSplittingApp.app2.appName,
        appHeader2: Constants.elementsText.reactApps.app2.subHeader,
        host: 3001
    }
]

appsData.forEach(
    function(
        property: { 
            appName: string,
            appHeader2: string,
            host: number
    }) {

    describe('React 18 Code Splitting', () => {
        
        context(`Check ${property.appName}`, () => {
            it('Check App headers and buttons visability', () => {
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.headers.h1,
                    text: Constants.elementsText.react18CodeSplittingApp.header,
                    visibilityState: 'be.visible'
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.headers.h2,
                    text: `${property.appHeader2}`,
                    visibilityState: 'be.visible'
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.headers.h3,
                    text: Constants.elementsText.reactApps.header3,
                    visibilityState: 'be.visible'
                })
                basePage.checkElementVisibility({
                    selector: baseSelectors.tags.inputs.input
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.button,
                    text: Constants.elementsText.react18CodeSplittingApp.button,
                    visibilityState: 'be.visible'
             })
        })
        
            it('Check that App 2 Content Block with filled text appear', () => {
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.fillField({
                    selector: baseSelectors.tags.inputs.input,
                    text: Constants.commonConstantsData.standardPhrase
                })
                basePage.clickElementBySelector({
                    selector: baseSelectors.tags.coreElements.button,
                })
                basePage.checkElementWithTextPresence({
                    selector:  `${selectors.reactApp.app2ContentBlock} ${baseSelectors.tags.headers.h2}`,
                    text: Constants.elementsText.reactApps.splitedApp.header,
                    visibilityState: 'be.visible'
                })
                basePage.checkElementWithTextPresence({
                    selector:  `${selectors.reactApp.app2ContentBlock} ${baseSelectors.tags.paragraph}`,
                    text: Constants.elementsText.reactApps.splitedApp.subHeader,
                    visibilityState: 'be.visible'
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.strong,
                    text: Constants.commonConstantsData.standardPhrase,
                    visibilityState: 'be.visible'
                })
            })
        })
    })
})
