import { BaseMethods } from '../../../cypress-e2e/common/base';
import { baseSelectors } from '../../../cypress-e2e/common/selectors';
import { Constants } from '../../../cypress-e2e/fixtures/constants';
import { CssAttr } from '../../../cypress-e2e/types/cssAttr';

const basePage: BaseMethods = new BaseMethods();

const appButtonPosition: number = 0;

const appsData = [
  {
    headerSelector: baseSelectors.tags.headers.h1,
    subHeaderSelector: baseSelectors.tags.headers.h2,
    buttonSelector: baseSelectors.tags.coreElements.button,
    headerText: Constants.commonConstantsData.controlRemote,
    appNameText: Constants.commonConstantsData.commonCountAppNames.app1,
    buttonColor: Constants.color.red,
    host: 3001,
  },
  {
    headerSelector: baseSelectors.tags.headers.h1,
    subHeaderSelector: baseSelectors.tags.headers.h2,
    buttonSelector: baseSelectors.tags.coreElements.button,
    headerText: Constants.commonConstantsData.controlRemote,
    appNameText: Constants.commonConstantsData.commonCountAppNames.app2,
    buttonColor: Constants.color.deepBlue,
    host: 3002,
  },
];

appsData.forEach(
  (property: {
    headerSelector: string;
    subHeaderSelector: string;
    buttonSelector: string;
    headerText: string;
    appNameText: string;
    buttonColor: string;
    host: number;
  }) => {
    const host = property.host === 3002 ? appsData[1].host : appsData[0].host;
    const appName = property.host === 3002 ? appsData[1].appNameText : appsData[0].appNameText;
    const color = property.host === 3002 ? appsData[1].buttonColor : appsData[0].buttonColor;

    describe(`Endpoint Based Remotes`, () => {
      context(`Check ${appName}:${host}`, () => {
        beforeEach(() => {
          basePage.openLocalhost({
            number: host,
          });
        });

        it(`Check ${appName} header and subheader exist on the page`, () => {
          basePage.checkElementWithTextPresence({
            selector: property.headerSelector,
            text: property.headerText,
          });
          // basePage.checkElementWithTextPresence({
          //   selector: property.subHeaderSelector,
          //   text: `${appName}`,
          // });
        });

        it(`Check buttons in ${appName} exist`, () => {
          basePage.checkElementWithTextPresence({
            selector: property.buttonSelector,
            text: `${appName} ${Constants.commonConstantsData.button}`,
          });
        });

        it(`Check button property in ${appName}`, () => {
          basePage.checkElementContainText({
            selector: property.buttonSelector,
            text: `${appName} ${Constants.commonConstantsData.button}`,
            index: appButtonPosition,
          });
          basePage.checkElementHaveProperty({
            selector: property.buttonSelector,
            text: `${appName} ${Constants.commonConstantsData.button}`,
            prop: CssAttr.background,
            value: color,
          });
        });
      });
    });
  },
);
