import {BaseMethods} from "../../cypress/common/base";
import {Constants} from "../../cypress/fixtures/constants";
import {baseSelectors} from "../../cypress/common/selectors";

const basePage: BaseMethods = new BaseMethods()
const messages: string[] = [
    Constants.commonPhrases.reactNestedRoutersApp.pagesMessages.page1App1,
    Constants.commonPhrases.reactNestedRoutersApp.pagesMessages.page2App1,
    Constants.commonPhrases.reactNestedRoutersApp.pagesMessages.pageAApp2,
    Constants.commonPhrases.reactNestedRoutersApp.pagesMessages.pageBApp2,
]

describe('React Nested Routers', () => {
    context("It checks shell app", () => {
        beforeEach(() => {
            basePage.openLocalhost({
                number: 8080
            })
        })
    
        it('Checks that base link set to app 1', () => {
            basePage.checkUrlText(Constants.hrefs.reactNestedRoutersApp.app1, true)
        })

        it('Checks all texted links visibility', () => {
            Constants.elementsText.reactNestedRoutersApp.shellAppTextedLinks.forEach((link: string) => {
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.body,
                    text: Constants.commonPhrases.reactNestedRoutersApp.loadingMessage,
                    isVisible: false
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.link,
                    text: link,
                    visibilityState: 'be.visible'
                })
            })
        })

        it('Checks base page message & clicks each link by text & checks changes in page message and url & check reload does not revert changes', () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.body,
                text: Constants.commonPhrases.reactNestedRoutersApp.loadingMessage,
                isVisible: false
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.div,
                text: Constants.commonPhrases.reactNestedRoutersApp.pagesMessages.page1App1,
                visibilityState: 'be.visible'
            })
            Constants.elementsText.reactNestedRoutersApp.shellAppTextedLinks.forEach((link: string, index: number) => {
                basePage.checkUrlText(index === 4 ? Constants.elementsText.reactNestedRoutersApp.shellAppLinks[2]: Constants.elementsText.reactNestedRoutersApp.shellAppLinks[index], false)
                if (index !== 0) {
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.coreElements.div,
                        text: index === 4 ? messages[2]: messages[index],
                        isVisible: false
                    })
                }
                basePage.clickElementWithText({
                    selector: baseSelectors.tags.coreElements.link,
                    text: index === 4 ? link.replace(Constants.elementsText.reactNestedRoutersApp.replaceValues[0], Constants.elementsText.reactNestedRoutersApp.replaceValues[7]) : link
                })
                basePage.checkUrlText(index === 4 ? Constants.elementsText.reactNestedRoutersApp.shellAppLinks[2]: Constants.elementsText.reactNestedRoutersApp.shellAppLinks[index], true)
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.div,
                    text: index === 4 ? messages[2]: messages[index],
                    visibilityState: 'be.visible'
                })
                basePage.reloadWindow()
                basePage.checkUrlText(index === 4 ? Constants.elementsText.reactNestedRoutersApp.shellAppLinks[2]: Constants.elementsText.reactNestedRoutersApp.shellAppLinks[index], true)
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.div,
                    text: index === 4 ? messages[2]: messages[index],
                    visibilityState: 'be.visible'
                })
            })
        })
    })
})