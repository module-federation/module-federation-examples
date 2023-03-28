import {BaseMethods} from "../../../cypress/common/base";
import {VueCliMethods} from "../methods/methods";
import {baseSelectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";

const basePage: BaseMethods = new BaseMethods()
const methodsPage: VueCliMethods = new VueCliMethods()

describe('Vue CLI', () =>{
    context('It checks elements appearing and accessibility', () => {
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
                basePage.openLocalhost({
                    number: property.host
                })
                methodsPage.checkCodeTagAppearance()
            })
    
            it('Checks core section visibility & core section description header', () => {
                basePage.skipTestByCondition(property.host === 9001)
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.section,
                    text: Constants.elementsText.vueCliApp.sectionsDescriptions.coreSection,
                    visibilityState: 'be.visible'
                })
            })
    
            it('Checks core section includes button with text', () => {
                basePage.skipTestByCondition(property.host === 9001)
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkElementWithTextPresence({
                    parentSelector: baseSelectors.tags.section,
                    selector: baseSelectors.tags.coreElements.button,
                    text: property.host === 8080 ? Constants.elementsText.vueCliApp.buttonsText.consumerCoreSectionButton :
                        Constants.commonConstantsData.button,
                    visibilityState: 'be.visible'
                })
            })
    
            it('Checks core section button is not disabled', () => {
                basePage.skipTestByCondition(property.host === 9001)
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkElementState({
                    selector: baseSelectors.tags.coreElements.button,
                    text: property.host === 8080 ? Constants.elementsText.vueCliApp.buttonsText.otherSectionButton :
                        Constants.commonConstantsData.button,
                    state: 'not.be.disabled'
                })
            })
    
            it('Checks other section with description visibility', () => {
                basePage.skipTestByCondition(property.host === 9000)
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.section,
                    text: Constants.elementsText.vueCliApp.sectionsDescriptions.otherSection,
                    visibilityState: 'be.visible'
                })
            })
    
            it('Checks that other section does not contain name header', () => {
                basePage.skipTestByCondition(property.host === 9000)
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkElementVisibility({
                    parentSelector: baseSelectors.tags.section,
                    selector: baseSelectors.tags.headers.h1,
                    isVisible: false,
                    text: Constants.elementsText.vueCliApp.sectionsDescriptions.otherSection
                })
            })
    
            it('Checks that other section includes button', () => {
                basePage.skipTestByCondition(property.host === 9000)
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkElementWithTextPresence({
                    parentSelector: baseSelectors.tags.section,
                    selector: baseSelectors.tags.coreElements.button,
                    text: Constants.elementsText.vueCliApp.buttonsText.otherSectionButton,
                    visibilityState: 'be.visible'
                })
            })
    
            it('Checks other section button text', () => {
                basePage.skipTestByCondition(property.host === 9000)
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkElementWithTextPresence({
                    parentSelector: baseSelectors.tags.section,
                    selector: baseSelectors.tags.coreElements.button,
                    text: Constants.elementsText.vueCliApp.buttonsText.otherSectionButton,
                    visibilityState: 'be.visible'
                })
            })
    
            it('Checks other section button is not disabled', () => {
                basePage.skipTestByCondition(property.host === 9000)
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkElementState({
                    selector: baseSelectors.tags.coreElements.button,
                    text: Constants.elementsText.vueCliApp.buttonsText.otherSectionButton,
                    state: 'not.be.disabled'
                })
            })
        });
    });
});
