import {BaseMethods} from "../../../cypress/common/base";
import {baseSelectors, selectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";
import {CssAttr} from "../../../cypress/types/cssAttr";

const basePage: BaseMethods = new BaseMethods()

describe('It checks rollup-federation-demo apps functionality',  () => {
    const appsData = [
        {
            host: 8081,
            appMessage: Constants.commonPhrases.rollupFederationDemoApp.messages.webpackRemote
        },
        {
            host: 8082,
            appMessage: Constants.commonPhrases.rollupFederationDemoApp.messages.rollupHost
        }
    ]

    appsData.forEach((property: { host: number, appMessage: string }) => {

        it(`Checks texted header visibility`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementWithTextPresence({
                selector: selectors.rollupFederationDemoApp.header,
                text: Constants.elementsText.rollupFederationDemoApp.headerText,
                visibilityState: 'be.visible'
            })
        });

        it(`Checks header color`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementHaveProperty({
                selector: selectors.rollupFederationDemoApp.header,
                prop: CssAttr.backgroundColor,
                value: Constants.color.darkSaturatedBlue
            })
        });

        it(`Checks app message visibility`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h1,
                text: property.appMessage,
                visibilityState: 'be.visible'
            })
        });

        it(`Checks both apps includes button`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementVisibility({
                selector: baseSelectors.tags.coreElements.button
            })
        });

        it(`Checks button is not disabled`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementState({
                selector: baseSelectors.tags.coreElements.button,
                state: 'not.be.disabled'
            })
        });

        it(`Checks button color`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementHaveProperty({
                selector: baseSelectors.tags.coreElements.button,
                prop: CssAttr.backgroundColor,
                value: Constants.color.red
            })
        });

        it(`Checks button text`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.commonPhrases.rollupFederationDemoApp.buttonText,
                visibilityState: 'be.visible'
            })
        });
    });
});
