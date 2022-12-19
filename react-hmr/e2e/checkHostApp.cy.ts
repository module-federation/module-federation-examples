import { BaseMethods } from '../../cypress/common/base';
import { baseSelectors } from '../../cypress/common/selectors';
import { Constants } from '../../cypress/fixtures/constants';
import { CssAttr } from '../../cypress/types/cssAttr';


const basePage: BaseMethods = new BaseMethods();

let hostData = [
    {
        linkName: 'Home',
        pageContent: '',
        link: Constants.hrefs.reactHmrHomeLink
    },
    {
        linkName: 'Button',
        pageContent: Constants.elementsText.reactHmrHostButtonPageText,
        link: Constants.hrefs.reactHmrButtonLink
    },
    {
        linkName: 'Heading',
        pageContent: Constants.elementsText.reactHmrHostHedingPageText,
        link: Constants.hrefs.reactHmrHeadingLink
    }
]

describe("Check host app", () => {
    // TODO cy.exec don't build the apps correctly cause lerna executes without exit code. Uncomment after fix this issue!
        // before(() => {
        //     basePage.buildTheSample(Constants.samplesPath.react-hmr)
        // })

        // after(() => {
        //     basePage.shutdownTheSample(Constants.samplesPath.react-hmr)
        // })

    beforeEach(() => {
        basePage.openLocalhost(3000)
    })

    it('Check the content of the Home page exists', () => {
        basePage.checkElementContainText(baseSelectors.divElement, Constants.elementsText.reactHmrHostHeaderText1)
        basePage.checkElementContainText(baseSelectors.divElement, Constants.elementsText.reactHmrHostHeaderText2)

        basePage.checkElementWithTextContainsLink(baseSelectors.linkTag, Constants.linksNames.reactHmrHostHomeText, Constants.hrefs.reactHmrHomeLink)
        basePage.checkElementWithTextContainsLink(baseSelectors.linkTag, Constants.linksNames.reactHmrHostButtonText, Constants.hrefs.reactHmrButtonLink)
        basePage.checkElementWithTextContainsLink(baseSelectors.linkTag, Constants.linksNames.reactHmrHostHeadingText, Constants.hrefs.reactHmrHeadingLink)

        basePage.checkParentElementWithTextHaveProperty({
            selector: baseSelectors.root,
            text: Constants.elementsText.reactHmrHostHeaderText1,
            prop: CssAttr.backgroundColor,
            value: Constants.color.greenyellow
        })

    })

    hostData.forEach(
        function(
            property: { 
                linkName: string
                pageContent: string
                link: string,
        }) {

        let appName = property.linkName === 'Home' ? hostData[0].linkName : property.linkName === 'Button' ? hostData[1].linkName : hostData[2].linkName;


            it(`Check the ${appName} navigation link works`, () => {

            basePage.clickElementWithText({
                selector: baseSelectors.linkTag,
                text: property.linkName})

            basePage.checkUrlText(property.link, true)
            basePage.checkElementContainText(baseSelectors.root, property.pageContent) 

            basePage.checkElementContainText(baseSelectors.divElement, Constants.elementsText.reactHmrHostHeaderText1)
            basePage.checkElementContainText(baseSelectors.divElement, Constants.elementsText.reactHmrHostHeaderText2)

            basePage.checkElementWithTextContainsLink(baseSelectors.linkTag, Constants.linksNames.reactHmrHostHomeText, Constants.hrefs.reactHmrHomeLink)
            basePage.checkElementWithTextContainsLink(baseSelectors.linkTag, Constants.linksNames.reactHmrHostButtonText, Constants.hrefs.reactHmrButtonLink)
            basePage.checkElementWithTextContainsLink(baseSelectors.linkTag, Constants.linksNames.reactHmrHostHeadingText, Constants.hrefs.reactHmrHeadingLink)

            basePage.checkParentElementWithTextHaveProperty({
                selector: baseSelectors.root,
                text: Constants.elementsText.reactHmrHostHeaderText1,
                prop: CssAttr.backgroundColor,
                value: Constants.color.greenyellow
            })
        })   
    })
})
