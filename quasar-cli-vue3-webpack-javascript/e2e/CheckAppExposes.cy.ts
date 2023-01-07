import {BaseMethods} from "../../cypress/common/base";
import {baseSelectors} from "../../cypress/common/selectors";
import {selectors} from "../../cypress/common/selectors";
import {buttons} from "../../cypress/common/selectors";
import {Constants} from "../../cypress/fixtures/constants";
const basePage: BaseMethods = new BaseMethods()

const appsData = [
    {
        appExposesName: Constants.elementsText.quasarCli.appExposes.appName,
        appName: Constants.elementsText.quasarCli.appExposes.appName,
        appGeneralName: Constants.elementsText.quasarCli.appGeneral.name,
        appBanner: Constants.elementsText.quasarCli.appExposes.banner,
        appExposesComponentsButton: Constants.elementsText.quasarCli.appExposes.componentsButton,
        AppButtonName: Constants.commonPhrases.button,
        appButtonDiv: Constants.elementsText.quasarCli.appButtonDiv,
        clickMeButton: Constants.elementsText.quasarCli.appButtonClickMeButton,
        appListName: Constants.elementsText.quasarCli.appExposes.list,
        appListDiv: Constants.elementsText.quasarCli.appListDiv,
        host: 3001
    },

    {
        appExposesName: Constants.elementsText.quasarCli.appExposes.appName,
        appName: Constants.elementsText.quasarCli.appGeneral.appName,
        appGeneralName: Constants.elementsText.quasarCli.appGeneral.name,
        appBanner: Constants.elementsText.quasarCli.appGeneral.banner,
        appExposesComponentsButton: Constants.elementsText.quasarCli.appExposes.componentsButton,
        appGeneralRouteButton: Constants.elementsText.quasarCli.appGeneral.routeButton,
        appGeneralSubheader1: Constants.elementsText.quasarCli.appGeneral.subheader1,
        appGeneralSubheader2: Constants.elementsText.quasarCli.appGeneral.subheader2,
        appGeneralCounter: Constants.elementsText.quasarCli.appGeneral.counter,
        clickMeButton: Constants.elementsText.quasarCli.appButtonClickMeButton,
        appListDiv: Constants.elementsText.quasarCli.appListDiv,
        appGeneralName1: Constants.elementsText.quasarCli.appGeneral.name1,
        appGeneralName2: Constants.elementsText.quasarCli.appGeneral.name2,
        appGeneralName3: Constants.elementsText.quasarCli.appGeneral.name3,
        appGeneralName4: Constants.elementsText.quasarCli.appGeneral.name4,
        appGeneralName5: Constants.elementsText.quasarCli.appGeneral.name5,
        host: 3002
    }
]

appsData.forEach((
    property: {
        appName: string,
        appExposesName: string,
        appBanner: string,
        appExposesComponentsButton: string,
        AppButtonName?: string,
        appButtonDiv?: string,
        clickMeButton: string,
        appListName?: string,
        appListDiv: string,
        appListItems?: object,
        appGeneralName: string,
        appGeneralRouteButton?: string,
        appGeneralSubheader1?: string,
        appGeneralSubheader2?: string,
        appGeneralCounter?: string,
        appGeneralName1?: string,
        appGeneralName2?: string,
        appGeneralName3?: string,
        appGeneralName4?: string,
        appGeneralName5?: string,
        host: number

    }
) => {
    describe(`Check App Exposes and App General starts and running`, () => {
        beforeEach(() => {
            basePage.openLocalhost(property.host)
        })
        it (`Check ${property.appName} elements`, () => {
            if (property.host === 3002) {
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.divElement,
                    text: property.appGeneralName
                })
            } else {
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.divElement,
                    text: property.appExposesName
                })
            }
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.h4,
                text: property.appBanner
            })
            basePage.clickElementBySelector({
                selector: baseSelectors.button
            })
            basePage.checkElementExist({
                selector: property.appExposesComponentsButton,
                isVisible: false
            })
            basePage.clickElementBySelector({
                selector: baseSelectors.button
            })
            basePage.clickElementWithText({
                selector: baseSelectors.linkTag,
                text: property.appExposesComponentsButton
            })
            if (property.host === 3002) {
                basePage.clickElementWithText({
                    selector: baseSelectors.linkTag,
                    text: String(property.appGeneralRouteButton),
                    isForce: true
                })
                basePage.checkUrlText(`http://localhost:${property.host}/`, true)
                basePage.clickElementWithText({
                    selector: baseSelectors.linkTag,
                    text: property.appExposesComponentsButton
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.h5,
                    text: String(property.appGeneralSubheader1)
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.h5,
                    text: String(property.appGeneralSubheader2)
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.divElement,
                    text: String(property.appGeneralCounter)
                })
            }
            if (property.host === 3001) {
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.divElement,
                    text: String(property.AppButtonName)
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.divElement,
                    text: String(property.appListName)
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.divElement,
                    text: String(property.appButtonDiv)
                })
            }
            basePage.checkElementWithTextPresence({
                selector: selectors.appExposesCounter,
                text: '0'
            })
            if (property.host === 3002) {
                basePage.checkElementWithTextPresence({
                    selector: selectors.appGeneralCounter,
                    text: '0'
                })
            }
            basePage.clickElementWithText({
                selector: baseSelectors.button,
                text: property.clickMeButton
            })
            basePage.checkElementWithTextPresence({
                selector: selectors.appExposesCounter,
                text: '1'
            })
            if (property.host === 3002) {
                basePage.checkElementWithTextPresence({
                    selector: selectors.appGeneralCounter,
                    text: '1'
                })
            }
            basePage.reloadWindow()
            basePage.checkElementWithTextPresence({
                selector: selectors.appExposesCounter,
                text: '0'
            })
            if (property.host === 3002) {
                basePage.checkElementWithTextPresence({
                    selector: selectors.appGeneralCounter,
                    text: '0'
                })
            }

            basePage.checkElementWithTextPresence({
                selector: baseSelectors.divElement,
                text: property.appListDiv
            })
            basePage.checkElementQuantity({
                selector: selectors.appExposesNames,
                quantity: 5
            })
            basePage.clickElementBySelector({
                selector: selectors.appExposesCloseButton
            })
            basePage.checkElementQuantity({
                selector: selectors.appExposesNames,
                quantity: 4
            })
            basePage.clickElementBySelector({
                selector: selectors.appExposesCloseButton
            })
            basePage.checkElementQuantity({
                selector: selectors.appExposesNames,
                quantity: 3
            })
            basePage.clickElementBySelector({
                selector: selectors.appExposesCloseButton
            })
            basePage.checkElementQuantity({
                selector: selectors.appExposesNames,
                quantity: 2
            })
            basePage.clickElementBySelector({
                selector: selectors.appExposesCloseButton
            })
            basePage.checkElementQuantity({
                selector: selectors.appExposesNames,
                quantity: 1
            })
            basePage.clickElementBySelector({
                selector: selectors.appExposesCloseButton
            })
            basePage.reloadWindow()
            basePage.checkElementQuantity({
                selector: selectors.appExposesNames,
                quantity: 5
            })
            if (property.host === 3002) {
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.divElement,
                    text: String(property.appGeneralName1)
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.divElement,
                    text: String(property.appGeneralName2)
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.divElement,
                    text: String(property.appGeneralName3)
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.divElement,
                    text: String(property.appGeneralName4)
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.divElement,
                    text: String(property.appGeneralName5)
                })
            }
        })
    })
})

