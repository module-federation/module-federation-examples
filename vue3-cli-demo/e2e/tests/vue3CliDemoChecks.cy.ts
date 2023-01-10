import { BaseMethods } from "../../../cypress/common/base";
import {baseSelectors, selectors, updatedSelectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";

const basePage: BaseMethods = new BaseMethods()

describe('It checks certain texted button contains link and not disabled', () => {
    const textedLinks = [
        {
            text: Constants.linksNames.vueCliAppDocumentationLinkName,
            link: Constants.hrefs.vueCliAppDocumentationLink,
        },
        {
            text: Constants.linksNames.vueCliAppBabelLinkName,
            link: Constants.hrefs.vueCliAppBabelLink,
        },
        {
            text: Constants.linksNames.vueCliAppRouterLinkName,
            link: Constants.hrefs.vueCliAppRouterLink,
        },
        {
            text: Constants.linksNames.vueCliAppVuexLinkName,
            link: Constants.hrefs.vueCliAppVuexLink,
        },
        {
            text: Constants.linksNames.vueCliAppEsLintLinkName,
            link: Constants.hrefs.vueCliAppEsLintLink,
        },
        {
            text: Constants.linksNames.vueCliAppTypeScriptLinkName,
            link: Constants.hrefs.vueCliAppTypeScriptLink,
        },
        {
            text: Constants.linksNames.vueCliAppCoreDocsLinkName,
            link: Constants.hrefs.vueCliAppCoreDocsLink,
        },
        {
            text: Constants.linksNames.vueCliAppForumLinkName,
            link: Constants.hrefs.vueCliAppForumLink,
        },
        {
            text: Constants.linksNames.vueCliAppCommunityChatLinkName,
            link: Constants.hrefs.vueCliAppCommunityChatLink,
        },
        {
            text: Constants.linksNames.vueCliAppTwitterLinkName,
            link: Constants.hrefs.vueCliAppTwitterLink,
        },
        {
            text: Constants.linksNames.vueCliAppNewsLinkName,
            link: Constants.hrefs.vueCliAppNewsLink,
        },
        {
            text: Constants.linksNames.vueCliAppVueRouterLinkName,
            link: Constants.hrefs.vueCliAppVueRouterLink,
        },
        {
            text: Constants.linksNames.vueCliAppVuexLinkName,
            link: Constants.hrefs.vueCliAppEcosystemVuexLink,
        },
        {
            text: Constants.linksNames.vueCliAppVueDevtoolsLinkName,
            link: Constants.hrefs.vueCliAppVueDevToolsLink,
        },
        {
            text: Constants.linksNames.vueCliAppVueLoaderLinkName,
            link: Constants.hrefs.vueCliAppVueLoaderLink,
        },
        {
            text: Constants.linksNames.vueCliAppAwesomeVueLinkName,
            link: Constants.hrefs.vueCliAppAwesomeVueLink,
        },
    ]

    textedLinks.forEach((property: { text: string, link: string }) => {
        it(`Check that ${property.text} text includes link and not disabled`, () => {
            basePage.openLocalhost(8081)
            basePage.checkElementWithTextContainsLink(updatedSelectors.vueCliAppLinkContainer, property.text, property.link)
        })
    });
});

describe('It checks messages on page visibility', () => {
    const messages = [
        {
            message: Constants.commonPhrases.vueCliAppWelcomeMessage
        },
        {
            message: Constants.commonPhrases.vueCliAppConfigurationMessage
        },
        {
            message: Constants.commonPhrases.vueCliAppInstalledCliPluginsMessage
        },
        {
            message: Constants.commonPhrases.vueCliAppEssentialLinksMessage
        },
        {
            message: Constants.commonPhrases.vueCliAppEcosystemLinksMessage
        },
    ]

    messages.forEach((property: { message: string }) => {
        it(`Check that ${property.message} text is visible`, () => {
            basePage.openLocalhost(8081)
            basePage.checkElementWithTextPresence({
                selector: selectors.vueCliAppHomeTabInfo,
                text: property.message,
                visibilityState: 'be.visible'
            })
        })
    });
});

describe("Checks tabs and logo", () => {
    beforeEach(() => {
        basePage.openLocalhost(8081)
    })

    it('Checks vue logo visibility', () => {
        basePage.checkElementVisibility(baseSelectors.image)
    })

    it('Checks that host link is not contain `about` if `about` tab is not active', () => {
        basePage.checkElementWithTextPresence({
                selector: updatedSelectors.navigationActiveStateTab,
                text: Constants.tabsNames.aboutTab,
               isVisible: false
        })
        basePage.checkUrlText(Constants.tabsNames.aboutTab.toLowerCase())
    })

    it('Checks that host link is contain `about` if `about` tab is active', () => {
        basePage.checkElementWithTextPresence({
            selector: updatedSelectors.navigationActiveStateTab,
            text: Constants.tabsNames.aboutTab,
            isVisible: false
        })
        basePage.checkUrlText(Constants.tabsNames.aboutTab.toLowerCase())
        basePage.clickElementBySelector({
           selector: selectors.hrefSelector.replace('{link}', Constants.hrefs.vueCliAppAboutTabLink)
        })
        basePage.checkElementWithTextPresence(  {
            selector: updatedSelectors.navigationActiveStateTab,
            text: Constants.tabsNames.aboutTab,
        })
        basePage.checkUrlText(Constants.tabsNames.aboutTab.toLowerCase(), true)
    })

    it('Checks text on active about tab', () => {
        basePage.clickElementBySelector({
            selector: selectors.hrefSelector.replace('{link}', Constants.hrefs.vueCliAppAboutTabLink)
        })
        basePage.checkElementWithTextPresence(  {
            selector: updatedSelectors.navigationActiveStateTab,
            text: Constants.tabsNames.aboutTab,
        })
        basePage.checkElementWithTextPresence(  {
            selector: selectors.vueCliAppAboutTabInfo,
            text: Constants.commonPhrases.vueCliAppAboutTabMessage,
            visibilityState: 'be.visible'
        })
    })

    it('Checks that both tabs are not disabled', () => {
        basePage.checkElementState({
           selector: selectors.hrefSelector.replace('{link}', Constants.hrefs.vueCliAppAboutTabLink),
            state: 'not.be.disabled'
        })
        basePage.clickElementBySelector({
           selector:  selectors.hrefSelector.replace('{link}', Constants.hrefs.vueCliAppAboutTabLink)
        })
        basePage.checkElementWithTextPresence({
            selector: updatedSelectors.navigationActiveStateTab,
            text: Constants.tabsNames.aboutTab,
        })
        basePage.checkElementState({
            selector: selectors.hrefSelector.replace('{link}', Constants.hrefs.vueCliAppHomeTabLink),
            state: 'not.be.disabled'
        })
        basePage.clickElementBySelector({
            selector: selectors.hrefSelector.replace('{link}', Constants.hrefs.vueCliAppHomeTabLink)
        })
        basePage.checkElementWithTextPresence({
            selector: updatedSelectors.navigationActiveStateTab,
            text: Constants.tabsNames.homeTab,
        })
    })
})
