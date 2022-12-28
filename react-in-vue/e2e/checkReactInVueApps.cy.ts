import { Constants } from './../../cypress/fixtures/constants';
import { baseSelectors, fields } from './../../cypress/common/selectors';
import { property } from 'lit-element';
import { BaseMethods } from '../../cypress/common/base';

const basePage: BaseMethods = new BaseMethods()

const appsData = [
    {
        header: Constants.elementsText.reactInVue.App1.header,
        subHeader: Constants.elementsText.reactInVue.App1.subHeader,
        checkboxName: Constants.elementsText.reactInVue.App1.checkBoxText,
        buttonTextInput: Constants.elementsText.reactInVue.App1.buttonInputText,
        counterText: Constants.elementsText.reactInVue.App1.counterText,
        buttonHeader: Constants.elementsText.reactInVue.App1.buttonHeader,
        buttonText: Constants.elementsText.reactInVue.App1.buttonText,
        host: 3001
    },
    {
        header: Constants.elementsText.reactInVue.App2.header,
        subHeader: Constants.elementsText.reactInVue.App2.subHeader,
        buttonText: Constants.elementsText.reactInVue.App2.buttonText,
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
    describe("Check React in Vue Apps", () => {
        beforeEach(() => {
            basePage.openLocalhost(property.host)
        })
    
        it('Check app build and running & Check apps elements exist', () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.h1,
                text: property.header
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.h2,
                text: property.subHeader
            })
            if(property.host === 3001) {
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.span,
                    text: String(property.checkboxName)
                })
                basePage.checkElementExist({
                    selector: baseSelectors.checkbox
                })
                basePage.checkElementState({
                    selector: baseSelectors.checkbox,
                    state: 'be.checked'
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.span,
                    text: String(property.buttonTextInput)
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.span,
                    text: String(property.counterText)
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.h2,
                    text: String(property.buttonHeader)
                })
            }
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.button,
                text: property.buttonText
            })
        })

        it('Check button visibility after clicking on checkbox', () => {
            basePage.skipTestByCondition(property.host === 3002)
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.button,
                text: property.buttonText
            })
            basePage.clickElementBySelector({
                selector: baseSelectors.checkbox
            })
            basePage.checkElementExist({
                selector: baseSelectors.button,
                isVisible: false
            })
        })

        it('Check change button name', () => {
            basePage.skipTestByCondition(property.host === 3002)
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.button,
                text: property.buttonText
            })
            basePage.fillField({
                selector: fields.commonField.replace('{fieldName}', 'BUTTON_TEXT'),
                text: Constants.elementsText.reactInVue.App1.updatedButtonText
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.button,
                text: Constants.elementsText.reactInVue.App1.updatedButtonText
            })
        })

        it('Check counter value after cliking on button', () => {
            basePage.skipTestByCondition(property.host === 3002)
            basePage.checkElementContainText({
                selector: fields.commonField.replace('{fieldName}', 'COUNTER'),
                text: 0,
                checkType: 'have.value'
            })
            basePage.clickElementBySelector({
                selector: baseSelectors.button
            })
            basePage.checkElementContainText({
                selector: fields.commonField.replace('{fieldName}', 'COUNTER'),
                text: 1,
                checkType: 'have.value'
            })
        })
    })
})
