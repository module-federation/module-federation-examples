import { BaseMethods } from '../../cypress/common/base';
import { baseSelectors } from '../../cypress/common/selectors';
import { Constants } from '../../cypress/fixtures/constants';

const basePage: BaseMethods = new BaseMethods()

let appsData = [
    {
        headerSelector: baseSelectors.h1,
        subHeaderSelector: baseSelectors.h2,
        buttonSelector: baseSelectors.button,
        headerText: Constants.elementsText.basicHostRemoteHeader,
        appNameText: Constants.elementsText.basicHostRemoteFirstAppName,
        buttonNameText: Constants.elementsText.basicHostRemoteButton,
        host: 3001
    },
    {
        headerSelector: baseSelectors.h1,
        subHeaderSelector: baseSelectors.h2,
        buttonSelector: baseSelectors.button,
        headerText: Constants.elementsText.basicHostRemoteHeader,
        appNameText: Constants.elementsText.basicHostRemoteSecondAppName,
        buttonNameText: Constants.elementsText.basicHostRemoteButton,
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
    
        it(`Check buttons in ${appName} exist`, () => {
            basePage.openLocalhost(host)
            basePage.checkElementWithTextPresence({
                selector: property.buttonSelector,
                text: property.buttonNameText
            })
        })
    })
 })
