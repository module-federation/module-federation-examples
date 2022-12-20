import { baseSelectors, block, selectors } from './../../cypress/common/selectors';
import { Constants } from './../../cypress/fixtures/constants';
import { BaseMethods } from "../../cypress/common/base";

const basePage: BaseMethods = new BaseMethods()

const appsData = [
    {
        headerText: Constants.elementsText.differentReactIsolatedHeaderApp1,
        appName: Constants.elementsText.differentReactIsolatedApp1Name,
        buttonName: Constants.elementsText.differentReactIsolatedApp2ButtonName,
        host: 3001
    },
    {
        headerText: Constants.elementsText.differentReactIsolatedHeaderApp2,
        appName: Constants.elementsText.differentReactIsolatedApp2Name,
        buttonName: Constants.elementsText.differentReactIsolatedApp2ButtonName,
        host: 3002
    }
]

appsData.forEach((
    property: {
        headerText: string,
        appName: string,
        buttonName: string
        host: number
    }
) => {
    describe(`Check ${property.appName}`, () => {
        beforeEach(() => {
            basePage.openLocalhost(property.host)
        })
    
        it(`Check ${property.appName} have ${property.headerText} header`, () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.h1,
                text: property.headerText
            })
        })
    
        it(`Check ${property.appName} have ${property.appName} subheader`, () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.h2,
                text: property.appName
            })
        })

        it(`Check ${property.appName} have ${property.buttonName} button`, () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.button,
                text: property.buttonName
            })
        })
    
    
        it(`Check Apps share div with React version 16.14.0`, () => {
            basePage.checkElementExist({
                selector: block.differentReactVersionsIsolatedSharedBlock,
            })
            if(property.host === 3001) {
                basePage.openLocalhost(3002)
            } else {
                basePage.openLocalhost(3001)
            }
            basePage.checkElementExist({
                selector: block.differentReactVersionsIsolatedSharedBlock,
            }) 
        })

        if(property.host === 3001) {
            it(`Check ${property.appName} inject React version 16.14.0 block into a div parent element`, () => {
                basePage.checkChildElementVisibility(
                    baseSelectors.divElement,
                    block.differentReactVersionsIsolatedSharedBlock
                )
                basePage.checkElementExist({
                    selector: selectors.differentReactVersionsIsolatedDivParent,
                })
            })
        } else {
            it(`Check ${property.appName} didn't inject React version 16.14.0 block into a div parent element`, () => {
                basePage.checkChildElementVisibility(
                    baseSelectors.divElement,
                    block.differentReactVersionsIsolatedSharedBlock,
                )
                basePage.checkElementVisibility(
                    block.differentReactVersionsIsolatedSharedBlock
                )
                basePage.checkElementExist({
                    selector: selectors.differentReactVersionsIsolatedDivParent,
                    isVisible: false
                })
            })
        }
    
        it(`Check React version 16.14.0 block`, () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.h1,
                text: Constants.elementsText.differentReactIsolatedHeaderApp2
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.h2,
                text: Constants.elementsText.differentReactIsolatedApp2Name
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.button,
                text: Constants.elementsText.differentReactIsolatedApp2ButtonName
            })
        })
    })
})