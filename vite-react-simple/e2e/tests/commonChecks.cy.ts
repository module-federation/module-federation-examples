import { BaseMethods } from "../../../cypress/common/base";
import {baseSelectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";
import {CssAttr} from "../../../cypress/types/cssAttr";

const basePage: BaseMethods = new BaseMethods()

describe('It checks buttons & links on page', () => {
    const appsData = [
        {
            buttonName: Constants.commonConstantsData.webpack,
            buttonText: Constants.elementsText.viteReactSimpleApp.buttons.webpack,
            buttonColor: Constants.color.red,
            link: Constants.commonConstantsData.links.react,
            linkName: Constants.elementsText.viteReactSimpleApp.links[0],
        },
        {
            buttonName: Constants.commonConstantsData.counter.toLowerCase(),
            buttonText: Constants.elementsText.viteReactSimpleApp.buttons.counter,
            buttonColor: Constants.color.lightGrey,
            link: Constants.hrefs.viteReactSimpleApp.viteLink,
            linkName: Constants.elementsText.viteReactSimpleApp.links[1],
        }
    ]

    appsData.forEach((property: { buttonName: string, buttonText: string, buttonColor: string, link: string, linkName: string }) => {
        it(`Checks ${property.buttonName} texted button visibility`, () => {
            basePage.openLocalhost(3000)
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.button,
                text: property.buttonText,
                visibilityState: 'be.visible'
            })
        });

        it(`Checks ${property.buttonName} texted button color`, () => {
            basePage.openLocalhost(3000)
            basePage.checkElementHaveProperty({
                selector: baseSelectors.tags.coreElements.button,
                prop: CssAttr.backgroundColor,
                value: property.buttonColor,
                text: property.buttonText,
            })
        })


        it(`Checks ${property.buttonName} texted button is not disabled`, () => {
            basePage.openLocalhost(3000)
            basePage.checkElementState({
                selector: baseSelectors.tags.coreElements.button,
                text: property.buttonText,
                state: 'not.be.disabled'
            })
        })

        it(`Checks ${property.linkName} link functionality`, () => {
            basePage.openLocalhost(3000)
            basePage.checkOutsideResourceUrl({
                selector: baseSelectors.tags.coreElements.link,
                text: property.linkName,
                link: property.link,
            })
        })
    })
})