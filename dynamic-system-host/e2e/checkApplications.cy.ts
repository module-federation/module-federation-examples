import { baseSelectors, widgets } from '../../cypress/common/selectors';
import { BaseMethods } from "../../cypress/common/base";
import { Constants } from "../../cypress/fixtures/constants";
import { getDateWithFormat } from "../../cypress/helpers/base-helper";
import { CssAttr } from '../../cypress/types/cssAttr';

const basePage: BaseMethods = new BaseMethods()

const appsData = [
    {
        headerSelector: baseSelectors.h1,
        subHeaderSelector: baseSelectors.h2,
        isButtonExist: true,
        buttonSelector: baseSelectors.button,
        headerText: Constants.elementsText.dynamicRemotesHeader,
        appNameText: Constants.elementsText.dynamicRemotesFirstAppName,
        widgetName: Constants.elementsText.dynamicRemotesWidgetName,
        widgetParagraph: Constants.commonPhrases.dynamicSystemHostParagraphText,
        widgetColor: Constants.color.dynamicRemotesWidgetColor,
        paragraph: true,
        host: 3001
    },
    {
        headerSelector: baseSelectors.h1,
        subHeaderSelector: baseSelectors.h2,
        isButtonExist: false,
        buttonSelector: baseSelectors.button,
        headerText: Constants.elementsText.dynamicRemotesHeader,
        appNameText: Constants.elementsText.dynamicRemotesSecondAppName,
        widgetQuantity: 0,
        widgetName: Constants.elementsText.dynamicRemotesWidgetName,
        widgetParagraph: Constants.commonPhrases.dynamicSystemHostParagraphText,
        widgetColor: Constants.color.dynamicRemotesWidgetColor,
        paragraph: false,
        host: 3002
    },
    {
        headerSelector: baseSelectors.h1,
        subHeaderSelector: baseSelectors.h2,
        isButtonExist: false,
        buttonSelector: baseSelectors.button,
        headerText: Constants.elementsText.dynamicRemotesHeader,
        appNameText: Constants.elementsText.dynamicRemotesThirdAppName,
        widgetQuantity: 1,
        widgetName: Constants.elementsText.dynamicRemotesWidgetName,
        widgetParagraph: Constants.commonPhrases.dynamicSystemHostParagraphText,
        widgetColor: Constants.color.dynamicRemotesWidgetColor,
        paragraph: false,
        host: 3003
    }
]

appsData.forEach(
    function (
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
        }) {
        let appName = property.host === 3001 ? appsData[0].appNameText : property.host === 3002 ? appsData[1].appNameText : appsData[2].appNameText;
        let host = property.host === 3001 ? appsData[0].host : property.host === 3002 ? appsData[1].host : appsData[2].host;
        let widget: number = property.host === 3002 ? Number(appsData[1].widgetQuantity) : Number(appsData[2].widgetQuantity);

        describe(`Check ${appName}`, () => {

            it(`Check ${appName} built and running`, () => {
                basePage.openLocalhost(host)
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
                        selector: baseSelectors.paragraph,
                        text: Constants.commonPhrases.dynamicSytemHostParagraph
                    })
                    :
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.paragraph,
                        text: Constants.commonPhrases.dynamicSytemHostParagraph,
                        isVisible: false
                    })
            })

            it(`Check buttons in ${appName} exist`, () => {
                basePage.openLocalhost(host)
                property.isButtonExist ?
                Constants.elementsText.dynamicRemotesButtonsText.forEach(button => {
                    basePage.checkElementWithTextPresence({
                        selector: property.buttonSelector,
                        text: button
                    }) 
                })
                :
                basePage.checkElementExist({
                    selector: property.buttonSelector,
                    isVisible: property.isButtonExist
                })
            })

            it(`Check functionality in ${appName}`, () => {
                basePage.openLocalhost(host)
                if (property.isButtonExist) {
                    Constants.elementsText.dynamicRemotesButtonsText.forEach(button => {
                        basePage.clickElementWithText({
                            selector: property.buttonSelector,
                            text: button
                        })
                        basePage.checkElementExist({
                            selector: widgets.dynamicRemotesWidget.replace(
                                '{appQuantity}',
                                (Constants.elementsText.dynamicRemotesButtonsText.indexOf(button) + 2).toString())
                        })
                        basePage.checkElementHaveProperty({
                            selector: widgets.dynamicRemotesWidget.replace(
                                '{appQuantity}',
                                (Constants.elementsText.dynamicRemotesButtonsText.indexOf(button) + 2).toString()),
                            prop: CssAttr.backgroundColor,
                            value: property.widgetColor[Constants.elementsText.dynamicRemotesButtonsText.indexOf(button)]
                        })
                        basePage.checkElementWithTextPresence({
                            selector: property.subHeaderSelector,
                            text: property.widgetName[Constants.elementsText.dynamicRemotesButtonsText.indexOf(button)]
                        })
                        basePage.checkElementWithTextPresence({
                            selector: baseSelectors.paragraph,
                            text: property.widgetParagraph[Constants.elementsText.dynamicRemotesButtonsText.indexOf(button)]
                        })
                        basePage.checkElementWithTextPresence({
                            selector: baseSelectors.paragraph,
                            text: getDateWithFormat('current', 'MMMM Do YYYY, h:mm:ss a')
                        })
                    })
                } else {
                    basePage.checkElementExist({
                        selector: widgets.dynamicRemotesWidget.replace(
                            '{appQuantity}',
                            (widget + 2).toString())
                    })
                    basePage.checkElementHaveProperty({
                        selector: widgets.dynamicRemotesWidget.replace(
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
                        selector: baseSelectors.paragraph,
                        text: property.widgetParagraph[widget]
                    })
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.paragraph,
                        text: getDateWithFormat('current', 'MMMM Do YYYY, h:mm:ss a')
                    })
                }
            })
        })
    }
)
