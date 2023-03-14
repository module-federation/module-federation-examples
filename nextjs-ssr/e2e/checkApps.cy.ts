import { BaseMethods } from '../../cypress/common/base';
import { baseSelectors, selectors } from '../../cypress/common/selectors';
import { Constants } from '../../cypress/fixtures/constants';

const basePage: BaseMethods = new BaseMethods();

const appsData = [
    {
        appName: Constants.commonConstantsData.home,
        host: 3001
    },
    {
        appName: Constants.elementsText.nextJsSsrApp.shop,
        host: 3002
    },
    {
        appName: Constants.elementsText.nextJsSsrApp.checkout,
        host: 3000
    }
]

appsData.forEach(
    (
        property: {
            appName: string
            host: number
        }) => {

        const navigationTextedLinks = [
            {
                text: Constants.commonConstantsData.home,
                link: Constants.commonConstantsData.commonLinks.baseLink,
                url: Constants.commonConstantsData.commonLinks.baseLink,
            },
            {
                text: Constants.elementsText.nextJsSsrApp.shop,
                link: Constants.hrefs.nextJsSsrApp.shop,
                url: Constants.hrefs.nextJsSsrApp.shop,
            },
            {
                text: Constants.elementsText.nextJsSsrApp.checkout,
                link: Constants.hrefs.nextJsSsrApp.checkout,
                url: Constants.hrefs.nextJsSsrApp.checkout,
            }
        ]

        const commonTextedLinks = [
            {
                text: Constants.elementsText.nextJsSsrApp.zeit,
                link: Constants.hrefs.nextJsSsrApp.zeit,
                url: Constants.hrefs.nextJsSsrApp.vercelHome
            },
            {
                text: Constants.elementsText.nextJsSsrApp.gitHub,
                link: Constants.hrefs.nextJsSsrApp.zeitGitHub,
                url: Constants.hrefs.nextJsSsrApp.vercelGitHub
            },
        ]

        const tileTextedLinks = [
            {
                text: Constants.elementsText.nextJsSsrApp.tiles.documentation,
                link: Constants.hrefs.nextJsSsrApp.documentation,
                url: Constants.hrefs.nextJsSsrApp.documentation
            },
            {
                text: Constants.elementsText.nextJsSsrApp.tiles.learn,
                link: Constants.hrefs.nextJsSsrApp.learn,
                url: Constants.hrefs.nextJsSsrApp.learnAboutNext
            },
            {
                text: Constants.elementsText.nextJsSsrApp.tiles.examples,
                link: Constants.hrefs.nextJsSsrApp.examples,
                url: Constants.hrefs.nextJsSsrApp.deprecatedMainExamples,
            },
        ]

        describe(`NextJS SSR`, () => {
            context(`Check content in ${property.appName} app`, () => {
                beforeEach(() => {
                    basePage.openLocalhost({
                        number: property.host
                    })
                })

                it(`Check the header content of Home page`, () => {
                    basePage.checkElementContainText({
                        selector: baseSelectors.tags.coreElements.list,
                        text: Constants.commonConstantsData.home
                    })
                    basePage.checkElementContainText({
                        selector: baseSelectors.tags.coreElements.list,
                        text: Constants.elementsText.nextJsSsrApp.shop,
                    })
                    basePage.checkElementContainText({
                        selector: baseSelectors.tags.coreElements.list,
                        text: Constants.elementsText.nextJsSsrApp.checkout
                    })
                    basePage.checkElementContainText({
                        selector: baseSelectors.tags.coreElements.list,
                        text: Constants.elementsText.nextJsSsrApp.zeit,
                    })
                    basePage.checkElementContainText({
                        selector: baseSelectors.tags.coreElements.list,
                        text: Constants.elementsText.nextJsSsrApp.gitHub,
                    })
                    basePage.checkElementContainText({
                        selector: selectors.nextJsSsrApp.nextApp,
                        text: Constants.commonConstantsData.helloWorldMessage
                    })
                })

                it(`Check the main content of Home page`, () => {
                    basePage.checkElementContainText({
                        selector: selectors.nextJsSsrApp.heroSection,
                        text: Constants.elementsText.nextJsSsrApp.texts.text3
                    })
                    basePage.checkElementContainText({
                        selector: selectors.nextJsSsrApp.heroSection,
                        text: Constants.elementsText.nextJsSsrApp.texts.text4
                    })
                    basePage.checkElementContainText({
                        selector: baseSelectors.tags.coreElements.div,
                        text: Constants.elementsText.nextJsSsrApp.messages.welcomeMessage
                    })
                    basePage.checkElementContainText({
                        selector: baseSelectors.tags.coreElements.div,
                        text: Constants.elementsText.nextJsSsrApp.texts.text5
                    })
                    basePage.checkElementContainText({
                        selector: baseSelectors.tags.coreElements.div,
                        text: Constants.elementsText.nextJsSsrApp.messages.welcomeMessage
                    })
                    basePage.checkElementContainText({
                        selector: baseSelectors.tags.coreElements.div,
                        text: Constants.elementsText.nextJsSsrApp.texts.text5
                    })
                    basePage.checkElementContainText({
                        selector: baseSelectors.tags.coreElements.div,
                        text: Constants.elementsText.nextJsSsrApp.messages.welcomeMessage
                    })
                    basePage.checkElementContainText({
                        selector: baseSelectors.tags.coreElements.div,
                        text: Constants.elementsText.nextJsSsrApp.texts.text5
                    })
                })

                it(`Check the tiles exist on Home page`, () => {
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.coreElements.link,
                        text: Constants.elementsText.nextJsSsrApp.tiles.documentation
                    })

                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.coreElements.link,
                        text: Constants.elementsText.nextJsSsrApp.tiles.learn
                    })

                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.coreElements.link,
                        text: Constants.elementsText.nextJsSsrApp.tiles.examples,
                    })
                })
            })
        })

        describe('NextJS SSR', () => {
            context('Check links on Home page', () => {
                beforeEach(() => {
                    basePage.openLocalhost({
                        number: property.host
                    })
                })

                navigationTextedLinks.forEach((property: { text: string, link: string }) => {
                    it(`Check that ${property.text} text includes link, is not disabled`, () => {
                        basePage.checkElementContainText({
                            selector: baseSelectors.tags.coreElements.link,
                            text: property.text,
                            link: property.link
                        })
                    })
                })

                commonTextedLinks.forEach((property: { text: string, link: string }) => {
                    it(`Check that ${property.text} text includes link, is not disabled`, () => {
                        basePage.checkElementContainText({
                            selector: baseSelectors.tags.coreElements.link,
                            text: property.text,
                            link: property.link
                        })
                    })
                })

                tileTextedLinks.forEach((property: { text: string, link: string }) => {
                    it(`Check that ${property.text} text includes link and is not disabled`, () => {
                        basePage.checkElementContainText({
                            selector: baseSelectors.tags.coreElements.link,
                            text: property.text,
                            link: property.link
                        })
                    })
                });

                navigationTextedLinks.forEach((property: { text: string, url: string }) => {
                    it(`Check that ${property.text} navigation link works`, () => {
                        basePage.clickElementWithText({
                            selector: baseSelectors.tags.coreElements.link,
                            text: property.text
                        })

                        basePage.checkUrlText(property.url, true)
                    })
                })
            })
        })

        describe('NextJS SSR', () => {
            context('Check the header content of Shop page', () => {
                beforeEach(() => {
                    basePage.openLocalhost({
                        number: property.host,
                        path: Constants.hrefs.nextJsSsrApp.shop
                    })
                })

                it(`Check the header content of Shop page`, () => {
                    basePage.checkElementContainText({
                        selector: baseSelectors.tags.coreElements.list,
                        text: Constants.commonConstantsData.home
                    })
                    basePage.checkElementContainText({
                        selector: baseSelectors.tags.coreElements.list,
                        text: Constants.elementsText.nextJsSsrApp.shop,
                    })
                    basePage.checkElementContainText({
                        selector: baseSelectors.tags.coreElements.list,
                        text: Constants.elementsText.nextJsSsrApp.checkout
                    })
                    basePage.checkElementContainText({
                        selector: baseSelectors.tags.coreElements.list,
                        text: Constants.elementsText.nextJsSsrApp.zeit,
                    })
                    basePage.checkElementContainText({
                        selector: baseSelectors.tags.coreElements.list,
                        text: Constants.elementsText.nextJsSsrApp.gitHub,
                    })
                    basePage.checkElementContainText({
                        selector: selectors.nextJsSsrApp.nextApp,
                        text: Constants.commonConstantsData.helloWorldMessage
                    })
                })

                it(`Check the main content of Shop page`, () => {
                    basePage.checkElementContainText({
                        selector: selectors.nextJsSsrApp.nextApp,
                        text: Constants.elementsText.nextJsSsrApp.pages.shopPage
                    })
                    basePage.checkElementContainText({
                        selector: selectors.nextJsSsrApp.nextApp,
                        text: Constants.elementsText.nextJsSsrApp.texts.mainShopText
                    })
                })
            })
        })

        describe('NextJS SSR', () => {
            context('Check links on Shop page', () => {
                beforeEach(() => {
                    basePage.openLocalhost({
                        number: property.host,
                        path: Constants.hrefs.nextJsSsrApp.shop
                    })
                })

                navigationTextedLinks.forEach((property: { text: string, link: string }) => {
                    it(`Check that ${property.text} text includes link and is not disabled`, () => {
                        basePage.checkElementContainText({
                            selector: baseSelectors.tags.coreElements.link,
                            text: property.text,
                            link: property.link,
                        })
                    })
                })

                commonTextedLinks.forEach((property: { text: string, link: string }) => {
                    it(`Check that ${property.text} text includes link and is not disabled`, () => {
                        basePage.checkElementContainText({
                            selector: baseSelectors.tags.coreElements.link,
                            text: property.text,
                            link: property.link,
                        })
                    })
                })

                navigationTextedLinks.forEach((property: { text: string, url: string }) => {
                    it(`Check that ${property.text} text navigation link works`, () => {
                        basePage.clickElementWithText({
                            selector: baseSelectors.tags.coreElements.link,
                            text: property.text
                        })

                        basePage.checkUrlText(property.url, true)
                    })
                })
            })
        })

        describe('NextJS SSR', () => {
            context(`Check the content of Checkout page`, () => {
                beforeEach(() => {
                    basePage.openLocalhost({
                        number: property.host,
                        path: Constants.hrefs.nextJsSsrApp.checkout
                    })
                })


                it(`Check the header content of Checkout page`, () => {
                    basePage.checkElementContainText({
                        selector: baseSelectors.tags.coreElements.list,
                        text: Constants.commonConstantsData.home
                    })
                    basePage.checkElementContainText({
                        selector: baseSelectors.tags.coreElements.list,
                        text: Constants.elementsText.nextJsSsrApp.shop,
                    })
                    basePage.checkElementContainText({
                        selector: baseSelectors.tags.coreElements.list,
                        text: Constants.elementsText.nextJsSsrApp.checkout
                    })
                    basePage.checkElementContainText({
                        selector: baseSelectors.tags.coreElements.list,
                        text: Constants.elementsText.nextJsSsrApp.zeit,
                    })
                    basePage.checkElementContainText({
                        selector: baseSelectors.tags.coreElements.list,
                        text: Constants.elementsText.nextJsSsrApp.gitHub,
                    })
                    basePage.checkElementContainText({
                        selector: selectors.nextJsSsrApp.nextApp,
                        text: Constants.commonConstantsData.helloWorldMessage
                    })
                })

                it(`Check the main content of Checkout page`, () => {
                    basePage.checkElementContainText({
                        selector: selectors.nextJsSsrApp.nextApp,
                        text: Constants.elementsText.nextJsSsrApp.pages.checkoutPage
                    })
                    basePage.checkElementContainText({
                        selector: selectors.nextJsSsrApp.nextApp,
                        text: Constants.elementsText.nextJsSsrApp.messages.checkoutMessage
                    })
                    basePage.checkElementContainText({
                        selector: selectors.nextJsSsrApp.nextApp,
                        text: Constants.elementsText.nextJsSsrApp.texts.text1
                    })
                    basePage.checkElementContainText({
                        selector: selectors.nextJsSsrApp.nextApp,
                        text: Constants.elementsText.nextJsSsrApp.texts.text2
                    })
                    basePage.checkElementContainText({
                        selector: baseSelectors.tags.pre,
                        text: Constants.elementsText.nextJsSsrApp.json,
                        index: 1
                    })
                })
            })
        })

        describe('NextJS SSR', () => {
            context('Check links on Checkout page', () => {
                beforeEach(() => {
                    basePage.openLocalhost({
                        number: property.host,
                        path: Constants.hrefs.nextJsSsrApp.checkout
                    })
                })
    
                navigationTextedLinks.forEach((property: { text: string, link: string }) => {
                    it(`Check that ${property.text} text includes link and is not disabled`, () => {
                        basePage.checkElementContainText({
                            selector: baseSelectors.tags.coreElements.link,
                            text: property.text,
                            link: property.link,
                        })
                    })
                })
    
                commonTextedLinks.forEach((property: { text: string, link: string }) => {
                    it(`Check that ${property.text} text includes link and is not disabled`, () => {
                        basePage.checkElementContainText({
                            selector: baseSelectors.tags.coreElements.link,
                            text: property.text,
                            link: property.link,
                        })
                    })
                })
    
                navigationTextedLinks.forEach((property: { text: string, url: string }) => {
                    it(`Check that ${property.text} text navigation link works`, () => {
                        basePage.clickElementWithText({
                            selector: baseSelectors.tags.coreElements.link,
                            text: property.text
                        })
    
                        cy.wait(500)
                        basePage.checkUrlText(property.url, true)
                    })
                })
            })
        })
    })
