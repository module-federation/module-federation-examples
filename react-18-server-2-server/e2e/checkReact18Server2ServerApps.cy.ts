import { Constants } from '../../cypress/fixtures/constants';
import { baseSelectors, selectors } from '../../cypress/common/selectors';
import { BaseMethods } from "../../cypress/common/base";

const basePage: BaseMethods = new BaseMethods()

describe('React 18 Server 2 Server', () => {
    context('Check App1', () => {
        beforeEach(() => {
            basePage.openLocalhost({
                number: 3000
            })
        })
        it('Check App headers and buttons visability', () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h1,
                text: Constants.elementsText.reactApps.header,
                visibilityState: 'be.visible'
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h2,
                text: Constants.elementsText.reactApps.app1.subHeader,
                visibilityState: 'be.visible'
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h3,
                text: Constants.elementsText.reactApps.header3,
                visibilityState: 'be.visible'
            })
            basePage.checkElementVisibility({
                selector: baseSelectors.tags.inputs.input
            })
            basePage.checkElementWithTextPresence({
                selector: selectors.react18Server2Server.idField,
                text: Constants.elementsText.reactApps.idField,
                visibilityState: 'be.visible'
            })
            basePage.checkElementWithTextPresence({
                selector: selectors.react18Server2Server.NameField,
                text: Constants.elementsText.reactApps.nameField,
                visibilityState: 'be.visible'
            })
            basePage.checkElementWithTextPresence({
                selector: selectors.react18Server2Server.CompanyField,
                text: Constants.elementsText.reactApps.companyfield,
                visibilityState: 'be.visible'
            })
        })

        it('Check that App 2 Content Block with filled text appear', () => {
            basePage.fillField({
                selector: baseSelectors.tags.inputs.input,
                text: Constants.commonConstantsData.standardPhrase
            })
            basePage.checkElementWithTextPresence({
                selector:  `${selectors.reactApp.app2ContentBlock} ${baseSelectors.tags.headers.h2}`,
                text: Constants.elementsText.reactApps.splitedApp.header,
                visibilityState: 'be.visible'
            })
            basePage.checkElementWithTextPresence({
                selector:  `${selectors.reactApp.app2ContentBlock} ${baseSelectors.tags.paragraph}`,
                text: Constants.elementsText.reactApps.splitedApp.subHeader,
                visibilityState: 'be.visible'
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.strong,
                text: Constants.commonConstantsData.standardPhrase,
                visibilityState: 'be.visible'
            })
        })
    })
})

describe('React 18 Server 2 Server', () => {
    context('Check App2', () => {
        beforeEach(() => {
            basePage.openLocalhost({
                number: 3001
            })
        })
    
        it('Check App elements visability', () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h1,
                text: Constants.elementsText.reactApps.header,
                visibilityState: 'be.visible'
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h2,
                text: Constants.elementsText.reactApps.app2.subHeader,
                visibilityState: 'be.visible'
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h3,
                text: Constants.elementsText.reactApps.header3,
                visibilityState: 'be.visible'
            })
            basePage.checkElementVisibility({
                selector: baseSelectors.tags.inputs.input
            })
        })
        it('Check that App 2 Content Block with filled text appear', () => {
            basePage.fillField({
                selector: baseSelectors.tags.inputs.input,
                text: Constants.commonConstantsData.standardPhrase
            })
            basePage.checkElementWithTextPresence({
                selector:  `${selectors.reactApp.app2ContentBlock} ${baseSelectors.tags.headers.h2}`,
                text: Constants.elementsText.reactApps.splitedApp.header,
                visibilityState: 'be.visible'
            })
            basePage.checkElementWithTextPresence({
                selector:  `${selectors.reactApp.app2ContentBlock} ${baseSelectors.tags.paragraph}`,
                text: Constants.elementsText.reactApps.splitedApp.subHeader,
                visibilityState: 'be.visible'
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.strong,
                text: Constants.commonConstantsData.standardPhrase,
                visibilityState: 'be.visible'
            })
        })
    })
})

