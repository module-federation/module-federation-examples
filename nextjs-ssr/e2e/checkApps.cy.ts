        import { BaseMethods } from '../../cypress/common/base';
        import { baseSelectors } from '../../cypress/common/selectors';
        import { Constants } from '../../cypress/fixtures/constants';
        const basePage: BaseMethods = new BaseMethods();

        const appsData = [
            {
                appName: Constants.commonConstantsData.home,
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
            // TODO : Uncomment after fixing the Error: Hydration failed 
                // let appName = property.host === 3001 ? appsData[0].appName : property.host === 3002 ? appsData[1].appName : appsData[2].appName;
                // let host = property.host === 3001 ? appsData[0].host : property.host === 3002 ? appsData[1].host : appsData[2].host;
                const appName = property.host === 3001 ? appsData[0].appName :  appsData[1].appName;
                const host = property.host === 3001 ? appsData[0].host : appsData[1].host;

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
                basePage.checkElementContainText({
                    selector: baseSelectors.listElement,
                    text: Constants.commonConstantsData.home
                })
                basePage.checkElementContainText({
                    selector: baseSelectors.listElement, 
                    text: Constants.elementsText.nextJsSsrApp.shop,
                })
                basePage.checkElementContainText({
                    selector: baseSelectors.listElement, 
                    text: Constants.elementsText.nextJsSsrApp.checkout
                })
                basePage.checkElementContainText({
                    selector: baseSelectors.listElement, 
                    text: Constants.elementsText.nextJsSsrApp.zeit,
                })
                basePage.checkElementContainText({
                    selector: baseSelectors.listElement, 
                    text: Constants.elementsText.nextJsSsrApp.gitHub,
                })
                basePage.checkElementContainText({
                    selector: baseSelectors.nextApp, 
                    text: Constants.commonConstantsData.helloWorldMessage
                })
            })

            it(`Check the main content of Home page`, () => {
                basePage.checkElementContainText({
                    selector: baseSelectors.heroSection, 
                    text: Constants.elementsText.nextJsSsrApp.texts.text3
                })
                basePage.checkElementContainText({
                    selector: baseSelectors.heroSection, 
                    text: Constants.elementsText.nextJsSsrApp.texts.text4
                })
                basePage.checkElementContainText({
                    selector: baseSelectors.divElement, 
                    text: Constants.elementsText.nextJsSsrApp.messages.welcomeMessage
                })
                basePage.checkElementContainText({
                    selector: baseSelectors.divElement, 
                    text: Constants.elementsText.nextJsSsrApp.texts.text5
                })
                basePage.checkElementContainText({
                    selector: baseSelectors.divElement, 
                    text: Constants.elementsText.nextJsSsrApp.messages.welcomeMessage
                })
                basePage.checkElementContainText({
                    selector: baseSelectors.divElement, 
                    text: Constants.elementsText.nextJsSsrApp.texts.text5
                })
                basePage.checkElementContainText({
                    selector: baseSelectors.divElement, 
                    text: Constants.elementsText.nextJsSsrApp.messages.welcomeMessage
                })
                basePage.checkElementContainText({
                    selector: baseSelectors.divElement, 
                    text: Constants.elementsText.nextJsSsrApp.texts.text5
                })
            })

            it(`Check the tiles exist on Home page`, () => {
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.linkTag,
                    text: Constants.elementsText.nextJsSsrApp.tiles.documentation
                })

                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.linkTag,
                    text: Constants.elementsText.nextJsSsrApp.tiles.learn
                })

                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.linkTag,
                    text: Constants.elementsText.nextJsSsrApp.tiles.examples,
                })
            })

            describe(`Check links on Home page`, () => {
                beforeEach(() => {
                    basePage.openLocalhost(host)
                })

                navigationTextedLinks.forEach((property: { text: string, link: string }) => {
                    it(`Check that ${property.text} text includes link, is not disabled`, () => {
                        basePage.checkElementWithTextContainsLink(baseSelectors.linkTag, property.text, property.link)
                    })
                })

                commonTextedLinks.forEach((property: { text: string, link: string }) => {
                    it(`Check that ${property.text} text includes link, is not disabled`, () => {
                        basePage.checkElementWithTextContainsLink(baseSelectors.linkTag, property.text, property.link)
                    })
                })

                tileTextedLinks.forEach((property: { text: string, link: string }) => {
                    it(`Check that ${property.text} text includes link and is not disabled`, () => {
                        basePage.checkElementWithTextContainsLink(baseSelectors.linkTag, property.text, property.link, true)
                    })
                });

                navigationTextedLinks.forEach((property: { text: string, url: string }) => {
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
                    basePage.openLocalhost(host, Constants.hrefs.nextJsSsrApp.shop)
                })

                it(`Check the header content of Shop page`, () => {
                    basePage.checkElementContainText({
                        selector: baseSelectors.listElement, 
                        text: Constants.commonConstantsData.home
                    })
                    basePage.checkElementContainText({
                        selector: baseSelectors.listElement, 
                        text: Constants.elementsText.nextJsSsrApp.shop,
                    })
                    basePage.checkElementContainText({
                        selector: baseSelectors.listElement, 
                        text: Constants.elementsText.nextJsSsrApp.checkout
                    })
                    basePage.checkElementContainText({
                        selector: baseSelectors.listElement, 
                        text: Constants.elementsText.nextJsSsrApp.zeit,
                    })
                    basePage.checkElementContainText({
                        selector: baseSelectors.listElement, 
                        text: Constants.elementsText.nextJsSsrApp.gitHub,
                    })
                    basePage.checkElementContainText({
                        selector: baseSelectors.nextApp, 
                        text: Constants.commonConstantsData.helloWorldMessage
                    })
            })

                it(`Check the main content of Shop page`, () => {
                    basePage.checkElementContainText({
                        selector: baseSelectors.nextApp, 
                        text: Constants.elementsText.nextJsSsrApp.pages.shopPage
                    })
                    basePage.checkElementContainText({
                        selector: baseSelectors.nextApp, 
                        text: Constants.elementsText.nextJsSsrApp.texts.mainShopText
                    })
            })

        describe(`Check links on Shop page`, () => {
            beforeEach(() => {
                basePage.openLocalhost(host, Constants.hrefs.nextJsSsrApp.shop)
            })

            navigationTextedLinks.forEach((property: { text: string, link: string }) => {
                it(`Check that ${property.text} text includes link and is not disabled`, () => {
                    basePage.checkElementWithTextContainsLink(baseSelectors.linkTag, property.text, property.link)
                })
            })

            commonTextedLinks.forEach((property: { text: string, link: string }) => {
                it(`Check that ${property.text} text includes link and is not disabled`, () => {
                    basePage.checkElementWithTextContainsLink(baseSelectors.linkTag, property.text, property.link)
                })
            })

            navigationTextedLinks.forEach((property: { text: string, url: string }) => {
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
                basePage.openLocalhost(host, Constants.hrefs.nextJsSsrApp.checkout)
            })


            it(`Check the header content of Checkout page`, () => {
                basePage.checkElementContainText({
                    selector: baseSelectors.listElement, 
                    text: Constants.commonConstantsData.home
                })
                basePage.checkElementContainText({
                    selector: baseSelectors.listElement, 
                    text: Constants.elementsText.nextJsSsrApp.shop,
                })
                basePage.checkElementContainText({
                    selector: baseSelectors.listElement, 
                    text: Constants.elementsText.nextJsSsrApp.checkout
                })
                basePage.checkElementContainText({
                    selector: baseSelectors.listElement, 
                    text: Constants.elementsText.nextJsSsrApp.zeit,
                })
                basePage.checkElementContainText({
                    selector: baseSelectors.listElement, 
                    text: Constants.elementsText.nextJsSsrApp.gitHub,
                })
                basePage.checkElementContainText({
                    selector: baseSelectors.nextApp, 
                    text: Constants.commonConstantsData.helloWorldMessage
                })
        })

            it(`Check the main content of Checkout page`, () => {
                basePage.checkElementContainText({
                    selector: baseSelectors.nextApp, 
                    text: Constants.elementsText.nextJsSsrApp.pages.checkoutPage
                })
                basePage.checkElementContainText({
                    selector: baseSelectors.nextApp, 
                    text: Constants.elementsText.nextJsSsrApp.messages.checkoutMessage
                })
                basePage.checkElementContainText({
                    selector: baseSelectors.nextApp, 
                    text: Constants.elementsText.nextJsSsrApp.texts.text1
                })
                basePage.checkElementContainText({
                    selector: baseSelectors.nextApp, 
                    text: Constants.elementsText.nextJsSsrApp.texts.text2
                })
                basePage.checkElementContainText({
                    selector: baseSelectors.preElement, 
                    text: Constants.elementsText.nextJsSsrApp.json,
                    index: 1
                })
        })

        describe(`Check links on Checkout page`, () => {
        beforeEach(() => {
            basePage.openLocalhost(host, Constants.hrefs.nextJsSsrApp.checkout)
        })

        navigationTextedLinks.forEach((property: { text: string, link: string }) => {
            it(`Check that ${property.text} text includes link and is not disabled`, () => {
                basePage.checkElementWithTextContainsLink(baseSelectors.linkTag, property.text, property.link)
            })
        })

        commonTextedLinks.forEach((property: { text: string, link: string }) => {
            it(`Check that ${property.text} text includes link and is not disabled`, () => {
                basePage.checkElementWithTextContainsLink(baseSelectors.linkTag, property.text, property.link)
            })
        })

        navigationTextedLinks.forEach((property: { text: string, url: string }) => {
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
