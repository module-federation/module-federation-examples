import { Constants } from './../../cypress/fixtures/constants';
import { BaseMethods } from '../../cypress/common/base';
import { baseSelectors } from '../../cypress/common/selectors';

const basePage: BaseMethods = new BaseMethods()

const appsData = [
    {
        headerText: Constants.commonConstantsData.commonAngularAppsData.headers.shell,
        paragraphText: Constants.commonConstantsData.commonAngularAppsData.messages.shellWelcome,
        additionlParagraph: Constants.commonConstantsData.commonAngularAppsData.messages.shellParagraph,
        appName: Constants.commonConstantsData.commonAngularAppsData.mdmfShellName,
        appPath: Constants.commonConstantsData.home.toLowerCase(),
        host: 4200
    },
    {
        headerText: Constants.commonConstantsData.commonAngularAppsData.headers.profile,
        paragraphText: Constants.commonConstantsData.commonAngularAppsData.messages.profileParagraph,
        appName: Constants.commonConstantsData.commonAngularAppsData.mdmfProfile.name,
        appPath: Constants.commonConstantsData.commonAngularAppsData.mdmfProfile.path,
        host: 4200
    }
]

appsData.forEach((
    property: {
        headerText: string,
        paragraphText: string,
        additionlParagraph?: string
        appName: string,
        appPath: string,
        host: number
    }
) => {
    describe(`Check ${property.appName}`, () => {
        beforeEach(() => {
            basePage.openLocalhost(property.host, property.appPath)
        })

        it(`Check ${property.appName} build and running (Check elements: Navigation, Header, Paragpaph)`, () => {
            basePage.checkElementExist({
                selector: baseSelectors.navigation,
            })
            basePage.checkChildElementVisibility(
                baseSelectors.navigation,
                baseSelectors.navigationItem
            )
            basePage.checkElementQuantity({
                selector: baseSelectors.navigationItem,
                quantity: 3
            })
            basePage.checkElementHaveProperty({
                selector: baseSelectors.linkTag,
                attr: Constants.commonConstantsData.commonAttributes.attr,
                prop: Constants.commonConstantsData.commonAttributes.href,
                value: Constants.commonConstantsData.commonAngularAppsData.mdmfNavigationItemLogo.link
            })
            basePage.checkElementHaveProperty({
                selector: baseSelectors.linkTag,
                attr: Constants.commonConstantsData.commonAttributes.attr,
                prop: Constants.commonConstantsData.commonAttributes.target,
                value: Constants.commonConstantsData.commonAngularAppsData.mdmfNavigationItemLogo.targetBlank
            })
            basePage.checkChildElementContainText(
                baseSelectors.navigation,
                baseSelectors.navigationItem,
                Constants.commonConstantsData.home,
                Constants.commonConstantsData.commonIndexes.one
            )
            basePage.checkChildElementContainText(
                baseSelectors.navigation,
                baseSelectors.navigationItem,
                Constants.commonConstantsData.commonAngularAppsData.mdmfNavigationItems.profile,
                Constants.commonConstantsData.commonIndexes.two
            )
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.h2,
                text: property.headerText
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.paragraph,
                text: property.paragraphText
            })
            if(property.additionlParagraph) {
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.paragraph,
                    text: property.additionlParagraph
                }) 
            }
        })
    })
})