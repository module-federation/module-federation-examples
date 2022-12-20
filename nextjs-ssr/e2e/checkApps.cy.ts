        import { BaseMethods } from '../../cypress/common/base';
        import { baseSelectors } from '../../cypress/common/selectors';
        import { Constants } from '../../cypress/fixtures/constants';
        import {NextjsSsrMethods} from "./methods/methods";

        const methodsPage: NextjsSsrMethods = new NextjsSsrMethods();
        const basePage: BaseMethods = new BaseMethods();

        const appsData = [
            {
                appName: Constants.elementsText.nextjsSsrHome,
                host: 3001
            },
    // TODO : Checks for Shop app (port 3002) are commented, because there is the error after reloading shop page (localhost:3002/shop). 
    // Error: Hydration failed because the initial UI does not match what was rendered on the server.
    // Uncomment after fixing
            // {
            //     appName: Constants.elementsText.nextjsSsrShop,
            //     host: 3002
            // },
            {
                appName: Constants.elementsText.nextjsSsrCheckout,
                host: 3000
            }
        ]

        appsData.forEach(
            function (
                property: {
                    appName: string
                    host: number
                }) {
            // TODO : Uncomment after fixing the Error: Hydration failed 
                // let appName = property.host === 3001 ? appsData[0].appName : property.host === 3002 ? appsData[1].appName : appsData[2].appName;
                // let host = property.host === 3001 ? appsData[0].host : property.host === 3002 ? appsData[1].host : appsData[2].host;
                let appName = property.host === 3001 ? appsData[0].appName :  appsData[1].appName;
                let host = property.host === 3001 ? appsData[0].host : appsData[1].host;

                let navigationTextedLinks = [
                    {
                        text: Constants.elementsText.nextjsSsrHome,
                        link: Constants.hrefs.nextjsSsrHomeLink,
                        url: Constants.hrefs.nextjsSsrHomeLink,
                    },
                    {
                        text: Constants.elementsText.nextjsSsrShop,
                        link: Constants.hrefs.nextjsSsrShopLink,
                        url: Constants.hrefs.nextjsSsrShopLink,
                    },
                    {
                        text: Constants.elementsText.nextjsSsrCheckout,
                        link: Constants.hrefs.nextjsSsrCheckoutLink,
                        url: Constants.hrefs.nextjsSsrCheckoutLink,
                    }
                ]

                let commonTextedLinks = [
                    {
                        text: Constants.elementsText.nextjsSsrZeitText,
                        link: Constants.hrefs.nextjsSsrZeitLink,
                        url: Constants.hrefs.nextjsSsrZeitUrl,
                    },
                    {
                        text: Constants.elementsText.nextjsSsrGiHubText,
                        link: Constants.hrefs.nextjsSsrGitHubLink,
                        url: Constants.hrefs.nextjsSsrGitHubUrl,
                    },  
                ]

                let tileTextedLinks = [
                    {
                        text: Constants.elementsText.nextjsSsrDocumentationTile,
                        link: Constants.hrefs.nextjsSsrDocumentationLink,
                        url: Constants.hrefs.nextjsSsrDocumentationUrl,
                    },
                    {
                        text: Constants.elementsText.nextjsSsrLearnTile,
                        link: Constants.hrefs.nextjsSsrLearnLink,
                        url: Constants.hrefs.nextjsSsrLearnUrl,
                    },
                    {
                        text: Constants.elementsText.nextjsSsrExamplesTile,
                        link: Constants.hrefs.nextjsSsrExamplesLink,
                        url: Constants.hrefs.nextjsSsrExamplesUrl,
                    }, 
                ]

        describe(`Check content in ${appName} app`, () => {
            // TODO cy.exec don't build the apps correctly cause lerna executes without exit code. Uncomment after fix this issue!
                // before(() => {
                //     basePage.buildTheSample(Constants.samplesPath.nextjsSsr)
                // })

                // after(() => {
                //     basePage.shutdownTheSample(Constants.samplesPath.nextjsSsr)
                // })

        

        describe(`Check the content of Home page`, () => {
            beforeEach(() => {
                basePage.openLocalhost(host)
            })

            it(`Check the header content of Home page`, () => {
                basePage.checkElementContainText(baseSelectors.listElement, Constants.elementsText.nextjsSsrHome)
                basePage.checkElementContainText(baseSelectors.listElement, Constants.elementsText.nextjsSsrShop)
                basePage.checkElementContainText(baseSelectors.listElement, Constants.elementsText.nextjsSsrCheckout)
                basePage.checkElementContainText(baseSelectors.listElement, Constants.elementsText.nextjsSsrZeitText)
                basePage.checkElementContainText(baseSelectors.listElement, Constants.elementsText.nextjsSsrGiHubText)
                basePage.checkElementContainText(baseSelectors.nextApp, Constants.elementsText.nextjsSsrWelcomeText)
            })

            it(`Check the main content of Home page`, () => {
                basePage.checkElementContainText(baseSelectors.heroSection, Constants.elementsText.nextjsSsrText3)
                basePage.checkElementContainText(baseSelectors.heroSection, Constants.elementsText.nextjsSsrText4)
                basePage.checkElementContainText(baseSelectors.divElement, Constants.elementsText.nextjsSsrMainWelcome)
                basePage.checkElementContainText(baseSelectors.divElement, Constants.elementsText.nextjsSsrText5)
                basePage.checkElementContainText(baseSelectors.divElement, Constants.elementsText.nextjsSsrMainWelcome)
                basePage.checkElementContainText(baseSelectors.divElement, Constants.elementsText.nextjsSsrText5)
                basePage.checkElementContainText(baseSelectors.divElement, Constants.elementsText.nextjsSsrMainWelcome)
                basePage.checkElementContainText(baseSelectors.divElement, Constants.elementsText.nextjsSsrText5)
            })

            it(`Check the tiles exist on Home page`, () => {
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.linkTag,
                    text: Constants.elementsText.nextjsSsrDocumentationTile
                })

                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.linkTag,
                    text: Constants.elementsText.nextjsSsrLearnTile
                })

                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.linkTag,
                    text: Constants.elementsText.nextjsSsrExamplesTile
                })
            })

            describe(`Check links on Home page`, () => {
                beforeEach(() => {
                    basePage.openLocalhost(host)
                })

                navigationTextedLinks.forEach(function (property: { text: string, link: string }) {
                    it(`Check that ${property.text} text includes link, is not disabled`, () => {
                        methodsPage.checkElementWithTextContainsLink(baseSelectors.linkTag, property.text, property.link)
                    })
                })

                commonTextedLinks.forEach(function (property: { text: string, link: string }) {
                    it(`Check that ${property.text} text includes link, is not disabled`, () => {
                        methodsPage.checkElementWithTextContainsLink(baseSelectors.linkTag, property.text, property.link)
                    })
                })

                tileTextedLinks.forEach(function (property: { text: string, link: string }) {
                    it(`Check that ${property.text} text includes link and is not disabled`, () => {
                        methodsPage.checkParentElementWithTextContainsLink(baseSelectors.linkTag, property.text, property.link)
                    })
                });

                navigationTextedLinks.forEach(function (property: { text: string, url: string }) {
                    it(`Check that ${property.text} navigation link works`, () => {
                        basePage.clickElementWithText({
                        selector: baseSelectors.linkTag,
                        text: property.text})

                        basePage.checkUrlText(property.url, true)
                    })
                })
            })
        })

            describe(`Check the content of Shop page`, () => {
                beforeEach(() => {
                    basePage.openLocalhost(host, Constants.hrefs.nextjsSsrShopLink)
                })

                it(`Check the header content of Shop page`, () => {
                    basePage.checkElementContainText(baseSelectors.listElement, Constants.elementsText.nextjsSsrHome)
                    basePage.checkElementContainText(baseSelectors.listElement, Constants.elementsText.nextjsSsrShop)
                    basePage.checkElementContainText(baseSelectors.listElement, Constants.elementsText.nextjsSsrCheckout)
                    basePage.checkElementContainText(baseSelectors.listElement, Constants.elementsText.nextjsSsrZeitText)
                    basePage.checkElementContainText(baseSelectors.listElement, Constants.elementsText.nextjsSsrGiHubText)
                    basePage.checkElementContainText(baseSelectors.nextApp, Constants.elementsText.nextjsSsrWelcomeText)
            })

                it(`Check the main content of Shop page`, () => {
                    basePage.checkElementContainText(baseSelectors.nextApp, Constants.elementsText.nextjsSsrShopPage)
                    basePage.checkElementContainText(baseSelectors.nextApp, Constants.elementsText.nextjsSsrMainShopText)
            })

        describe(`Check links on Shop page`, () => {
            beforeEach(() => {
                basePage.openLocalhost(host, Constants.hrefs.nextjsSsrShopLink)
            })

            navigationTextedLinks.forEach(function (property: { text: string, link: string }) {
                it(`Check that ${property.text} text includes link and is not disabled`, () => {
                    methodsPage.checkElementWithTextContainsLink(baseSelectors.linkTag, property.text, property.link)
                })
            })

            commonTextedLinks.forEach(function (property: { text: string, link: string }) {
                it(`Check that ${property.text} text includes link and is not disabled`, () => {
                    methodsPage.checkElementWithTextContainsLink(baseSelectors.linkTag, property.text, property.link)
                })
            })

            navigationTextedLinks.forEach(function (property: { text: string, url: string }) {
                it(`Check that ${property.text} text navigation link works`, () => {
                    basePage.clickElementWithText({
                    selector: baseSelectors.linkTag,
                    text: property.text})

                    basePage.checkUrlText(property.url, true)
                })
            })
        })
        })

        describe(`Check the content of Checkout page`, () => {
            beforeEach(() => {
                basePage.openLocalhost(host, Constants.hrefs.nextjsSsrCheckoutLink)
            })


            it(`Check the header content of Checkout page`, () => {
                basePage.checkElementContainText(baseSelectors.listElement, Constants.elementsText.nextjsSsrHome)
                basePage.checkElementContainText(baseSelectors.listElement, Constants.elementsText.nextjsSsrShop)
                basePage.checkElementContainText(baseSelectors.listElement, Constants.elementsText.nextjsSsrCheckout)
                basePage.checkElementContainText(baseSelectors.listElement, Constants.elementsText.nextjsSsrZeitText)
                basePage.checkElementContainText(baseSelectors.listElement, Constants.elementsText.nextjsSsrGiHubText)
                basePage.checkElementContainText(baseSelectors.nextApp, Constants.elementsText.nextjsSsrWelcomeText)
        })

            it(`Check the main content of Checkout page`, () => {
                basePage.checkElementContainText(baseSelectors.nextApp, Constants.elementsText.nextjsSsrCheckoutPage)
                basePage.checkElementContainText(baseSelectors.nextApp, Constants.elementsText.nextjsSsrMainCheckoutText)
                basePage.checkElementContainText(baseSelectors.nextApp, Constants.elementsText.nextjsSsrText1)
                basePage.checkElementContainText(baseSelectors.nextApp, Constants.elementsText.nextjsSsrText2)
                basePage.checkElementContainText(baseSelectors.preElement, Constants.elementsText.nextjsSsrJSON, 1)
        })

        describe(`Check links on Checkout page`, () => {
        beforeEach(() => {
            basePage.openLocalhost(host, Constants.hrefs.nextjsSsrCheckoutLink)
        })

        navigationTextedLinks.forEach(function (property: { text: string, link: string }) {
            it(`Check that ${property.text} text includes link and is not disabled`, () => {
                methodsPage.checkElementWithTextContainsLink(baseSelectors.linkTag, property.text, property.link)
            })
        })

        commonTextedLinks.forEach(function (property: { text: string, link: string }) {
            it(`Check that ${property.text} text includes link and is not disabled`, () => {
                methodsPage.checkElementWithTextContainsLink(baseSelectors.linkTag, property.text, property.link)
            })
        })

        navigationTextedLinks.forEach(function (property: { text: string, url: string }) {
            it(`Check that ${property.text} text navigation link works`, () => {
                basePage.clickElementWithText({
                selector: baseSelectors.linkTag,
                text: property.text})

                cy.wait(500)
                basePage.checkUrlText(property.url, true)
            })
        })
    })
    })
    })
})
