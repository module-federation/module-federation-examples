import {BaseMethods} from "../../cypress/common/base";
import {baseSelectors} from "../../cypress/common/selectors";
import {selectors} from "../../cypress/common/selectors"
import {Constants} from "../../cypress/fixtures/constants";
const basePage: BaseMethods = new BaseMethods()

const appsData = [
    {
        appExposesName: Constants.elementsText.quasarCli.appExposes.name,
        appGeneralName: Constants.elementsText.quasarCli.appGeneral.name,
        appExposesBanner: Constants.elementsText.quasarCli.appExposes.banner,
        appExposesComponentsButton: Constants.elementsText.quasarCli.appExposes.componentsButton,
        AppButtonName: Constants.commonPhrases.button,
        appButtonDiv: Constants.elementsText.appButtonDiv,
        clickMeButton: Constants.elementsText.appButtonClickMeButton,
        appListName: Constants.elementsText.quasarCli.appExposes.list,
        appListDiv: Constants.elementsText.appListDiv,
        host: 3001
    },

    {
        appExposesName: Constants.elementsText.quasarCli.appExposes.name,
        appGeneralName: Constants.elementsText.quasarCli.appGeneral.name,
        appGeneralBanner: Constants.elementsText.quasarCli.appGeneral.banner,
        appExposesComponentsButton: Constants.elementsText.quasarCli.appExposes.componentsButton,
        appGeneralRouteButton: Constants.elementsText.quasarCli.appGeneral.routeButton,
        appGeneralSubheader1: Constants.elementsText.quasarCli.appGeneral.subheader1,
        appGeneralSubheader2: Constants.elementsText.quasarCli.appGeneral.subheader2,
        appGeneralCounter: Constants.elementsText.quasarCli.appGeneral.counter,
        clickMeButton: Constants.elementsText.appButtonClickMeButton,
        appListDiv: Constants.elementsText.appListDiv,
        appGeneralName1: Constants.elementsText.quasarCli.appGeneral.name1,
        appGeneralName2: Constants.elementsText.quasarCli.appGeneral.name2,
        appGeneralName3: Constants.elementsText.quasarCli.appGeneral.name3,
        appGeneralName4: Constants.elementsText.quasarCli.appGeneral.name4,
        host: 3002
    }
]

appsData.forEach((
    property: {
        appExposesName?: string,
        appExposesBanner?: string,
        appGeneralBanner?: string,
        appExposesComponentsButton?: string,
        AppButtonName?: string,
        appButtonDiv?: string,
        clickMeButton?: string,
        appListName?: string,
        appListDiv?: string,
        appListItems?: object,
        appGeneralName?: string,
        appGeneralRouteButton?: string,
        appGeneralSubheader1?: string,
        appGeneralSubheader2?: string,
        appGeneralCounter?: string,
        appGeneralName1?: string,
        appGeneralName2?: string,
        appGeneralName3?: string,
        appGeneralName4?: string,
        host: number
        
    }
) => {
    describe(`Check App Exposes and App General starts and running`, () => {
        beforeEach(() => {
            basePage.openLocalhost(property.host)
        })
        it (`Check App Exposes elements`, () => {
            basePage.skipTestByCondition(property.host === 3002)
            basePage.clickElementWithText({
                selector: baseSelectors.divElement,
                text: String(property.appExposesName)
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.h4,
                text: String(property.appExposesBanner)
            })
            basePage.clickElementBySelector({
                selector: baseSelectors.button
            })
            basePage.clickElementBySelector({
                selector: baseSelectors.button
            })
            basePage.clickElementWithText({
                selector: baseSelectors.linkTag,
                text: String(property.appExposesComponentsButton)
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.divElement,
                text: String(property.AppButtonName)
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.divElement,
                text: String(property.appButtonDiv)
            })
            basePage.clickElementWithText({
                selector: baseSelectors.button,
                text: String(property.clickMeButton)
            })
            basePage.checkElementWithTextPresence({
                selector: selectors.appExposesCounter,
                text: '1'
            })
            basePage.reloadWindow()
            basePage.clickElementWithText({
                selector: baseSelectors.linkTag,
                text: String(property.appExposesComponentsButton)
            })
            basePage.checkElementWithTextPresence({
                selector: selectors.appExposesCounter,
                text: '0'
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.divElement,
                text: String(property.appListName)
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.divElement,
                text: String(property.appListDiv)
            })
            basePage.checkElementQuantity({
                selector: selectors.appExposesNames,
                quantity: 5
            })
            basePage.clickElementBySelector({
                selector: selectors.appExposesCloseName,
                index: 1
            })
            basePage.checkElementQuantity({
                selector: selectors.appExposesNames,
                quantity: 4
            })
            basePage.clickElementBySelector({
                selector: selectors.appExposesCloseName,
                index: 1
            })
            basePage.checkElementQuantity({
                selector: selectors.appExposesNames,
                quantity: 3
            })
            basePage.clickElementBySelector({
                selector: selectors.appExposesCloseName,
                index: 1
            })
            basePage.checkElementQuantity({
                selector: selectors.appExposesNames,
                quantity: 2
            })
            basePage.clickElementBySelector({
                selector: selectors.appExposesCloseName,
                index: 1
            })
            basePage.checkElementQuantity({
                selector: selectors.appExposesNames,
                quantity: 1
            })
            basePage.reloadWindow()
            basePage.clickElementWithText({
                selector: baseSelectors.linkTag,
                text: String(property.appExposesComponentsButton)
            })
            basePage.checkElementQuantity({
                selector: selectors.appExposesNames,
                quantity: 5
            })
        })
        it (`Check App General Elements`, () => {
            basePage.skipTestByCondition(property.host === 3001)
            basePage.clickElementWithText({
                selector: baseSelectors.divElement,
                text: String(property.appGeneralName)
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.h4,
                text: String(property.appGeneralBanner)
            })
            basePage.clickElementBySelector({
                selector: baseSelectors.button
            })
            basePage.clickElementBySelector({
                selector: baseSelectors.button
            })
            basePage.clickElementWithText({
                selector: baseSelectors.linkTag,
                text: String(property.appExposesComponentsButton),
                isForce: true
            })
            basePage.clickElementWithText({
                selector: baseSelectors.linkTag,
                text: String(property.appGeneralRouteButton),
                isForce: true
            })
            basePage.checkUrlText(`http://localhost:${property.host}/`, true)
            basePage.clickElementWithText({
                selector: baseSelectors.linkTag,
                text: String(property.appExposesComponentsButton)
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
            basePage.checkElementWithTextPresence({
                selector: selectors.appExposesCounter,
                text: '0'
            })
            basePage.checkElementWithTextPresence({
                selector: selectors.appGeneralCounter,
                text: '0'
            })
            basePage.clickElementWithText({
                selector: selectors.appExposesButton,
                text: String(property.clickMeButton)
            })
            basePage.checkElementWithTextPresence({
                selector: selectors.appExposesCounter,
                text: '1'
            })
            basePage.checkElementWithTextPresence({
                selector: selectors.appGeneralCounter,
                text: '1'
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.divElement,
                text: String(property.appListDiv)
            })
            basePage.checkElementQuantity({
                selector: selectors.appExposesNames,
                quantity: 5
            })
            basePage.clickElementBySelector({
                selector: selectors.appExposesCloseName,
                index: 1
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.divElement,
                text: String(property.appGeneralName1)
            })
            basePage.checkElementQuantity({
                selector: selectors.appExposesNames,
                quantity: 4
            })
            basePage.clickElementBySelector({
                selector: selectors.appExposesCloseName,
                index: 1
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.divElement,
                text: String(property.appGeneralName2)
            })
            basePage.checkElementQuantity({
                selector: selectors.appExposesNames,
                quantity: 3
            })
            basePage.clickElementBySelector({
                selector: selectors.appExposesCloseName,
                index: 1
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.divElement,
                text: String(property.appGeneralName3)
            })
            basePage.checkElementQuantity({
                selector: selectors.appExposesNames,
                quantity: 2
            })
            basePage.clickElementBySelector({
                selector: selectors.appExposesCloseName,
                index: 1
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.divElement,
                text: String(property.appGeneralName4)
            })
            basePage.checkElementQuantity({
                selector: selectors.appExposesNames,
                quantity: 1
            })
        })
    })
})

