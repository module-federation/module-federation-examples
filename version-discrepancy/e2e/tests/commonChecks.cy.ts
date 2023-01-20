import { BaseMethods } from "../../../cypress/common/base";
import {baseSelectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";
import {VersionDiscrepancyMethods} from "../methods/methods";

const basePage: BaseMethods = new BaseMethods()
const methodsPage: VersionDiscrepancyMethods = new VersionDiscrepancyMethods()

describe('It checks apps with dependency versions discrepancy', () => {
    const appsData = [
        {
            host: 3001,
            header: Constants.commonPhrases.versionDiscrepancyApp1Name,
            lodashVersion: Constants.commonPhrases.versionDiscrepancyApp1LodashVersion
        },
        {
            host: 3002,
            header: Constants.commonPhrases.versionDiscrepancyApp2Name,
            lodashVersion: Constants.commonPhrases.versionDiscrepancyApp2LodashVersion
        }
    ]

    appsData.forEach((property: { host: number, header: string, lodashVersion: string }) => {
        it(`Check ${property.header} header visibility`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.divElement,
                text: property.header,
                visibilityState: 'be.visible'
            })
        });

        it(`Checks Lodash version for ${property.header}`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.divElement,
                text: property.lodashVersion,
                visibilityState: 'be.visible'
            })
        });

        it(`Checks lodash.nth not available message shows depending on Lodash version`, () => {
            basePage.openLocalhost(property.host)
            methodsPage.checkMessageVisibilityByLodashVersion(Constants.commonPhrases.lodashVersionNotAvailableMessage)
        });

        it(`Checks lodash.nth undefined version message shows depending on Lodash version`, () => {
            basePage.openLocalhost(property.host)
            methodsPage.checkMessageVisibilityByLodashVersion(Constants.commonPhrases.lodashVersionUndefinedVersionMessage)
        });

        it(`Checks that both apps shares lodash remote component`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.divElement,
                text: Constants.commonPhrases.lodashRemoteComponentHeader,
                visibilityState: 'be.visible'
            })
        });

        it(`Checks that both apps shares same remote component style`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.style.replace('{style}', Constants.color.nonRgbBorderBlack),
                text: Constants.commonPhrases.lodashRemoteComponentHeader,
                visibilityState: 'be.visible'
            })
        });

        it(`Checks that both apps shares same remote component value`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkChildElementContainText(
                baseSelectors.style.replace('{style}', Constants.color.nonRgbBorderBlack),
                baseSelectors.h3,
                Constants.commonPhrases.lodashRemoteComponentHeader
            )
            basePage.checkChildElementContainText(
                baseSelectors.style.replace('{style}', Constants.color.nonRgbBorderBlack),
                baseSelectors.paragraph,
                Constants.commonPhrases.versionDiscrepancyApp2LodashVersion
            )
            basePage.checkChildElementContainText(
                baseSelectors.style.replace('{style}', Constants.color.nonRgbBorderBlack),
                baseSelectors.code,
                Constants.commonPhrases.lodashVersionDefinedVersionMessage
            )
            basePage.checkChildElementContainText(
                baseSelectors.style.replace('{style}', Constants.color.nonRgbBorderBlack),
                baseSelectors.code,
                Constants.commonPhrases.ntxCode,
                1
            )
        });
    });
});

describe("It checks right app opened at the right port", () => {
    before(() => {
        basePage.openLocalhost(3001)
    })

    it('Checks each app opened in right port', () => {
        basePage.checkUrlText(Cypress.env(`localhost${3001}`), true)
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.divElement,
            text: Constants.commonPhrases.versionDiscrepancyApp1Name,
            visibilityState: 'be.visible'
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.divElement,
            text: Constants.commonPhrases.versionDiscrepancyApp2Name,
            isVisible: false
        })
        cy.wait(2000)
        basePage.checkInfoOnNonDefaultHost(3002, baseSelectors.divElement,
            Constants.commonPhrases.versionDiscrepancyApp2Name, Constants.commonPhrases.versionDiscrepancyApp1Name)
    })
})