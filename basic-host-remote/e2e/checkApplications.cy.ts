import { BaseMethods } from '../../cypress/common/base';
import { baseSelectors } from '../../cypress/common/selectors';
import { Constants } from '../../cypress/fixtures/constants';

const basePage: BaseMethods = new BaseMethods()

let appsData = [
    {
        headerSelector: baseSelectors.tags.headers.h1,
        subHeaderSelector: baseSelectors.tags.headers.h2,
        buttonSelector: baseSelectors.tags.coreElements.button,
        headerText: Constants.commonConstantsData.basicComponents.basicHostRemote,
        appNameText: Constants.commonConstantsData.commonCountAppNames.app1,
        buttonNameText: Constants.updatedConstantsData.commonAppWithButton.app2,
        host: 3001
    },
    {
        headerSelector: baseSelectors.tags.headers.h1,
        subHeaderSelector: baseSelectors.tags.headers.h2,
        buttonSelector: baseSelectors.tags.coreElements.button,
        headerText: Constants.commonConstantsData.basicComponents.basicHostRemote,
        appNameText: Constants.commonConstantsData.commonCountAppNames.app2,
        buttonNameText: Constants.updatedConstantsData.commonAppWithButton.app2,
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
            buttonNameText: string,
            host: number
    }) {
    let host = property.host === 3002 ? appsData[1].host : appsData[0].host;
    let appName = property.host === 3002 ? appsData[1].appNameText : appsData[0].appNameText;


    describe('Basic Host remote', () => {
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
        
            it(`Check buttons in ${appName} exist`, () => {
                basePage.openLocalhost({
                    number: host
                })
                basePage.checkElementWithTextPresence({
                    selector: property.buttonSelector,
                    text: property.buttonNameText
                })
            })
        })
    })
 })
