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
            header: Constants.commonPhrases.versionDiscrepancyApp.appsNames.app1,
            lodashVersion: Constants.commonPhrases.versionDiscrepancyApp.lodashVersions.app1
        },
        {
            host: 3002,
            header: Constants.commonPhrases.versionDiscrepancyApp.appsNames.app2,
            lodashVersion: Constants.commonPhrases.versionDiscrepancyApp.lodashVersions.app2
        }
    ]

    appsData.forEach((property: { host: number, header: string, lodashVersion: string }) => {
        it(`Check ${property.header} header visibility`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.div,
                text: property.header,
                visibilityState: 'be.visible'
            })
        });

        it(`Checks Lodash version for ${property.header}`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.div,
                text: property.lodashVersion,
                visibilityState: 'be.visible'
            })
        });

        it(`Checks lodash.nth not available message shows depending on Lodash version`, () => {
            basePage.openLocalhost(property.host)
            methodsPage.checkMessageVisibilityByLodashVersion(Constants.commonPhrases.versionDiscrepancyApp.messages.notAvailable)
        });

        it(`Checks lodash.nth undefined version message shows depending on Lodash version`, () => {
            basePage.openLocalhost(property.host)
            methodsPage.checkMessageVisibilityByLodashVersion(Constants.commonPhrases.versionDiscrepancyApp.messages.undefinedVersion)
        });

        it(`Checks that both apps shares lodash remote component`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.div,
                text: Constants.commonPhrases.versionDiscrepancyApp.remoteComponentHeader,
                visibilityState: 'be.visible'
            })
        });

        it(`Checks that both apps shares same remote component style`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.css.style.replace('{style}', Constants.color.nonRgbValues.borderBlack),
                text: Constants.commonPhrases.versionDiscrepancyApp.remoteComponentHeader,
                visibilityState: 'be.visible'
            })
        });

        it(`Checks that both apps shares same remote component value`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkChildElementContainText(
                baseSelectors.css.style.replace('{style}', Constants.color.nonRgbValues.borderBlack),
                baseSelectors.tags.headers.h3,
                Constants.commonPhrases.versionDiscrepancyApp.remoteComponentHeader,
            )
            basePage.checkChildElementContainText(
                baseSelectors.css.style.replace('{style}', Constants.color.nonRgbValues.borderBlack),
                baseSelectors.tags.paragraph,
                Constants.commonPhrases.versionDiscrepancyApp.lodashVersions.app2
            )
            basePage.checkChildElementContainText(
                baseSelectors.css.style.replace('{style}', Constants.color.nonRgbValues.borderBlack),
                baseSelectors.tags.code,
                Constants.commonPhrases.versionDiscrepancyApp.messages.definedVersion
            )
            basePage.checkChildElementContainText(
                baseSelectors.css.style.replace('{style}', Constants.color.nonRgbValues.borderBlack),
                baseSelectors.tags.code,
                Constants.commonPhrases.versionDiscrepancyApp.ntxCode,
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
            selector: baseSelectors.tags.coreElements.div,
            text: Constants.commonPhrases.versionDiscrepancyApp.appsNames.app1,
            visibilityState: 'be.visible'
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.tags.coreElements.div,
            text: Constants.commonPhrases.versionDiscrepancyApp.appsNames.app2,
            isVisible: false
        })
        cy.wait(2000)
        basePage.checkInfoOnNonDefaultHost(3002, baseSelectors.tags.coreElements.div,
            Constants.commonPhrases.versionDiscrepancyApp.appsNames.app2, Constants.commonPhrases.versionDiscrepancyApp.appsNames.app1)
    })
})