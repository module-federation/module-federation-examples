import { BaseMethods } from '../../cypress/common/base';
import { baseSelectors } from '../../cypress/common/selectors';
import { Constants } from '../../cypress/fixtures/constants';
import { CssAttr } from '../../cypress/types/cssAttr';

const basePage: BaseMethods = new BaseMethods();

const hostData = [
    {
        linkName: Constants.commonConstantsData.home,
        pageContent: '',
        link: Constants.commonConstantsData.commonLinks.baseLink,
    },
    {
        linkName: Constants.commonConstantsData.button,
        pageContent: Constants.elementsText.reactHmrApp.host.button,
        link: Constants.hrefs.reactHmrApp.button
    },
    {
        linkName: Constants.hrefs.reactHmrApp.heading.name,
        pageContent: Constants.elementsText.reactHmrApp.host.heading,
        link: Constants.hrefs.reactHmrApp.heading.link
    }
]

describe("Check host app", () => {
    beforeEach(() => {
        basePage.openLocalhost(3000)
    })

    it('Check the content of the Home page exists', () => {
        basePage.checkElementContainText({
            selector: baseSelectors.tags.coreElements.div,
            text: Constants.elementsText.reactHmrApp.host.headerText1
        })
        basePage.checkElementContainText({
            selector: baseSelectors.tags.coreElements.div,
            text: Constants.elementsText.reactHmrApp.host.headerText2
        })

        basePage.checkElementWithTextContainsLink(baseSelectors.tags.coreElements.link, Constants.commonConstantsData.home, Constants.commonConstantsData.commonLinks.baseLink)
        basePage.checkElementWithTextContainsLink(baseSelectors.tags.coreElements.link, Constants.commonConstantsData.button, Constants.hrefs.reactHmrApp.button)
        basePage.checkElementWithTextContainsLink(baseSelectors.tags.coreElements.link, Constants.hrefs.reactHmrApp.heading.name, Constants.hrefs.reactHmrApp.heading.link)

        basePage.checkElementWithTextHaveProperty({
            selector: baseSelectors.ids.root,
            text: Constants.elementsText.reactHmrApp.host.headerText1,
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
                selector: baseSelectors.tags.coreElements.link,
                text: property.linkName})

            basePage.checkUrlText(property.link, true)
            basePage.checkElementContainText({
                selector: baseSelectors.ids.root,
            text: property.pageContent
            }) 

            basePage.checkElementContainText({
                selector: baseSelectors.tags.coreElements.div,
                text: Constants.elementsText.reactHmrApp.host.headerText1,
                index: 1
            })
            basePage.checkElementContainText({
                selector: baseSelectors.tags.coreElements.div,
                text: Constants.elementsText.reactHmrApp.host.headerText2,
                index: 2
            })

            basePage.checkElementWithTextContainsLink(baseSelectors.tags.coreElements.link, Constants.commonConstantsData.home, Constants.commonConstantsData.commonLinks.baseLink)
            basePage.checkElementWithTextContainsLink(baseSelectors.tags.coreElements.link, Constants.commonConstantsData.button, Constants.hrefs.reactHmrApp.button)
            basePage.checkElementWithTextContainsLink(baseSelectors.tags.coreElements.link, Constants.hrefs.reactHmrApp.heading.name, Constants.hrefs.reactHmrApp.heading.link)

            basePage.checkElementWithTextHaveProperty({
                selector: baseSelectors.ids.root,
                text: Constants.elementsText.reactHmrApp.host.headerText1,
                prop: CssAttr.backgroundColor,
                value: Constants.color.greenyellow,
                parent: true
            })
        })   
    })
})
