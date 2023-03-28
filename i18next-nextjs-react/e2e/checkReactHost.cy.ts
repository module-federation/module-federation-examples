import { BaseMethods } from '../../cypress/common/base';
import { baseSelectors } from '../../cypress/common/selectors';
import { Constants } from '../../cypress/fixtures/constants';

const basePage: BaseMethods = new BaseMethods()

describe('i18next Nextjs React', () => {
    // TODO cy.exec don't build the apps correctly cause lerna executes without exit code. Uncomment after fix this issue!
        // before(() => {
        //     basePage.buildTheSample(Constants.samplesPath.i18nextNextjsReact)
        // })

        // after(() => {
        //     basePage.shutdownTheSample(Constants.samplesPath.i18nextNextjsReact)
        // })
    context("Check Next host", () => {
        beforeEach(() => {
            basePage.openLocalhost({
                number: 3001
            })
        })
    
        it('Check the content exist on React host', () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.host.english.button})
    
            basePage.checkElementContainText({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.host.english.text
            })
            basePage.checkElementContainText({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.host.english.title
            })
    
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.remote.english.button})
    
            basePage.checkElementContainText({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.remote.english.title
            })
            basePage.checkElementContainText({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.remote.english.text
            })
        })
    
        it('Check the language is changed from Next section', () => {
            basePage.clickElementWithText({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.host.english.button})
    
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.host.francais.button})
    
            basePage.checkElementContainText({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.host.francais.text
            })
            basePage.checkElementContainText({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.host.francais.title
            })
    
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.remote.francais.button})
                
            basePage.checkElementContainText({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.remote.francais.title
            })
            basePage.checkElementContainText({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.remote.francais.text
            })
    
            basePage.clickElementWithText({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.host.francais.button})
    
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.host.english.button})
    
            basePage.checkElementContainText({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.host.english.text
            })
            basePage.checkElementContainText({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.host.english.title
            })
    
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.remote.english.button})
    
            basePage.checkElementContainText({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.remote.english.title
            })
            basePage.checkElementContainText({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.remote.english.text
            })
        })
    
        it('Check the language is changed from remote child section', () => {
            basePage.clickElementWithText({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.remote.english.button})
    
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.host.francais.button})
    
            basePage.checkElementContainText({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.host.francais.text
            })
            basePage.checkElementContainText({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.host.francais.title
            })
    
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.remote.francais.button})
    
            basePage.checkElementContainText({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.remote.francais.title
            })
            basePage.checkElementContainText({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.remote.francais.text
            })
            
            basePage.clickElementWithText({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.remote.francais.button})
    
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.host.english.button})
    
            basePage.checkElementContainText({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.host.english.text
            })
            basePage.checkElementContainText({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.host.english.title
            })
    
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.remote.english.button})
    
            basePage.checkElementContainText({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.remote.english.title
            })
            basePage.checkElementContainText({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.remote.english.text
            })
        })
    })
})
