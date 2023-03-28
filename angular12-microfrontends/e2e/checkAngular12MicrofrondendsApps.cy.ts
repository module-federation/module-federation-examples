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
    describe('Angular 12 microfrontends', () => {
        context(`Check ${property.appName}`, () => {
            beforeEach(() => {
                basePage.openLocalhost({
                    number: property.host,
                    path: property.appPath
                })
            })
    
            it(`Check ${property.appName} build and running (Check elements: Navigation, Header, Paragpaph)`, () => {
                basePage.checkElementVisibility({
                    selector: baseSelectors.tags.navigation,
                })
                basePage.checkElementVisibility({
                    parentSelector: baseSelectors.tags.navigation,
                    selector: baseSelectors.css.navigation,
                })
                basePage.checkElementQuantity({
                    selector: baseSelectors.css.navigation,
                    quantity: 3
                })
                basePage.checkElementHaveProperty({
                    selector: baseSelectors.tags.coreElements.link,
                    attr: Constants.commonConstantsData.commonAttributes.attr,
                    prop: Constants.commonConstantsData.commonAttributes.href,
                    value: Constants.commonConstantsData.commonAngularAppsData.mdmfNavigationItemLogo.link
                })
                basePage.checkElementHaveProperty({
                    selector: baseSelectors.tags.coreElements.link,
                    attr: Constants.commonConstantsData.commonAttributes.attr,
                    prop: Constants.commonConstantsData.commonAttributes.target,
                    value: Constants.commonConstantsData.commonAngularAppsData.mdmfNavigationItemLogo.targetBlank
                })
                basePage.checkElementContainText({
                    parentSelector: baseSelectors.tags.navigation,
                    selector: baseSelectors.css.navigation,
                    text: Constants.commonConstantsData.home,
                    index: Constants.commonConstantsData.commonIndexes.one
                })
                basePage.checkElementContainText({
                    parentSelector: baseSelectors.tags.navigation,
                    selector: baseSelectors.css.navigation,
                    text: Constants.commonConstantsData.commonAngularAppsData.mdmfNavigationItems.profile,
                    index: Constants.commonConstantsData.commonIndexes.two
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.headers.h2,
                    text: property.headerText
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.paragraph,
                    text: property.paragraphText
                })
                if(property.additionlParagraph) {
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.paragraph,
                        text: property.additionlParagraph
                    }) 
                }
            })
        })
    })
})
