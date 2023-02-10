import {BaseMethods} from "../../../../cypress/common/base";
import {baseSelectors, commonSelectors} from "../../../../cypress/common/selectors";
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
            text: CommonTestData.nextJsAppsHeaderLinkName,
        })
    })

    it('Checks texted remote component visibility', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.tags.navigation,
            text: Constants.commonPhrases.nextJsHostRemoteApp.remoteComponentMessage,
            visibilityState: 'be.visible'
        })
    })

    it('Checks texted remote component color', () => {
        basePage.checkElementHaveProperty({
            selector: baseSelectors.tags.navigation,
            prop: CssAttr.backgroundColor,
            value: Constants.color.lightMint,
            text: Constants.commonPhrases.nextJsHostRemoteApp.remoteComponentMessage,
        })
    })

    it('Checks texted links cards quantity', () => {
        basePage.checkElementQuantity({
            selector: commonSelectors.nextJsAppsLinkCard,
            quantity: Constants.commonConstantsData.commonIndexes.four
        })
    })

    it('Checks links cards text visibility', () => {
        Constants.commonConstantsData.nextJsAppsCommonPhrases.linksCardsText.forEach((text: string) => {
            basePage.checkElementWithTextPresence({
                selector: commonSelectors.nextJsAppsLinkCard,
                text,
                visibilityState: 'be.visible'
            })
        })
    })

    it('Checks hover animation for links cards', () => {
        basePage.checkLinkedCardsHoverAnimation()
    })

    // TODO: Can be flaky
    it('Checks all page links functionality', () => {
        basePage.checkLinkedCardsFunctionality(8080)
    })

    it('Checks change root file functionality', () => {
        basePage.changeRootFile({
            changedContentFilePath: Constants.filesPath.nextJsHostRemoteApp.files.contents.changed.host,
            rootFilePath: Constants.filesPath.nextJsHostRemoteApp.files.roots.host,
            originalContentFilePath: Constants.filesPath.nextJsHostRemoteApp.files.contents.original.host,
        })
    })
})