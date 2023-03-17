import { Constants } from './../../cypress/fixtures/constants';
import {baseSelectors, commonSelectors} from './../../cypress/common/selectors';
import { BaseMethods } from '../../cypress/common/base';

const basePage: BaseMethods = new BaseMethods()

const appsData = [
    {
        header: Constants.elementsText.reactInVueApp.App1.header,
        subHeader: Constants.elementsText.reactInVueApp.App1.subHeader,
        checkboxName: Constants.elementsText.reactInVueApp.App1.checkBoxText,
        buttonTextInput: Constants.elementsText.reactInVueApp.App1.buttonInputText,
        counterText: Constants.elementsText.reactInVueApp.App1.counterText,
        buttonHeader: Constants.elementsText.reactInVueApp.App1.buttonHeader,
        buttonText: Constants.elementsText.reactInVueApp.App1.buttonText,
        host: 3001
    },
    {
        header: Constants.commonConstantsData.basicComponents.basicHostRemote,
        subHeader: Constants.commonConstantsData.home,
        buttonText: Constants.elementsText.reactInVueApp.App2.buttonText,
        host: 3002
    }
]

appsData.forEach((
    property: {
        header: string,
        subHeader: string,
        checkboxName?: string,
        buttonTextInput?: string,
        counterText?: string,
        buttonHeader?: string,
        buttonText: string,
        host: number
    }
) => {
    describe("React in Vue", () => {
        context('Check React in Vue Apps', () => {
            beforeEach(() => {
                basePage.openLocalhost({
                    number: property.host
                })
            })
        
            it('Check app build and running & Check apps elements exist', () => {
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.headers.h1,
                    text: property.header
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.headers.h2,
                    text: property.subHeader
                })
                if(property.host === 3001) {
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.coreElements.spans.span,
                        text: String(property.checkboxName)
                    })
                    basePage.checkElementVisibility({
                        selector: baseSelectors.css.checkbox
                    })
                    basePage.checkElementState({
                        selector: baseSelectors.css.checkbox,
                        state: 'be.checked'
                    })
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.coreElements.spans.span,
                        text: String(property.buttonTextInput)
                    })
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.coreElements.spans.span,
                        text: String(property.counterText)
                    })
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.headers.h2,
                        text: String(property.buttonHeader)
                    })
                }
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.button,
                    text: property.buttonText
                })
            })
    
            it('Check button visibility after clicking on checkbox', () => {
                basePage.skipTestByCondition(property.host === 3002)
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.button,
                    text: property.buttonText
                })
                basePage.clickElementBySelector({
                    selector: baseSelectors.css.checkbox
                })
                basePage.checkElementVisibility({
                    selector: baseSelectors.tags.coreElements.button,
                    isVisible: false
                })
            })
    
            it('Check change button name', () => {
                basePage.skipTestByCondition(property.host === 3002)
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.button,
                    text: property.buttonText
                })
                basePage.fillField({
                    selector: commonSelectors.formField.replace('{fieldName}', 'BUTTON_TEXT'),
                    text: Constants.elementsText.reactInVueApp.App1.updatedButtonText
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.button,
                    text: Constants.elementsText.reactInVueApp.App1.updatedButtonText
                })
            })
    
            it('Check counter value after cliking on button', () => {
                basePage.skipTestByCondition(property.host === 3002)
                basePage.checkElementContainText({
                    selector: commonSelectors.formField.replace('{fieldName}', 'COUNTER'),
                    text: 0,
                    checkType: 'have.value'
                })
                basePage.clickElementBySelector({
                    selector: baseSelectors.tags.coreElements.button,
                })
                basePage.checkElementContainText({
                    selector: commonSelectors.formField.replace('{fieldName}', 'COUNTER'),
                    text: 1,
                    checkType: 'have.value'
                })
            })
        })
    })
})
