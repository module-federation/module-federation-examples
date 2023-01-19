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
            cardName: Constants.commonText.viteReactMicroFrontendsCardsNames.hostCard,
            symbolName: Constants.commonText.viteReactMicroFrontendsCardsSymbolsNames.starSymbol,
            symbol: selectors.viteReactMicroFrontendsCardsSymbols.starSymbol,
            status: Constants.elementsText.viteReactMicroFrontendsCardsMessages.hostCard
        },
        {
            cardName:  Constants.commonText.viteReactMicroFrontendsCardsNames.remoteCard,
            symbolName: Constants.commonText.viteReactMicroFrontendsCardsSymbolsNames.cloudSymbol,
            symbol: selectors.viteReactMicroFrontendsCardsSymbols.cloudSymbol,
            status: Constants.elementsText.viteReactMicroFrontendsCardsMessages.remoteCard
        }
    ];
    public static readonly commonTypeScriptMonorepoProjectReferencesAppsData = [
        {
            host: 3001,
            header: Constants.commonPhrases.typescriptProjectReferencesAppsHeader,
            appName: Constants.commonPhrases.typescriptProjectReferencesAppsApp1Name
        },
        {
            host: 3002,
            header: Constants.commonPhrases.typescriptProjectReferencesAppsHeader,
            appName: Constants.commonPhrases.typescriptProjectReferencesAppsApp2Name
        }
    ];
    public static readonly comprehensiveAppDemoPages = Constants.elementsText.comprehensiveDemo.comprehensiveDemoDemoPages
    public static readonly comprehensiveAppNames = Constants.elementsText.comprehensiveDemo.comprehensiveDemoDemoPages

}

export function returnCommonDynamicAppsData(paragraphText: string[]) {
    return [
        {
            headerSelector: baseSelectors.h1,
            subHeaderSelector: baseSelectors.h2,
            isButtonExist: true,
            buttonSelector: baseSelectors.button,
            headerText: Constants.elementsText.dynamicRemotesHeader,
            appNameText: Constants.elementsText.dynamicRemotesFirstAppName,
            widgetName: Constants.elementsText.dynamicRemotesWidgetName,
            widgetParagraph: paragraphText,
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
            widgetParagraph: paragraphText,
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
            appNameText: Constants.elementsText.mdmfShell.name,
            headerText: Constants.elementsText.mdfmShellHeader,
            isWelcomeText: true,
            welcomeText,
            paragraphText: Constants.commonPhrases.mdmfShellParagraph,
            tableHeaderText: Constants.elementsText.mdmfAppTableHeader,
            isCardBody: false,
            path: Constants.elementsText.mdmfShell.path,
            host: 4200
        },
        {
            appNameText: Constants.elementsText.mdmfProfile.name,
            headerText: Constants.elementsText.mdfmProfileHeader,
            isWelcomeText: false,
            welcomeText: '',
            paragraphText: Constants.commonPhrases.mdmfProfileParagraph,
            tableHeaderText: Constants.elementsText.mdmfAppTableHeader,
            isCardBody: true,
            sharedHeader: Constants.elementsText.mdmfSharedHeader,
            sharedParagraph: Constants.commonPhrases.mdmfSharedParagraph,
            path: Constants.elementsText.mdmfProfile.path,
            host: 4200
        }
    ]
}

