import { BaseMethods } from '../../../cypress/common/base';
import { baseSelectors } from '../../../cypress/common/selectors';
import { Constants } from '../../../cypress/fixtures/constants';

const basePage: BaseMethods = new BaseMethods()

let appsData = [
    {
        headerSelector: baseSelectors.h1,
        subHeaderSelector: baseSelectors.h2,
        buttonSelector: baseSelectors.button,
        headerText: Constants.elementsText.automaticVendorContent,
        appNameText: Constants.elementsText.automaticVendorFirstAppName,
        buttonColor: Constants.color.red,
        host: 3001
    },
    {
        headerSelector: baseSelectors.h1,
        subHeaderSelector: baseSelectors.h2,
        buttonSelector: baseSelectors.button,
        headerText: Constants.elementsText.automaticVendorContent,
        appNameText: Constants.elementsText.automaticVendorSecondAppName,
        buttonColor: Constants.color.blue,
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
            buttonColor: string,
            host: number
    }) {
    let host = property.host === 3002 ? appsData[1].host : appsData[0].host;
    let appName = property.host === 3002 ? appsData[1].appNameText : appsData[0].appNameText;
    let color = property.host === 3002 ? appsData[1].buttonColor : appsData[0].buttonColor;
    let appButtonPosition: number = 0;

    describe(`Check ${appName}`, () => {
        // TODO cy.exec don't build the apps correctly cause lerna executes without exit code. Uncomment after fix this issue!
        // before(() => {
        //     basePage.buildTheSample(Constants.samplesPath.AdvancedApiAutomaticVendorSharing)
        // })
    
        // after(() => {
        //     basePage.shutdownTheSample(Constants.samplesPath.AdvancedApiAutomaticVendorSharing)
        // })
    
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
    
        it(`Check buttons in ${appName} exist`, () => {
            basePage.openLocalhost(host)
            basePage.checkElementWithTextPresence({
                selector: property.buttonSelector,
                text: `${appName} ${Constants.commonText.button}`
            })
        })

        it(`Check button property in ${appName}`, () => {
            basePage.checkElementPositionbyText(
                property.buttonSelector,
                `${appName} ${Constants.commonText.button}`,
                appButtonPosition
            )
            basePage.checkElementWithTextHaveProperty({
                selector: property.buttonSelector,
                text: `${appName} ${Constants.commonText.button}`,
                prop: Constants.commonText.background,
                value: color
            })
        })
    })
})
