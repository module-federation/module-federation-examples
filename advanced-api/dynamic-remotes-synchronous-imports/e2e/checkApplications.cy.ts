import { baseSelectors, widgets } from './../../../cypress/common/selectors';
import { BaseMethods } from "../../../cypress/common/base"
import { Constants } from "../../../cypress/fixtures/constants"
import { getDateWithFormat } from "../../../cypress/helpers/base-helper"
import { CssAttr } from "../../../cypress/types/cssAttr"

const basePage: BaseMethods = new BaseMethods()

const appsData = [
    {
        headerSelector: baseSelectors.h1,
        subHeaderSelector: baseSelectors.h2,
        headerText: Constants.elementsText.dynamicRemotesHeader,
        appNameText: Constants.elementsText.dynamicRemotesFirstAppName,
        widgetName: Constants.elementsText.dynamicRemotesSynchronousImportWidgetName,
        widgetParagraph: Constants.commonPhrases.dynamicRemotesWidgetParagraphText,
        widgetColor: Constants.color.dynamicRemotesWidgetColor,
        widgetIndexNumber: 1,
        isTwoWidgets: true,
        host: 3001
    },
    {
        headerSelector: baseSelectors.h1,
        subHeaderSelector: baseSelectors.h2,
        headerText: Constants.elementsText.dynamicRemotesHeader,
        appNameText: Constants.elementsText.dynamicRemotesSecondAppName,
        widgetName: Constants.elementsText.dynamicRemotesSynchronousImportWidgetName,
        widgetParagraph: Constants.commonPhrases.dynamicRemotesWidgetParagraphText,
        widgetColor: Constants.color.dynamicRemotesWidgetColor,
        widgetIndexNumber: 2,
        isTwoWidgets: false,
        host: 3002
    }
]

appsData.forEach(
    function (
        property: {
            headerSelector: string,
            subHeaderSelector: string,
            headerText: string,
            appNameText: string,
            widgetName: string[],
            widgetParagraph: string[],
            widgetColor: string[],
            widgetIndexNumber: number,
            isTwoWidgets: boolean,
            host: number
        }) {
        let appName = property.host === 3001 ? appsData[0].appNameText : appsData[1].appNameText;
        let host = property.host === 3001 ? appsData[0].host : appsData[1].host;
        let widgetIndexNumber = property.host === 3001 ? appsData[0].widgetIndexNumber : appsData[1].widgetIndexNumber

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
            })

            it(`Check widgets in ${appName}`, () => {
                basePage.openLocalhost(host)
                if (property.isTwoWidgets) {
                    property.widgetName.forEach((widget) => {
                        basePage.checkElementExist({
                            selector:widgets.dynamicRemotesWidget.replace(
                                '{appQuantity}',
                                (property.widgetName.indexOf(widget) + 1).toString())
                        })
                        basePage.checkElementWithTextPresence({
                            selector: property.subHeaderSelector,
                            text: property.widgetName[property.widgetName.indexOf(widget)]
                        })
                        basePage.checkElementWithTextPresence({
                            selector: baseSelectors.paragraph,
                            text: property.widgetParagraph[property.widgetName.indexOf(widget)]
                        })
                        basePage.checkElementWithTextPresence({
                            selector: baseSelectors.paragraph,
                            text: getDateWithFormat('current', 'MMMM Do YYYY, h:mm:ss a')
                        })
                        basePage.checkElementHaveProperty({
                            selector:widgets.dynamicRemotesWidget.replace(
                                '{appQuantity}',
                                (property.widgetName.indexOf(widget) + 1).toString()),
                            prop: CssAttr.backgroundColor,
                            value: property.widgetColor[property.widgetName.indexOf(widget)]
                        })
                    })
                } else {
                    basePage.checkElementExist({
                        selector:widgets.dynamicRemotesWidget.replace(
                            '{appQuantity}',
                            (widgetIndexNumber).toString())
                    })
                    basePage.checkElementWithTextPresence({
                        selector: property.subHeaderSelector,
                        text: property.widgetName[widgetIndexNumber - 1]
                    })
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.paragraph,
                        text: property.widgetParagraph[widgetIndexNumber - 1]
                    })
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.paragraph,
                        text: getDateWithFormat('current', 'MMMM Do YYYY, h:mm:ss a')
                    })
                    basePage.checkElementHaveProperty({
                        selector:widgets.dynamicRemotesWidget.replace(
                            '{appQuantity}',
                            (widgetIndexNumber).toString()),
                        prop: CssAttr.backgroundColor,
                        value: property.widgetColor[1]
                    })
                }
            })
        })
    })
