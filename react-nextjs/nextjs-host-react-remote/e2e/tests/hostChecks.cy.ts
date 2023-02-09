import {BaseMethods} from "../../../../cypress/common/base";
import {baseSelectors, selectors} from "../../../../cypress/common/selectors";
import {Constants} from "../../../../cypress/fixtures/constants";
import {CssAttr} from "../../../../cypress/types/cssAttr";
import {CommonTestData} from "../../../../cypress/fixtures/commonTestData";

const basePage: BaseMethods = new BaseMethods()

describe("It checks host page", () => {
    beforeEach(() => {
        basePage.openLocalhost(8080)
    })

    it('Checks header texted link color', () => {
        basePage.checkElementHaveProperty({
            parentSelector: baseSelectors.tags.headers.h1,
            selector: baseSelectors.tags.coreElements.link,
            prop: CssAttr.color,
            value: Constants.color.skyBlue,
            text: CommonTestData.nextJsHostReactRemoteAppLinkName,
        })
    })

    it('Checks texted remote component visibility', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.tags.navigation,
            text: Constants.commonPhrases.nextJsHostReactRemoteApp.messages.remotes.component,
            visibilityState: 'be.visible'
        })
    })

    it('Checks texted remote component color', () => {
        basePage.checkElementHaveProperty({
            selector: baseSelectors.tags.navigation,
            prop: CssAttr.backgroundColor,
            value: Constants.color.lightMint,
            text: Constants.commonPhrases.nextJsHostReactRemoteApp.messages.remotes.component,
        })
    })

    it('Checks texted links cards quantity', () => {
        basePage.checkElementQuantity({
            selector: selectors.nextJsHostReactRemoteApp.linkCard,
            quantity: Constants.commonConstantsData.commonIndexes.four
        })
    })

    it('Checks links cards text visibility', () => {
        Constants.commonPhrases.nextJsHostReactRemoteApp.linksCardsText.forEach((text: string) => {
            basePage.checkElementWithTextPresence({
                selector: selectors.nextJsHostReactRemoteApp.linkCard,
                text,
                visibilityState: 'be.visible'
            })
        })
    })

    it('Checks hover animation for links cards', () => {
        Constants.commonPhrases.nextJsHostReactRemoteApp.linksCardsText.forEach((text: string) => {
            basePage.reloadWindow()
            basePage.checkElementHaveProperty({
                selector: selectors.nextJsHostReactRemoteApp.linkCard,
                prop: CssAttr.color,
                value: Constants.color.skyBlue,
                text,
                isInclude: false,
            })
            basePage.hoverElement({
                selector: selectors.nextJsHostReactRemoteApp.linkCard,
                text,
                wait: 2000
            })
            basePage.checkElementHaveProperty({
                selector: selectors.nextJsHostReactRemoteApp.linkCard,
                prop: CssAttr.color,
                value: Constants.color.skyBlue,
                text,
            })
        })
    })

    // TODO: Can be flaky
    it('Checks all page links functionality', () => {
        basePage.checkOutsideResourceUrl({
            parentSelector: baseSelectors.tags.headers.h1,
            selector: baseSelectors.tags.coreElements.link,
            text: CommonTestData.nextJsHostReactRemoteAppLinkName,
            link: Constants.hrefs.nextJsHostReactRemoteApp.nextJsLink,
        })
        Constants.commonPhrases.nextJsHostReactRemoteApp.linksCardsText.forEach((text: string, index: number) => {
            basePage.openLocalhost(8080)
            basePage.checkOutsideResourceUrl({
                selector: selectors.nextJsHostReactRemoteApp.linkCard,
                text,
                link: Constants.hrefs.nextJsHostReactRemoteApp.cardsLinks[index],
            })
        })
        // TODO: Flaky for now due to dynamic animations loading on new page. Extra investigate required
        // basePage.checkOutsideResourceUrl({
        //         parentSelector: baseSelectors.tags.footer,
        //         selector: baseSelectors.tags.coreElements.link,
        //         text: Constants.commonPhrases.nextJsHostReactRemoteApp.messages.engine,
        //         link: Constants.commonConstantsData.links.vercel,
        // })
    })

    it('Checks change root file functionality', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.tags.paragraph,
            text: Constants.commonPhrases.nextJsHostReactRemoteApp.messages.start,
            visibilityState: 'be.visible'
        })
        basePage.writeContentToFile({
            contentFilePath: Constants.filesPath.nextJsHostReactRemoteApp.files.changedContent,
            filePath: Constants.filesPath.nextJsHostReactRemoteApp.files.root,
            wait: 1000
        })
        basePage.reloadWindow()
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.tags.paragraph,
            text: Constants.commonPhrases.nextJsHostReactRemoteApp.messages.start,
            isVisible: false
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.tags.paragraph,
            text: Constants.commonPhrases.nextJsHostReactRemoteApp.messages.start.replace('started', 'TESTED'),
            visibilityState: 'be.visible'
        })
        basePage.writeContentToFile({
            contentFilePath: Constants.filesPath.nextJsHostReactRemoteApp.files.originalContent,
            filePath: Constants.filesPath.nextJsHostReactRemoteApp.files.root,
            wait: 1000
        })
        basePage.reloadWindow()
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.tags.paragraph,
            text: Constants.commonPhrases.nextJsHostReactRemoteApp.messages.start,
            visibilityState: 'be.visible'
        })
    })
})