import {baseSelectors, commonSelectors} from '../../../cypress/common/selectors';
import { BaseMethods } from "../../../cypress/common/base"
import { Constants } from "../../../cypress/fixtures/constants"
import { getDateWithFormat } from "../../../cypress/helpers/base-helper"
import { CssAttr } from "../../../cypress/types/cssAttr"

const basePage: BaseMethods = new BaseMethods()

const appsData = [
    {
        headerSelector: baseSelectors.tags.headers.h1,
        subHeaderSelector: baseSelectors.tags.headers.h2,
        headerText: Constants.elementsText.dynamicRemotesApp.header,
        appNameText: Constants.commonConstantsData.commonCountAppNames.app1,
        widgetName: Constants.elementsText.dynamicRemotesApp.synchronousImportWidgetsNames,
        widgetParagraph: Constants.commonPhrases.dynamicRemotesApp.widgetParagraphText,
        widgetColor: Constants.color.dynamicRemotesWidgetColor,
        widgetIndexNumber: 1,
        isTwoWidgets: true,
        host: 3001
    },
    {
        headerSelector: baseSelectors.tags.headers.h1,
        subHeaderSelector: baseSelectors.tags.headers.h2,
        headerText: Constants.elementsText.dynamicRemotesApp.header,
        appNameText: Constants.commonConstantsData.commonCountAppNames.app2,
        widgetName: Constants.elementsText.dynamicRemotesApp.synchronousImportWidgetsNames,
        widgetParagraph: Constants.commonPhrases.dynamicRemotesApp.widgetParagraphText,
        widgetColor: Constants.color.dynamicRemotesWidgetColor,
        widgetIndexNumber: 2,
        isTwoWidgets: false,
        host: 3002
    }
]

appsData.forEach(
    (property: {
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
    }) => {
        const appName = property.host === 3001 ? appsData[0].appNameText : appsData[1].appNameText;
        const host = property.host === 3001 ? appsData[0].host : appsData[1].host;
        const widgetIndexNumber = property.host === 3001 ? appsData[0].widgetIndexNumber : appsData[1].widgetIndexNumber

        describe('Dynamic Remotes SYnchronous imports', () => {
            context(`Check ${appName}`, () => {
                it(`Check ${appName} elements exis on the page`, () => {
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
                })
    
                it(`Check widgets in ${appName}`, () => {
                    basePage.openLocalhost({
                    number: host
                })
                    if (property.isTwoWidgets) {
                        property.widgetName.forEach((widget) => {
                            basePage.checkElementVisibility({
                                selector: commonSelectors.commonWidget.replace(
                                    '{appQuantity}',
                                    (property.widgetName.indexOf(widget) + 1).toString())
                            })
                            basePage.checkElementWithTextPresence({
                                selector: property.subHeaderSelector,
                                text: property.widgetName[property.widgetName.indexOf(widget)]
                            })
                            basePage.checkElementWithTextPresence({
                                selector: baseSelectors.tags.paragraph,
                                text: property.widgetParagraph[property.widgetName.indexOf(widget)]
                            })
                            basePage.checkElementWithTextPresence({
                                selector: baseSelectors.tags.paragraph,
                                text: getDateWithFormat('current', 'MMMM Do YYYY, h:mm')
                            })
                            basePage.checkElementHaveProperty({
                                selector: commonSelectors.commonWidget.replace(
                                    '{appQuantity}',
                                    (property.widgetName.indexOf(widget) + 1).toString()),
                                prop: CssAttr.backgroundColor,
                                value: property.widgetColor[property.widgetName.indexOf(widget)]
                            })
                        })
                        return;
                    }
                    basePage.checkElementVisibility({
                        selector: commonSelectors.commonWidget.replace(
                            '{appQuantity}',
                            (widgetIndexNumber).toString())
                    })
                    basePage.checkElementWithTextPresence({
                        selector: property.subHeaderSelector,
                        text: property.widgetName[widgetIndexNumber - 1]
                    })
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.paragraph,
                        text: property.widgetParagraph[widgetIndexNumber - 1]
                    })
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.paragraph,
                        text: getDateWithFormat('current', 'MMMM Do YYYY, h:mm')
                    })
                    basePage.checkElementHaveProperty({
                        selector: commonSelectors.commonWidget.replace(
                            '{appQuantity}',
                            (widgetIndexNumber).toString()),
                        prop: CssAttr.backgroundColor,
                        value: property.widgetColor[1]
                    })
                })
            })
        })
    })
