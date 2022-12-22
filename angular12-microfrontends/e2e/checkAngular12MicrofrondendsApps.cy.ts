import { Constants } from './../../cypress/fixtures/constants';
import { BaseMethods } from '../../cypress/common/base';
import { baseSelectors } from '../../cypress/common/selectors';

const basePage: BaseMethods = new BaseMethods()

const appsData = [
    {
        headerText: Constants.elementsText.mdfmShellHeader,
        paragraphText: Constants.commonPhrases.mdmfShellWelcome,
        additionlParagraph: Constants.commonPhrases.mdmfShellParagraph,
        appName: Constants.elementsText.mdmfShell.name,
        appPath: Constants.elementsText.mdmfShell.path,
        host: 4200
    },
    {
        headerText: Constants.elementsText.mdfmProfileHeader,
        paragraphText: Constants.commonPhrases.mdmfProfileParagraph,
        additionlParagraph: '',
        appName: Constants.elementsText.mdmfProfile.name,
        appPath: Constants.elementsText.mdmfProfile.path,
        host: 4200
    }
]

appsData.forEach((
    property: {
        headerText: string,
        paragraphText: string,
        additionlParagraph: string
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
                attr: Constants.commonText.attr,
                prop: Constants.commonText.href,
                value: Constants.elementsText.mdmfNavigationItemLogo.link
            })
            basePage.checkElementHaveProperty({
                selector: baseSelectors.linkTag,
                attr: Constants.commonText.attr,
                prop: Constants.commonText.target,
                value: Constants.elementsText.mdmfNavigationItemLogo.targetBlank
            })
            basePage.checkChildElementContainText(
                baseSelectors.navigation,
                baseSelectors.navigationItem,
                Constants.tabsNames.mdmfNavigationItemHome.name,
                Constants.tabsNames.mdmfNavigationItemHome.index
            )
            basePage.checkChildElementContainText(
                baseSelectors.navigation,
                baseSelectors.navigationItem,
                Constants.tabsNames.mdmfNavigationItemProfile.name,
                Constants.tabsNames.mdmfNavigationItemProfile.index
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