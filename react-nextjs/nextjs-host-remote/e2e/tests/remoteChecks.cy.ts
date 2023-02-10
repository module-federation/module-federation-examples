import {BaseMethods} from "../../../../cypress/common/base";
import {baseSelectors, commonSelectors} from "../../../../cypress/common/selectors";
import {Constants} from "../../../../cypress/fixtures/constants";
import {CssAttr} from "../../../../cypress/types/cssAttr";
import {CommonTestData} from "../../../../cypress/fixtures/commonTestData";

const basePage: BaseMethods = new BaseMethods()

describe("It checks remote page", () => {
    beforeEach(() => {
        basePage.openLocalhost(8081)
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
        basePage.checkLinkedCardsFunctionality(8081)
    })

    it('Checks change root file functionality', () => {
        basePage.changeRootFile({
            changedContentFilePath: Constants.filesPath.nextJsHostRemoteApp.files.contents.changed.remote,
            rootFilePath: Constants.filesPath.nextJsHostRemoteApp.files.roots.remote,
            originalContentFilePath: Constants.filesPath.nextJsHostRemoteApp.files.contents.original.remote,
        })
    })
})