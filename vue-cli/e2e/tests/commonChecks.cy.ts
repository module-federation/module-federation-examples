import {BaseMethods} from "../../../cypress/common/base";
import {VueCliMethods} from "../methods/methods";
import {baseSelectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";

const basePage: BaseMethods = new BaseMethods()
const methodsPage: VueCliMethods = new VueCliMethods()

describe('It checks elements appearing and accessibility', () =>{
    const appsData = [
        {
            host: 8080
        },
        {
            host: 9000
        },
        {
            host: 9001
        }
    ]

    appsData.forEach((property: { host: number }) => {
        it('Checks that fetched code appears on click and disappears after reload', () => {
            basePage.skipTestByCondition(property.host === 9000)
            basePage.openLocalhost(property.host)
            methodsPage.checkCodeTagAppearance()
        })

        it('Checks core section visibility & core section description header', () => {
            basePage.skipTestByCondition(property.host === 9001)
            basePage.openLocalhost(property.host)
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.section,
                text: Constants.elementsText.vueCliApp.sectionsDescriptions.coreSection,
                visibilityState: 'be.visible'
            })
        })

        it('Checks core section includes button with text', () => {
            basePage.skipTestByCondition(property.host === 9001)
            basePage.openLocalhost(property.host)
            basePage.checkElementWithTextPresence({
                parentSelector: baseSelectors.section,
                selector: baseSelectors.button,
                text: property.host === 8080 ? Constants.elementsText.vueCliApp.buttonsText.consumerCoreSectionButton :
                    Constants.commonConstantsData.button,
                visibilityState: 'be.visible'
            })
        })

        it('Checks core section button is not disabled', () => {
            basePage.skipTestByCondition(property.host === 9001)
            basePage.openLocalhost(property.host)
            basePage.checkElementState({
                selector: baseSelectors.button,
                text: property.host === 8080 ? Constants.elementsText.vueCliApp.buttonsText.otherSectionButton :
                    Constants.commonConstantsData.button,
                state: 'not.be.disabled'
            })
        })

        it('Checks other section with description visibility', () => {
            basePage.skipTestByCondition(property.host === 9000)
            basePage.openLocalhost(property.host)
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.section,
                text: Constants.elementsText.vueCliApp.sectionsDescriptions.otherSection,
                visibilityState: 'be.visible'
            })
        })

        it('Checks that other section does not contain name header', () => {
            basePage.skipTestByCondition(property.host === 9000)
            basePage.openLocalhost(property.host)
            basePage.checkChildElementVisibility(baseSelectors.section, baseSelectors.h1, false, '',
                Constants.elementsText.vueCliApp.sectionsDescriptions.otherSection)
        })

        it('Checks that other section includes button', () => {
            basePage.skipTestByCondition(property.host === 9000)
            basePage.openLocalhost(property.host)
            basePage.checkElementWithTextPresence({
                parentSelector: baseSelectors.section,
                selector: baseSelectors.button,
                text: Constants.elementsText.vueCliApp.buttonsText.otherSectionButton,
                visibilityState: 'be.visible'
            })
        })

        it('Checks other section button text', () => {
            basePage.skipTestByCondition(property.host === 9000)
            basePage.openLocalhost(property.host)
            basePage.checkElementWithTextPresence({
                parentSelector: baseSelectors.section,
                selector: baseSelectors.button,
                text: Constants.elementsText.vueCliApp.buttonsText.otherSectionButton,
                visibilityState: 'be.visible'
            })
        })

        it('Checks other section button is not disabled', () => {
            basePage.skipTestByCondition(property.host === 9000)
            basePage.openLocalhost(property.host)
            basePage.checkElementState({
                selector: baseSelectors.button,
                text: Constants.elementsText.vueCliApp.buttonsText.otherSectionButton,
                state: 'not.be.disabled'
            })
        })
    });
});
