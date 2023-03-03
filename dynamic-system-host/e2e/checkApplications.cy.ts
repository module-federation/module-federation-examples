import {baseSelectors, commonSelectors} from '../../cypress/common/selectors';
import { BaseMethods } from "../../cypress/common/base";
import { Constants } from "../../cypress/fixtures/constants";
import { getDateWithFormat } from "../../cypress/helpers/base-helper";
import { CssAttr } from '../../cypress/types/cssAttr';
import {returnCommonDynamicAppsData} from "../../cypress/fixtures/commonTestData";

const basePage: BaseMethods = new BaseMethods()

const appsData = returnCommonDynamicAppsData(Constants.commonPhrases.dynamicSystemHostApp.paragraphText)

appsData.forEach(
     (
        property: {
            headerSelector: string
            subHeaderSelector: string
            isButtonExist: boolean,
            buttonSelector: string,
            headerText: string,
            appNameText: string,
            widgetQuantity?: number,
            widgetName: string[],
            widgetParagraph: string[],
            widgetColor: string[]
            paragraph: boolean,
            host: number
        }) => {
        const appName = property.host === 3001 ? appsData[0].appNameText : property.host === 3002 ? appsData[1].appNameText : appsData[2].appNameText;
        const host = property.host === 3001 ? appsData[0].host : property.host === 3002 ? appsData[1].host : appsData[2].host;
        const widget: number = property.host === 3002 ? Number(appsData[1].widgetQuantity) : Number(appsData[2].widgetQuantity);

        describe('Dynamic System Host', () => {
            context(`Check ${appName}`, () => {
                it(`Check ${appName} built and running`, () => {
                    basePage.openLocalhost({
                        number: host
                    })
                    basePage.checkElementWithTextPresence({
                        selector: property.headerSelector,
                        text: property.headerText
                    })
                    basePage.checkElementWithTextPresence({
                        selector: property.subHeaderSelector,
                        text: appName
                    })
                    property.paragraph ? 
                        basePage.checkElementWithTextPresence({
                            selector: baseSelectors.tags.paragraph,
                            text: Constants.commonPhrases.dynamicSystemHostApp.hostParagraph,
                        })
                        :
                        basePage.checkElementWithTextPresence({
                            selector: baseSelectors.tags.paragraph,
                            text: Constants.commonPhrases.dynamicSystemHostApp.hostParagraph,
                            isVisible: false
                        })
                })
    
                it(`Check buttons in ${appName} exist`, () => {
                    basePage.openLocalhost({
                        number: host
                    })
                    property.isButtonExist ?
                        Constants.elementsText.dynamicRemotesApp.buttonsText.forEach(button => {
                        basePage.checkElementWithTextPresence({
                            selector: property.buttonSelector,
                            text: button
                        }) 
                    })
                    :
                    basePage.checkElementVisibility({
                        selector: property.buttonSelector,
                        isVisible: property.isButtonExist
                    })
                })
    
                it(`Check functionality in ${appName}`, () => {
                    basePage.openLocalhost({
                        number: host
                    })
                    if (property.isButtonExist) {
                        Constants.elementsText.dynamicRemotesApp.buttonsText.forEach(button => {
                            basePage.clickElementWithText({
                                selector: property.buttonSelector,
                                text: button
                            })
                            basePage.checkElementVisibility({
                                selector: commonSelectors.commonWidget.replace(
                                    '{appQuantity}',
                                    (Constants.elementsText.dynamicRemotesApp.buttonsText.indexOf(button) + 2).toString())
                            })
                            basePage.checkElementHaveProperty({
                                selector: commonSelectors.commonWidget.replace(
                                    '{appQuantity}',
                                    (Constants.elementsText.dynamicRemotesApp.buttonsText.indexOf(button) + 2).toString()),
                                prop: CssAttr.backgroundColor,
                                value: property.widgetColor[Constants.elementsText.dynamicRemotesApp.buttonsText.indexOf(button)]
                            })
                            basePage.checkElementWithTextPresence({
                                selector: property.subHeaderSelector,
                                text: property.widgetName[Constants.elementsText.dynamicRemotesApp.buttonsText.indexOf(button)]
                            })
                            basePage.checkElementWithTextPresence({
                                selector: baseSelectors.tags.paragraph,
                                text: property.widgetParagraph[Constants.elementsText.dynamicRemotesApp.buttonsText.indexOf(button)]
                            })
                            basePage.checkElementWithTextPresence({
                                selector: baseSelectors.tags.paragraph,
                                text: getDateWithFormat('current', 'MMMM Do YYYY, h:mm')
                            })
                        })
                    } else {
                        basePage.checkElementVisibility({
                            selector: commonSelectors.commonWidget.replace(
                                '{appQuantity}',
                                (widget + 2).toString())
                        })
                        basePage.checkElementHaveProperty({
                            selector: commonSelectors.commonWidget.replace(
                                '{appQuantity}',
                                (widget + 2).toString()),
                            prop: 'background-color',
                            value: property.widgetColor[widget]
                        })
                        basePage.checkElementWithTextPresence({
                            selector: property.subHeaderSelector,
                            text: property.widgetName[widget]
                        })
                        basePage.checkElementWithTextPresence({
                            selector: baseSelectors.tags.paragraph,
                            text: property.widgetParagraph[widget]
                        })
                        basePage.checkElementWithTextPresence({
                            selector: baseSelectors.tags.paragraph,
                            text: getDateWithFormat('current', 'MMMM Do YYYY, h:mm')
                        })
                    }
                })
            })
        })
    }
)
