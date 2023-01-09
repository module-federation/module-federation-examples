import {BaseMethods} from "../../cypress/common/base";
import {baseSelectors} from "../../cypress/common/selectors";
import {selectors} from "../../cypress/common/selectors";
import {Constants} from "../../cypress/fixtures/constants";
const basePage: BaseMethods = new BaseMethods()

const appsData = [
    {
        appName: Constants.elementsText.quasarCliApp.appExposes.appName,
        appBanner: Constants.elementsText.quasarCliApp.appExposes.banner,
        appExposesComponentsButton: Constants.elementsText.quasarCliApp.appExposes.componentsButton,
        clickMeButton: Constants.elementsText.quasarCliApp.appButtonClickMeButton,
        appListDiv: Constants.elementsText.quasarCliApp.appListDiv,
        host: 3001
    },
    {
        appName: Constants.elementsText.quasarCliApp.appGeneral.name,
        appBanner: Constants.elementsText.quasarCliApp.appGeneral.banner,
        appExposesComponentsButton: Constants.elementsText.quasarCliApp.appExposes.componentsButton,
        clickMeButton: Constants.elementsText.quasarCliApp.appButtonClickMeButton,
        appListDiv: Constants.elementsText.quasarCliApp.appListDiv,
        host: 3002
    }
]

appsData.forEach((
    property: {
        appName: string,
        appBanner: string,
        appExposesComponentsButton: string,
        clickMeButton: string,
        appListDiv: string,
        host: number

    }
) => {
    describe(`Quasar CLI Vue3 Webpack JS`, () => {
        context(`Check App Exposes and App General starts and running`, () => {
            const listNames = Constants.elementsText.quasarCliApp.names;

            beforeEach(() => {
                basePage.openLocalhost({
                    number: property.host
                })
            })
            it(`Check ${property.appName} elements`, () => {
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.div,
                    text: property.appName
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.headers.h4,
                    text: property.appBanner
                })
                basePage.clickElementBySelector({
                    selector: baseSelectors.tags.coreElements.button,
                })
                basePage.checkElementVisibility({
                    selector: property.appExposesComponentsButton,
                    isVisible: false
                })
                basePage.clickElementBySelector({
                    selector: baseSelectors.tags.coreElements.button,
                })
                basePage.clickElementWithText({
                    selector: baseSelectors.tags.coreElements.link,
                    text: property.appExposesComponentsButton
                })
                if (property.host === 3002) {
                    basePage.clickElementWithText({
                        selector: baseSelectors.tags.coreElements.link,
                        text: Constants.elementsText.quasarCliApp.appGeneral.routeButton,
                        isForce: true
                    })
                    basePage.checkUrlText(property.host.toString(), true)
                    basePage.clickElementWithText({
                        selector: baseSelectors.tags.coreElements.link,
                        text: property.appExposesComponentsButton
                    })
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.headers.h5,
                        text: Constants.elementsText.quasarCliApp.appGeneral.subheader1,
                    })
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.headers.h5,
                        text: Constants.elementsText.quasarCliApp.appGeneral.subheader2,
                    })
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.coreElements.div,
                        text: Constants.elementsText.quasarCliApp.appGeneral.counter,
                    })
                }
                if (property.host === 3001) {
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.coreElements.div,
                        text: Constants.commonConstantsData.button
                    })
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.coreElements.div,
                        text: Constants.elementsText.quasarCliApp.appExposes.list,
                    })
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.coreElements.div,
                        text: Constants.elementsText.quasarCliApp.appButtonDiv,
                    })
                }
            })
    
            it(`Check counters in ${property.appName} app`, () => {
                basePage.clickElementWithText({
                    selector: baseSelectors.tags.coreElements.link,
                    text: property.appExposesComponentsButton
                })
                basePage.checkElementWithTextPresence({
                    selector: selectors.quasarCliVue3WebPackJavaScriptApp.apps.exposes.counter,
                    text: Constants.commonConstantsData.commonIndexes.zero.toString()
                })
                if (property.host === 3002) {
                    basePage.checkElementWithTextPresence({
                        selector: selectors.quasarCliVue3WebPackJavaScriptApp.apps.general.counter,
                        text: Constants.commonConstantsData.commonIndexes.zero.toString()
                    })
                }
                basePage.clickElementWithText({
                    selector: baseSelectors.tags.coreElements.button,
                    text: property.clickMeButton
                })
                basePage.checkElementWithTextPresence({
                    selector: selectors.quasarCliVue3WebPackJavaScriptApp.apps.exposes.counter,
                    text: Constants.commonConstantsData.commonIndexes.one.toString()
                })
                if (property.host === 3002) {
                    basePage.checkElementWithTextPresence({
                        selector: selectors.quasarCliVue3WebPackJavaScriptApp.apps.general.counter,
                        text: Constants.commonConstantsData.commonIndexes.one.toString()
                    })
                }
                basePage.reloadWindow()
                basePage.checkElementWithTextPresence({
                    selector: selectors.quasarCliVue3WebPackJavaScriptApp.apps.exposes.counter,
                    text: Constants.commonConstantsData.commonIndexes.one.toString()
                })
                if (property.host === 3002) {
                    basePage.checkElementWithTextPresence({
                        selector: selectors.quasarCliVue3WebPackJavaScriptApp.apps.general.counter,
                        text: Constants.commonConstantsData.commonIndexes.zero.toString()
                    })
                }
            })
    
            it(`Check list of elements in ${property.appName} app`, () => {
                basePage.clickElementWithText({
                    selector: baseSelectors.tags.coreElements.link,
                    text: property.appExposesComponentsButton
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.div,
                    text: property.appListDiv
                })
                listNames.forEach((element) => {
                    basePage.checkElementQuantity({
                        selector: selectors.quasarCliVue3WebPackJavaScriptApp.apps.exposes.names,
                        quantity: element.index
                    })
                    basePage.clickElementBySelector({
                        selector: selectors.quasarCliVue3WebPackJavaScriptApp.apps.exposes.closeButton,
                    })
                })
                if(property.host === 3002) {
                    listNames.forEach((element) => {
                        basePage.checkElementWithTextPresence({
                            selector: baseSelectors.tags.coreElements.div,
                            text: String(element.name)
                        })
                    })
                }
            })
        })
    })
})

