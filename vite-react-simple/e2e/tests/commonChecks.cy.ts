import { selectors } from './../../../cypress/common/selectors';
import { BaseMethods } from "../../../cypress/common/base";
import {baseSelectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";
import {CssAttr} from "../../../cypress/types/cssAttr";

const basePage: BaseMethods = new BaseMethods()

describe('Vite React Simple', () => {
    context('It checks buttons & links on page', () => {
        const appsData = [
            {
                buttonName: Constants.commonConstantsData.webpack,
                buttonText: Constants.elementsText.viteReactSimpleApp.buttons.webpack,
                buttonColor: Constants.color.red,
                link: Constants.commonConstantsData.commonLinks.react,
                linkName: Constants.elementsText.viteReactSimpleApp.links[0],
                linkSelector: selectors.viteReactSimple.reactLink
            },
            {
                buttonName: Constants.commonConstantsData.counter.toLowerCase(),
                buttonText: Constants.elementsText.viteReactSimpleApp.buttons.counter,
                buttonColor: Constants.color.lightGrey,
                link: Constants.hrefs.viteReactSimpleApp.viteLink,
                linkName: Constants.elementsText.viteReactSimpleApp.links[1],
                linkSelector: selectors.viteReactSimple.viteLink
            }
        ]
    
        appsData.forEach((property: { buttonName: string, buttonText: string, buttonColor: string, link: string, linkName: string, linkSelector: string }) => {
            it(`Checks ${property.buttonName} texted button visibility`, () => {
                basePage.openLocalhost({
                    number: 3000
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.button,
                    text: property.buttonText,
                    visibilityState: 'be.visible'
                })
            });
    
            it(`Checks ${property.buttonName} texted button color`, () => {
                basePage.openLocalhost({
                    number: 3000
                })
                basePage.checkElementHaveProperty({
                    selector: baseSelectors.tags.coreElements.button,
                    prop: CssAttr.backgroundColor,
                    value: property.buttonColor,
                    text: property.buttonText,
                })
            })
    
    
            it(`Checks ${property.buttonName} texted button is not disabled`, () => {
                basePage.openLocalhost({
                    number: 3000
                })
                basePage.checkElementState({
                    selector: baseSelectors.tags.coreElements.button,
                    text: property.buttonText,
                    state: 'not.be.disabled'
                })
            })
    
            it(`Checks ${property.linkName} link functionality`, () => {
                basePage.openLocalhost({
                    number: 3000
                })
                basePage.checkElementHaveProperty({
                    selector: property.linkSelector,
                    attr: Constants.commonConstantsData.commonAttributes.attr,
                    prop: Constants.commonConstantsData.commonAttributes.href,
                    value: property.link,
                })
                })
        })
    })
})
