import {getRandomTextString} from "../helpers/base-helper";
import {Constants} from "./constants";
import {baseSelectors, selectors} from "../common/selectors";

export class CommonTestData {
    public static readonly multipleSizeStringsArray = [
        getRandomTextString(10),
        getRandomTextString(100),
        getRandomTextString(1000),
    ];
    public static readonly sharedRoutingAppHosts = [
        {
            host: 3000
        },
        {
            host: 3001
        },
        {
            host: 3002
        },
        {
            host: 3003
        },
        {
            host: 3004
        },
    ];
    public static readonly commonMicroFrontendsAppsData = [
        {
            cardName: Constants.commonConstantsData.basicComponents.host.toLowerCase(),
            symbolName: Constants.commonConstantsData.commonMicroFrontendsAppsCardsSymbolsNames.starSymbol,
            symbol: selectors.viteReactMicroFrontendsApp.symbols.star,
            status: Constants.elementsText.commonMicroFrontendsApps.cardMessages.hostCard,
        },
        {
            cardName:  Constants.commonConstantsData.basicComponents.remote.toLowerCase(),
            symbolName: Constants.commonConstantsData.commonMicroFrontendsAppsCardsSymbolsNames.cloudSymbol,
            symbol: selectors.viteReactMicroFrontendsApp.symbols.cloud,
            status: Constants.elementsText.commonMicroFrontendsApps.cardMessages.remoteCard,
        }
    ];
    public static readonly commonTypeScriptAppsData = [
        {
            host: 3001,
            header: Constants.commonConstantsData.typeScript.charAt(0).toUpperCase(),
            appName: Constants.commonConstantsData.commonCountAppNames.app1
        },
        {
            host: 3002,
            header: Constants.commonConstantsData.typeScript.charAt(0).toUpperCase(),
            appName: Constants.commonConstantsData.commonCountAppNames.app2
        }
    ];
    public static readonly commonNextJsAppsData = [
        {
            messageType: Constants.commonConstantsData.nextJsAppsCommonPhrases.messages.welcome.split(' ')[0].trim(),
            selector: baseSelectors.tags.headers.h1,
            message: Constants.commonConstantsData.nextJsAppsCommonPhrases.messages.welcome,
            linkText: Constants.commonConstantsData.nextJsAppsCommonPhrases.messages.welcome.split('to')[1].trim(),
        },
        {
            messageType: Constants.commonConstantsData.nextJsAppsCommonPhrases.messages.start.split('by')[0].trim(),
            selector: baseSelectors.tags.paragraph,
            message: Constants.commonConstantsData.nextJsAppsCommonPhrases.messages.start,
        },
        {
            messageType: Constants.commonConstantsData.nextJsAppsCommonPhrases.messages.engine,
            selector: baseSelectors.tags.footer,
            message: Constants.commonConstantsData.nextJsAppsCommonPhrases.messages.engine,
            linkText: Constants.commonConstantsData.nextJsAppsCommonPhrases.messages.engine,
        },
        {
            messageType: baseSelectors.tags.footer.charAt(0).toUpperCase() + baseSelectors.tags.footer.slice(1),
            selector: baseSelectors.tags.coreElements.body,
            message: Constants.commonConstantsData.nextJsAppsCommonPhrases.messages.footer,
        }
    ]
    public static readonly nextJsAppsHeaderLinkName = Constants.commonConstantsData.nextJsAppsCommonPhrases.messages.welcome.split('to')[1].trim()
}

export function returnCommonDynamicAppsData(paragraphText: string[]) {
    return [
        {
            headerSelector: baseSelectors.tags.headers.h1,
            subHeaderSelector: baseSelectors.tags.headers.h2,
            isButtonExist: true,
            buttonSelector: baseSelectors.tags.coreElements.button,
            headerText: Constants.elementsText.dynamicRemotesApp.header,
            appNameText: Constants.commonConstantsData.commonCountAppNames.app1,
            widgetName: Constants.elementsText.dynamicRemotesApp.widgetsNames,
            widgetParagraph: paragraphText,
            widgetColor: Constants.color.dynamicRemotesWidgetColor,
            paragraph: true,
            host: 3001
        },
        {
            headerSelector: baseSelectors.tags.headers.h1,
            subHeaderSelector: baseSelectors.tags.headers.h2,
            isButtonExist: false,
            buttonSelector: baseSelectors.tags.coreElements.button,
            headerText: Constants.elementsText.dynamicRemotesApp.header,
            appNameText: Constants.commonConstantsData.commonCountAppNames.app2,
            widgetQuantity: 0,
            widgetName: Constants.elementsText.dynamicRemotesApp.widgetsNames,
            widgetParagraph: paragraphText,
            widgetColor: Constants.color.dynamicRemotesWidgetColor,
            paragraph: false,
            host: 3002
        },
        {
            headerSelector: baseSelectors.tags.headers.h1,
            subHeaderSelector: baseSelectors.tags.headers.h2,
            isButtonExist: false,
            buttonSelector: baseSelectors.tags.coreElements.button,
            headerText: Constants.elementsText.dynamicRemotesApp.header,
            appNameText: Constants.commonConstantsData.commonCountAppNames.app3,
            widgetQuantity: 1,
            widgetName: Constants.elementsText.dynamicRemotesApp.widgetsNames,
            widgetParagraph: paragraphText,
            widgetColor: Constants.color.dynamicRemotesWidgetColor,
            paragraph: false,
            host: 3003
        }
    ]
}

export function returnCommonAngularAppsData(welcomeText: string) {
    return [
        {
            appNameText: Constants.commonConstantsData.commonAngularAppsData.mdmfShellName,
            headerText: Constants.commonConstantsData.commonAngularAppsData.headers.shell,
            isWelcomeText: true,
            welcomeText,
            paragraphText: Constants.commonConstantsData.commonAngularAppsData.messages.shellParagraph,
            tableHeaderText: Constants.commonConstantsData.commonAngularAppsData.headers.table,
            isCardBody: false,
            path: Constants.commonConstantsData.home.toLowerCase(),
            host: 4200
        },
        {
            appNameText: Constants.commonConstantsData.commonAngularAppsData.mdmfProfile.name,
            headerText: Constants.commonConstantsData.commonAngularAppsData.headers.profile,
            isWelcomeText: false,
            welcomeText: '',
            paragraphText: Constants.commonConstantsData.commonAngularAppsData.messages.profileParagraph,
            tableHeaderText: Constants.commonConstantsData.commonAngularAppsData.headers.table,
            isCardBody: true,
            sharedHeader: Constants.elementsText.differentAngularVersionsApps.mdmfSharedHeader,
            sharedParagraph: Constants.commonConstantsData.commonAngularAppsData.messages.sharedParagraph,
            path: Constants.commonConstantsData.commonAngularAppsData.mdmfProfile.path,
            host: 4200
        }
    ]
}

