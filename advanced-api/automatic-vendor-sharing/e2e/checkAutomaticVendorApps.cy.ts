import { BaseMethods } from '../../../cypress/common/base';
import { baseSelectors } from '../../../cypress/common/selectors';
import { Constants } from '../../../cypress/fixtures/constants';
import {CssAttr} from "../../../cypress/types/cssAttr";

const basePage: BaseMethods = new BaseMethods()

const appButtonPosition: number = 0;

const appsData = [
    {
        headerSelector: baseSelectors.h1,
        subHeaderSelector: baseSelectors.h2,
        buttonSelector: baseSelectors.button,
        headerText: Constants.commonConstantsData.biDirectional,
        appNameText: Constants.commonConstantsData.commonCountAppNames.app1,
        buttonColor: Constants.color.red,
        host: 3001
    },
    {
        headerSelector: baseSelectors.h1,
        subHeaderSelector: baseSelectors.h2,
        buttonSelector: baseSelectors.button,
        headerText: Constants.commonConstantsData.biDirectional,
        appNameText: Constants.commonConstantsData.commonCountAppNames.app2,
        buttonColor: Constants.color.deepBlue,
        host: 3002
    }
]

appsData.forEach(
    (property: {
        headerSelector: string
        subHeaderSelector: string
        buttonSelector: string,
        headerText: string,
        appNameText: string,
        buttonColor: string,
        host: number
    }) => {
        const host = property.host === 3002 ? appsData[1].host : appsData[0].host;
        const appName = property.host === 3002 ? appsData[1].appNameText : appsData[0].appNameText;
        const color = property.host === 3002 ? appsData[1].buttonColor : appsData[0].buttonColor;

        describe(`Automatic vendor sharing`, () => {
            context(`Check ${appName}`, () => {
                beforeEach(() => {
                    basePage.openLocalhost(host)
                })
    
                it(`Check ${appName} built and running`, () => {
                    basePage.checkElementWithTextPresence({
                        selector: property.headerSelector,
                        text: property.headerText
                    })
                    basePage.checkElementWithTextPresence({
                        selector: property.subHeaderSelector,
                        text: `${appName}`
                    })
                })
    
                it(`Check buttons in ${appName} exist`, () => {
                    basePage.checkElementWithTextPresence({
                        selector: property.buttonSelector,
                        text: `${appName} ${Constants.commonConstantsData.button}`
                    })
                })
    
                it(`Check button property in ${appName}`, () => {
                    basePage.checkElementPositionbyText(
                        property.buttonSelector,
                        `${appName} ${Constants.commonConstantsData.button}`,
                        appButtonPosition
                    )
                    basePage.checkElementWithTextHaveProperty({
                        selector: property.buttonSelector,
                        text: `${appName} ${Constants.commonConstantsData.button}`,
                        prop: CssAttr.background,
                        value: color
                    })
                })
            })
        })
    })
