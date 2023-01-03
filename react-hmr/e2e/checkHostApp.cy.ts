import { BaseMethods } from '../../cypress/common/base';
import { baseSelectors } from '../../cypress/common/selectors';
import { Constants } from '../../cypress/fixtures/constants';
import { CssAttr } from '../../cypress/types/cssAttr';

const basePage: BaseMethods = new BaseMethods();

const hostData = [
    {
        linkName: Constants.linksNames.reactHmrHostHomeText,
        pageContent: '',
        link: Constants.hrefs.reactHmrHomeLink
    },
    {
        linkName: Constants.linksNames.reactHmrHostButtonText,
        pageContent: Constants.elementsText.reactHmr.host.button,
        link: Constants.hrefs.reactHmrButtonLink
    },
    {
        linkName: Constants.linksNames.reactHmrHostHeadingText,
        pageContent: Constants.elementsText.reactHmr.host.heading,
        link: Constants.hrefs.reactHmrHeadingLink
    }
]

describe("Check host app", () => {
    beforeEach(() => {
        basePage.openLocalhost(3000)
    })

    it('Check the content of the Home page exists', () => {
        basePage.checkElementContainText({
            selector: baseSelectors.divElement,
            text: Constants.elementsText.reactHmr.host.headerText1
        })
        basePage.checkElementContainText({
            selector: baseSelectors.divElement,
            text: Constants.elementsText.reactHmr.host.headerText2
        })

        basePage.checkElementWithTextContainsLink(baseSelectors.linkTag, Constants.linksNames.reactHmrHostHomeText, Constants.hrefs.reactHmrHomeLink)
        basePage.checkElementWithTextContainsLink(baseSelectors.linkTag, Constants.linksNames.reactHmrHostButtonText, Constants.hrefs.reactHmrButtonLink)
        basePage.checkElementWithTextContainsLink(baseSelectors.linkTag, Constants.linksNames.reactHmrHostHeadingText, Constants.hrefs.reactHmrHeadingLink)

        basePage.checkElementWithTextHaveProperty({
            selector: baseSelectors.root,
            text: Constants.elementsText.reactHmr.host.headerText1,
            prop: CssAttr.backgroundColor,
            value: Constants.color.greenyellow,
            parent: true
        })

    })

    hostData.forEach(( 
            property: { 
                linkName: string
                pageContent: string
                link: string,
        }) => {

        const appName = property.linkName === 'Home' ? hostData[0].linkName : property.linkName === 'Button' ? hostData[1].linkName : hostData[2].linkName;


            it(`Check the ${appName} navigation link works`, () => {

            basePage.clickElementWithText({
                selector: baseSelectors.linkTag,
                text: property.linkName})

            basePage.checkUrlText(property.link, true)
            basePage.checkElementContainText({
                selector: baseSelectors.root, 
            text: property.pageContent
            }) 

            basePage.checkElementContainText({
                selector: baseSelectors.divElement, 
                text: Constants.elementsText.reactHmr.host.headerText1,
                index: 1
            })
            basePage.checkElementContainText({
                selector: baseSelectors.divElement, 
                text: Constants.elementsText.reactHmr.host.headerText2,
                index: 2
            })

            basePage.checkElementWithTextContainsLink(baseSelectors.linkTag, Constants.linksNames.reactHmrHostHomeText, Constants.hrefs.reactHmrHomeLink)
            basePage.checkElementWithTextContainsLink(baseSelectors.linkTag, Constants.linksNames.reactHmrHostButtonText, Constants.hrefs.reactHmrButtonLink)
            basePage.checkElementWithTextContainsLink(baseSelectors.linkTag, Constants.linksNames.reactHmrHostHeadingText, Constants.hrefs.reactHmrHeadingLink)

            basePage.checkElementWithTextHaveProperty({
                selector: baseSelectors.root,
                text: Constants.elementsText.reactHmr.host.headerText1,
                prop: CssAttr.backgroundColor,
                value: Constants.color.greenyellow,
                parent: true
            })
        })   
    })
})
