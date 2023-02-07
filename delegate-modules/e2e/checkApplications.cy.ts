import { BaseMethods } from '../../cypress/common/base';
import { baseSelectors } from '../../cypress/common/selectors';
import { Constants } from '../../cypress/fixtures/constants';

const basePage: BaseMethods = new BaseMethods()

let appsData = [
    {
        appNameText: Constants.commonConstantsData.commonCountAppNames.app1,
        host: 3001
    },
    {
        appNameText: Constants.commonConstantsData.commonCountAppNames.app2,
        host: 3002
    }
]

appsData.forEach(
    function(
        property: { 
            appNameText: string,
            host: number
    }) {
    let host = property.host === 3002 ? appsData[1].host : appsData[0].host;
    let appName = property.host === 3002 ? appsData[1].appNameText : appsData[0].appNameText;


    describe(`Check ${property.appNameText}`, () => {
  
        it(`Check header block with text visibility`, () => {
            basePage.openLocalhost(host)
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h1,
                text: Constants.commonConstantsData.basicComponents.basicHostRemote,
                visibilityState: 'be.visible'
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h2,
                text: `${property.appNameText}`,
                visibilityState: 'be.visible'
            })
        })
    
        it(`Check button text visibility`, () => {
            basePage.openLocalhost(host)
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.updatedConstantsData.commonAppWithButton.app2,
                visibilityState: 'be.visible'
            })
        })
    })
 })
