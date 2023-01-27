import {BaseMethods} from "../../../cypress/common/base";
import {Constants} from "../../../cypress/fixtures/constants";
import {baseSelectors, selectors} from "../../../cypress/common/selectors";
import {CssAttr} from "../../../cypress/types/cssAttr";

const basePage: BaseMethods = new BaseMethods()

describe('It checks integrated apps functionality', () => {
    const appsData = [
        {
            host: 3000,
            appName: Constants.commonConstantsData.basicComponents.host,
            appMessage: Constants.commonPhrases.craReactApp.hostApp,
            remoteAppMessage: Constants.commonPhrases.craReactApp.hostAppRemoteMessage,
        },
        {
            host: 3001,
            appName: Constants.elementsText.commonComponentsNames.remote,
            appMessage: Constants.commonPhrases.craReactApp.remoteApp,
        },
    ]

    appsData.forEach((property: { host: number, appName: string, appMessage: string, remoteAppMessage?: string }) => {
        it(`Checks ${property.appName} app background color`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementHaveProperty({
                selector: baseSelectors.header,
                prop: CssAttr.backgroundColor,
                value: Constants.color.darkGrey
            })
        });

        it(`Checks ${property.appName} app message visibility & checks imported remote message visibility if any`, () => {
            basePage.openLocalhost(property.host)
            if(property.remoteAppMessage) {
                basePage.checkElementWithTextPresence({
                    selector: selectors.craReactAppRemoteComponentInfo,
                    text: property.remoteAppMessage,
                    visibilityState: 'be.visible'
                })
            }
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.header,
                text: property.appMessage,
                visibilityState: 'be.visible'
            })
        });
    });
});
