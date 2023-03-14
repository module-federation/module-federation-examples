import {BaseMethods} from "../../../cypress/common/base";
import {Constants} from "../../../cypress/fixtures/constants";
import {CssAttr} from "../../../cypress/types/cssAttr";
import {baseSelectors, updatedSelectors} from "../../../cypress/common/selectors";

const basePage: BaseMethods = new BaseMethods()

describe('Vite React Simple', () => {
    context('It checks elements visibility/functionality', () => {
        beforeEach(() => {
            basePage.openLocalhost({
                number: 3000
            })
        })
    
        it('Checks react logo visibility', () => {
            basePage.checkElementVisibility({
                selector: baseSelectors.tags.coreElements.image
            })
        })
    
        it('Checks intro message visibility', () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.paragraph,
                text: Constants.commonPhrases.viteReactSimpleApp.messages.intro,
                visibilityState: 'be.visible'
            })
        })
    
        it('Checks header block with text visibility', () => {
            basePage.checkElementWithTextPresence({
                selector: updatedSelectors.viteReactSimpleApp.headerBlock,
                text: Constants.commonConstantsData.header,
                visibilityState: 'be.visible'
            })
        })
    
        it('Checks edit message visibility', () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.paragraph,
                text: Constants.commonPhrases.viteReactSimpleApp.messages.edit,
                visibilityState: 'be.visible'
            })
        })
    
        it('Checks texted links visibility & checks links is not disabled', () => {
            Constants.elementsText.viteReactSimpleApp.links.forEach((link: string) => {
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.link,
                    text: link,
                    visibilityState: 'be.visible'
                })
                basePage.checkElementState({
                    selector: baseSelectors.tags.coreElements.link,
                    text: link,
                    state: 'not.be.disabled'
                })
            })
        })
    })
})

describe('Vite React Simple', () => {
    context('It checks elements colors/functionality', () => {
        beforeEach(() => {
            basePage.openLocalhost({
                number: 3000
            })
        })
    
        it('Checks page background color', () => {
            basePage.checkElementHaveProperty({
                selector: baseSelectors.tags.headers.header,
                prop: CssAttr.backgroundColor,
                value: Constants.color.darkGrey
            })
        })
    
        it('Checks react logo is rotating', () => {
            basePage.checkElementHaveProperty({
                selector: baseSelectors.tags.coreElements.image,
                prop: 'have.css',
                value: CssAttr.transform,
                isWithInvoke: false
            })
        })
    
        it('Checks header block color', () => {
            basePage.checkElementHaveProperty({
                selector: updatedSelectors.viteReactSimpleApp.headerBlock,
                prop: CssAttr.backgroundColor,
                value: Constants.color.darkSaturatedBlue
            })
        })
    
        it('Checks counter in counter-texted button changed after click and reverts after reload', () => {
            basePage.checkCounterFunctionality({
                button: baseSelectors.tags.coreElements.button,
                counterText: Constants.elementsText.viteReactSimpleApp.buttons.counter,
                isReloaded: true
            })
        })
    
        it('Checks counter in counter-texted button is not updated by click on webpack button', () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.viteReactSimpleApp.buttons.counter
            })
            basePage.clickElementWithText({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.viteReactSimpleApp.buttons.webpack
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.viteReactSimpleApp.buttons.counter
                    .replace(Constants.commonConstantsData.commonIndexes.zero.toString(), Constants.commonConstantsData.commonIndexes.one.toString()),
                isVisible: false
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.viteReactSimpleApp.buttons.counter
            })
        })
    
        it('Checks color of links text', () => {
            Constants.elementsText.viteReactSimpleApp.links.forEach((link: string) => {
                basePage.checkElementHaveProperty({
                    selector: baseSelectors.tags.coreElements.link,
                    text: link,
                    prop: CssAttr.color,
                    value: Constants.color.mint
                })
            })
        })
    })
})
