import { baseSelectors } from '../../../cypress/common/selectors';
import { Constants } from '../../../cypress/fixtures/constants';
import { BaseMethods } from "../../../cypress/common/base";

const basePage: BaseMethods = new BaseMethods()

const appsData = [
    {
        headerText: Constants.elementsText.serverSideRenderOnlyApp.headers.host,
        sharedComponentText: Constants.elementsText.serverSideRenderOnlyApp.components.sharedComponent,
        updatedSharedComponentText: Constants.elementsText.serverSideRenderOnlyApp.components.updatedSharedComponent,
        host: 3000
    },
    {
        headerText: Constants.elementsText.serverSideRenderOnlyApp.headers.remote,
        sharedComponentText: Constants.elementsText.serverSideRenderOnlyApp.components.sharedComponent,
        updatedSharedComponentText: Constants.elementsText.serverSideRenderOnlyApp.components.updatedSharedComponent,
        host: 3001
    }
]

appsData.forEach((
    property: {
        headerText: string,
        sharedComponentText: string,
        updatedSharedComponentText: string,
        host: number
    }
) => {
    describe('Server Side Render Only', () => {
        context(`Check ${property.headerText} App`, () => {
            beforeEach(() => {
                basePage.openLocalhost({
                    number: property.host
                })
            })
    
            it(`Check ${property.headerText} app build and running + check elemens exist`, () => {
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.headers.h1,
                    text: property.headerText
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.div,
                    text: property.sharedComponentText
                })
            })
    
            it('Update Shared component file', () => {
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.div,
                    text: property.sharedComponentText
                })
                basePage.writeContentToFile({
                    filePath: Constants.filesPath.serverSideRenderOnlyChangeFilePath,
                    content: Constants.elementsText.serverSideRenderOnlyApp.contents.changedContent
                })
                basePage.reloadWindow(true)
            })
    
            it(`Check Shared component visibility in ${property.headerText} after updating & check it is not reverted after reload`, () => {
                basePage.writeContentToFile({
                    filePath: Constants.filesPath.serverSideRenderOnlyChangeFilePath,
                    content: Constants.elementsText.serverSideRenderOnlyApp.contents.changedContent
                })
                if(property.host === 3000) {
                    basePage.openLocalhost({
                        number: 3001
                    })
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.coreElements.div,
                        text: property.updatedSharedComponentText
                    })
                    basePage.reloadWindow(true)
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.coreElements.div,
                        text: property.updatedSharedComponentText
                    })
                    basePage.writeContentToFile({
                        filePath: Constants.filesPath.serverSideRenderOnlyChangeFilePath,
                        content: Constants.elementsText.serverSideRenderOnlyApp.contents.originalContent
                    })
                    return;
                }
                basePage.openLocalhost({
                    number: 3000
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.div,
                    text: property.updatedSharedComponentText
                })
                basePage.reloadWindow(true)
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.div,
                    text: property.updatedSharedComponentText
                })
                basePage.writeContentToFile({
                    filePath: Constants.filesPath.serverSideRenderOnlyChangeFilePath,
                    content: Constants.elementsText.serverSideRenderOnlyApp.contents.originalContent
                })
            })
    
            it(`Check ${property.headerText} app build and running & check shared component visibility`, () => {
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.headers.h1,
                    text: property.headerText
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.div,
                    text: property.sharedComponentText
                })
            })
        })
    })
})
