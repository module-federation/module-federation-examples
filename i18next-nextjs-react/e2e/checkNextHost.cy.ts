import { BaseMethods } from '../../cypress/common/base';
import { baseSelectors } from '../../cypress/common/selectors';
import { Constants } from '../../cypress/fixtures/constants';

const basePage: BaseMethods = new BaseMethods()

describe('i18next Nextjs React', () => {
    context("Check Next host", () => {
        beforeEach(() => {
            basePage.openLocalhost({
                number: 3000
            })
        })
    
        it('Check the content exist on Next host', () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.nextHost.english.button})
    
            basePage.checkElementContainText({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.nextHost.english.text
            })
            basePage.checkElementContainText({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.nextHost.english.title
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
                text: Constants.updatedConstantsData.reactAppsTranslations.nextHost.english.button})
    
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.nextHost.francais.button})
    
            basePage.checkElementContainText({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.nextHost.francais.text
            })
            basePage.checkElementContainText({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.nextHost.francais.title
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
                text: Constants.updatedConstantsData.reactAppsTranslations.nextHost.francais.button})
    
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.nextHost.english.button})
    
            basePage.checkElementContainText({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.nextHost.english.text
            })
            basePage.checkElementContainText({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.nextHost.english.title
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
                text: Constants.updatedConstantsData.reactAppsTranslations.nextHost.francais.button})
    
            basePage.checkElementContainText({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.nextHost.francais.text
            })
            basePage.checkElementContainText({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.nextHost.francais.title
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
                text: Constants.updatedConstantsData.reactAppsTranslations.nextHost.english.button})
                
            basePage.checkElementContainText({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.nextHost.english.text
            })
            basePage.checkElementContainText({
                selector: baseSelectors.tags.section,
                text: Constants.updatedConstantsData.reactAppsTranslations.nextHost.english.title
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
