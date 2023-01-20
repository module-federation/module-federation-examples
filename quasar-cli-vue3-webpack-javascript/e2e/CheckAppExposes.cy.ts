import {BaseMethods} from "../../cypress/common/base";
import {baseSelectors} from "../../cypress/common/selectors";
import {selectors} from "../../cypress/common/selectors";
import {Constants} from "../../cypress/fixtures/constants";
const basePage: BaseMethods = new BaseMethods()

const appsData = [
    {
        appName: Constants.elementsText.quasarCli.appExposes.appName,
        appBanner: Constants.elementsText.quasarCli.appExposes.banner,
        appExposesComponentsButton: Constants.elementsText.quasarCli.appExposes.componentsButton,
        clickMeButton: Constants.elementsText.quasarCli.appButtonClickMeButton,
        appListDiv: Constants.elementsText.quasarCli.appListDiv,
        host: 3001
    },
    {
        appName: Constants.elementsText.quasarCli.appGeneral.name,
        appBanner: Constants.elementsText.quasarCli.appGeneral.banner,
        appExposesComponentsButton: Constants.elementsText.quasarCli.appExposes.componentsButton,
        clickMeButton: Constants.elementsText.quasarCli.appButtonClickMeButton,
        appListDiv: Constants.elementsText.quasarCli.appListDiv,
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
    describe(`Check App Exposes and App General starts and running`, () => {
        const listNames = Constants.elementsText.quasarCli.names;

        beforeEach(() => {
            basePage.openLocalhost(property.host)
        })
        it(`Check ${property.appName} elements`, () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.divElement,
                text: property.appName
            })
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
                    text: Constants.elementsText.quasarCli.appGeneral.routeButton,
                    isForce: true
                })
                basePage.checkUrlText(property.host.toString(), true)
                basePage.clickElementWithText({
                    selector: baseSelectors.linkTag,
                    text: property.appExposesComponentsButton
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.h5,
                    text: Constants.elementsText.quasarCli.appGeneral.subheader1,
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.h5,
                    text: Constants.elementsText.quasarCli.appGeneral.subheader2,
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.divElement,
                    text: Constants.elementsText.quasarCli.appGeneral.counter,
                })
            }
            if (property.host === 3001) {
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.divElement,
                    text: Constants.commonPhrases.button
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.divElement,
                    text: Constants.elementsText.quasarCli.appExposes.list,
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.divElement,
                    text: Constants.elementsText.quasarCli.appButtonDiv,
                })
            }
        })

        it(`Check counters in ${property.appName} app`, () => {
            basePage.clickElementWithText({
                selector: baseSelectors.linkTag,
                text: property.appExposesComponentsButton
            })
            basePage.checkElementWithTextPresence({
                selector: selectors.appExposesCounter,
                text: Constants.elementsText.quasarCli.counter.startValue
            })
            if (property.host === 3002) {
                basePage.checkElementWithTextPresence({
                    selector: selectors.appGeneralCounter,
                    text: Constants.elementsText.quasarCli.counter.startValue
                })
            }
            basePage.clickElementWithText({
                selector: baseSelectors.button,
                text: property.clickMeButton
            })
            basePage.checkElementWithTextPresence({
                selector: selectors.appExposesCounter,
                text: Constants.elementsText.quasarCli.counter.valueAfterClick
            })
            if (property.host === 3002) {
                basePage.checkElementWithTextPresence({
                    selector: selectors.appGeneralCounter,
                    text: Constants.elementsText.quasarCli.counter.valueAfterClick
                })
            }
            basePage.reloadWindow()
            basePage.checkElementWithTextPresence({
                selector: selectors.appExposesCounter,
                text: Constants.elementsText.quasarCli.counter.startValue
            })
            if (property.host === 3002) {
                basePage.checkElementWithTextPresence({
                    selector: selectors.appGeneralCounter,
                    text: Constants.elementsText.quasarCli.counter.startValue
                })
            }
        })

        it(`Check list of elements in ${property.appName} app`, () => {
            basePage.clickElementWithText({
                selector: baseSelectors.linkTag,
                text: property.appExposesComponentsButton
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.divElement,
                text: property.appListDiv
            })
            listNames.forEach((element) => {
                basePage.checkElementQuantity({
                    selector: selectors.appExposesNames,
                    quantity: element.index
                })
                basePage.clickElementBySelector({
                    selector: selectors.appExposesCloseButton
                })
            })
            if(property.host === 3002) {
                listNames.forEach((element) => {
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.divElement,
                        text: String(element.name)
                    })
                })
            }
        })
    })
})

