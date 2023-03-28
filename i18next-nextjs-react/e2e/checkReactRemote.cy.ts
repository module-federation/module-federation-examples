import { BaseMethods } from '../../cypress/common/base';
import { baseSelectors } from '../../cypress/common/selectors';
import { Constants } from '../../cypress/fixtures/constants';

const basePage: BaseMethods = new BaseMethods();

describe('i18next Nextjs React', () => {
    // TODO cy.exec don't build the apps correctly cause lerna executes without exit code. Uncomment after fix this issue!
        // before(() => {
        //     basePage.buildTheSample(Constants.samplesPath.i18nextNextjsReact)
        // })

        // after(() => {
        //     basePage.shutdownTheSample(Constants.samplesPath.i18nextNextjsReact)
        // })
    context("Check React remote", () => {
        beforeEach(() => {
            basePage.openLocalhost({
                number: 3002
            })
        })
    
        it('Check the content of the page exist', () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.updatedConstantsData.reactAppsTranslations.remote.english.button})
    
            basePage.checkElementContainText({
                selector: baseSelectors.ids.app,
                text: Constants.updatedConstantsData.reactAppsTranslations.remote.english.title
            })
            basePage.checkElementContainText({
                selector: baseSelectors.ids.app,
                text: Constants.updatedConstantsData.reactAppsTranslations.remote.english.text
            })
        })
    
        it('Check the language is changed', () => {
            basePage.clickElementWithText({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.updatedConstantsData.reactAppsTranslations.remote.english.button})
    
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.updatedConstantsData.reactAppsTranslations.remote.francais.button})
    
            basePage.checkElementContainText({
                selector: baseSelectors.ids.app,
                text: Constants.updatedConstantsData.reactAppsTranslations.remote.francais.title
            })
            basePage.checkElementContainText({
                selector: baseSelectors.ids.app,
                text: Constants.updatedConstantsData.reactAppsTranslations.remote.francais.text
            })
            basePage.clickElementWithText({
                selector: baseSelectors.tags.coreElements.button,text: Constants.updatedConstantsData.reactAppsTranslations.remote.francais.button})
    
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.updatedConstantsData.reactAppsTranslations.remote.english.button})
    
            basePage.checkElementContainText({
                selector: baseSelectors.ids.app,
                text: Constants.updatedConstantsData.reactAppsTranslations.remote.english.title
            })
            basePage.checkElementContainText({
                selector: baseSelectors.ids.app,
                text: Constants.updatedConstantsData.reactAppsTranslations.remote.english.text
            })
        })
    })
})
