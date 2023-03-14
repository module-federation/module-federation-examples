import { BaseMethods } from "../../../cypress/common/base";
import {baseSelectors, selectors, updatedSelectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";

const basePage: BaseMethods = new BaseMethods()

describe('Vue 3 CLI Demo', () => {
    context('It checks certain texted button contains link and not disabled', () => {
        const textedLinks = [
            {
                text: Constants.hrefs.vueCliApp.documentation.name,
                link: Constants.hrefs.vueCliApp.documentation.link,
            },
            {
                text: Constants.hrefs.vueCliApp.babel.name,
                link: Constants.hrefs.vueCliApp.babel.link,
            },
            {
                text: Constants.hrefs.vueCliApp.router.name,
                link: Constants.hrefs.vueCliApp.router.link,
            },
            {
                text: Constants.hrefs.vueCliApp.vuex.name,
                link: Constants.hrefs.vueCliApp.vuex.link,
            },
            {
                text: Constants.hrefs.vueCliApp.esLint.name,
                link: Constants.hrefs.vueCliApp.esLint.link,
            },
            {
                text: Constants.commonConstantsData.typeScript,
                link: Constants.hrefs.vueCliApp.typeScript,
            },
            {
                text: Constants.hrefs.vueCliApp.coreDocs.name,
                link: Constants.hrefs.vueCliApp.coreDocs.link,
            },
            {
                text: Constants.hrefs.vueCliApp.forum.name,
                link: Constants.hrefs.vueCliApp.forum.link,
            },
            {
                text: Constants.hrefs.vueCliApp.communityChat.name,
                link: Constants.hrefs.vueCliApp.communityChat.link,
            },
            {
                text: Constants.hrefs.vueCliApp.twitter.name,
                link: Constants.hrefs.vueCliApp.twitter.link,
            },
            {
                text: Constants.hrefs.vueCliApp.news.name,
                link: Constants.hrefs.vueCliApp.news.link,
            },
            {
                text: Constants.hrefs.vueCliApp.vueRouter.name,
                link: Constants.hrefs.vueCliApp.vueRouter.link,
            },
            {
                text: Constants.hrefs.vueCliApp.vuex.name,
                link: Constants.hrefs.vueCliApp.ecosystemVuex,
            },
            {
                text: Constants.hrefs.vueCliApp.vueDevTools.name,
                link: Constants.hrefs.vueCliApp.vueDevTools.link,
            },
            {
                text: Constants.hrefs.vueCliApp.vueLoader.name,
                link: Constants.hrefs.vueCliApp.vueLoader.link,
            },
            {
                text: Constants.hrefs.vueCliApp.awesomeVue.name,
                link: Constants.hrefs.vueCliApp.awesomeVue.link,
            },
        ]
    
        textedLinks.forEach((property: { text: string, link: string }) => {
            it(`Check that ${property.text} text includes link and not disabled`, () => {
                basePage.openLocalhost({
                    number: 8081
                })
                basePage.checkElementContainText({
                    selector: updatedSelectors.vue3CliDemoApp.linkContainer,
                    text: property.text,
                    link: property.link
                })
            })
        });
    });
});

describe('Vue 3 CLI Demo', () => {
    context('It checks messages on page visibility', () => {
        const messages = [
            {
                message: Constants.commonPhrases.vueCliApp.welcomeMessage,
            },
            {
                message: Constants.commonPhrases.vueCliApp.configurationMessage,
            },
            {
                message: Constants.commonPhrases.vueCliApp.installedCliPluginsMessage,
            },
            {
                message: Constants.commonPhrases.vueCliApp.essentialLinksMessage,
            },
            {
                message: Constants.commonPhrases.vueCliApp.ecosystemLinksMessage,
            },
        ]
    
        messages.forEach((property: { message: string }) => {
            it(`Check that ${property.message} text is visible`, () => {
                basePage.openLocalhost({
                    number: 8081
                })
                basePage.checkElementWithTextPresence({
                    selector: selectors.vue3CliDemoApp.tabs.home,
                    text: property.message,
                    visibilityState: 'be.visible'
                })
            })
        });
    });
});

describe('Vue 3 CLI Demo', () => {
    context('Checks tabs and logo', () => {
        beforeEach(() => {
            basePage.openLocalhost({
                number: 8081
            })
        })
    
        it('Checks vue logo visibility', () => {
            basePage.checkElementVisibility({
                selector: baseSelectors.tags.coreElements.image
            })
        })
    
        it('Checks that host link is not contain `about` if `about` tab is not active', () => {
            basePage.checkElementWithTextPresence({
                    selector: updatedSelectors.vue3CliDemoApp.navigationActiveStateTab,
                    text: Constants.elementsText.vue3CliDemoApp.aboutTab,
                    isVisible: false
            })
            basePage.checkUrlText(Constants.elementsText.vue3CliDemoApp.aboutTab.toLowerCase())
        })
    
        it('Checks that host link is contain `about` if `about` tab is active', () => {
            basePage.checkElementWithTextPresence({
                selector: updatedSelectors.vue3CliDemoApp.navigationActiveStateTab,
                text: Constants.elementsText.vue3CliDemoApp.aboutTab,
                isVisible: false
            })
            basePage.checkUrlText(Constants.elementsText.vue3CliDemoApp.aboutTab.toLowerCase())
            basePage.clickElementBySelector({
               selector: baseSelectors.css.href.replace('{link}', Constants.hrefs.vueCliApp.aboutTab)
            })
            basePage.checkElementWithTextPresence(  {
                selector: updatedSelectors.vue3CliDemoApp.navigationActiveStateTab,
                text: Constants.elementsText.vue3CliDemoApp.aboutTab,
            })
            basePage.checkUrlText(Constants.elementsText.vue3CliDemoApp.aboutTab.toLowerCase(), true)
        })
    
        it('Checks text on active about tab', () => {
            basePage.clickElementBySelector({
                selector: baseSelectors.css.href.replace('{link}', Constants.hrefs.vueCliApp.aboutTab)
            })
            basePage.checkElementWithTextPresence(  {
                selector: updatedSelectors.vue3CliDemoApp.navigationActiveStateTab,
                text: Constants.elementsText.vue3CliDemoApp.aboutTab,
            })
            basePage.checkElementWithTextPresence(  {
                selector: selectors.vue3CliDemoApp.tabs.about,
                text: Constants.commonPhrases.vueCliApp.aboutTabMessage,
                visibilityState: 'be.visible'
            })
        })
    
        it('Checks that both tabs are not disabled', () => {
            basePage.checkElementState({
               selector: baseSelectors.css.href.replace('{link}', Constants.hrefs.vueCliApp.aboutTab),
                state: 'not.be.disabled'
            })
            basePage.clickElementBySelector({
               selector:  baseSelectors.css.href.replace('{link}', Constants.hrefs.vueCliApp.aboutTab)
            })
            basePage.checkElementWithTextPresence({
                selector: updatedSelectors.vue3CliDemoApp.navigationActiveStateTab,
                text: Constants.elementsText.vue3CliDemoApp.aboutTab,
            })
            basePage.checkElementState({
                selector: baseSelectors.css.href.replace('{link}', Constants.commonConstantsData.commonLinks.cellLink),
                state: 'not.be.disabled'
            })
            basePage.clickElementBySelector({
                selector: baseSelectors.css.href.replace('{link}', Constants.commonConstantsData.commonLinks.cellLink)
            })
            basePage.checkElementWithTextPresence({
                selector: updatedSelectors.vue3CliDemoApp.navigationActiveStateTab,
                text: Constants.commonConstantsData.home,
            })
        })
    })
})
