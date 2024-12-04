import { BaseMethods } from '../../../cypress-e2e/common/base';
import { baseSelectors } from '../../../cypress-e2e/common/selectors';
import { Constants } from '../../../cypress-e2e/fixtures/constants';

const basePage: BaseMethods = new BaseMethods();

interface AppConfig {
  headerSelector: string;
  subHeaderSelector: string;
  buttonSelector: string;
  headerText: string;
  appNameText: string;
  host: number;
}

const hostApp: AppConfig = {
  headerSelector: baseSelectors.tags.headers.h1,
  subHeaderSelector: baseSelectors.tags.headers.h2,
  buttonSelector: baseSelectors.tags.coreElements.button,
  headerText: Constants.commonConstantsData.controlShare,
  appNameText: Constants.commonConstantsData.commonCountAppNames.app1,
  host: 3001,
};

const remoteApp: AppConfig = {
  headerSelector: baseSelectors.tags.headers.h1,
  subHeaderSelector: baseSelectors.tags.headers.h2,
  buttonSelector: baseSelectors.tags.coreElements.button,
  headerText: Constants.commonConstantsData.controlShare,
  appNameText: Constants.commonConstantsData.commonCountAppNames.app2,
  host: 3002,
};

describe('Control Sharing', () => {
  before(() => {
    // Clear localStorage once before all tests
    cy.window().then((win) => {
      win.localStorage.removeItem('formDataVMSC');
    });
  });

  describe('Host Application', () => {
    beforeEach(() => {
      basePage.openLocalhost({
        number: hostApp.host,
      });
    });

    it('should display correct header and subheader', () => {
      basePage.checkElementWithTextPresence({
        selector: hostApp.headerSelector,
        text: hostApp.headerText,
      });
      basePage.checkElementWithTextPresence({
        selector: hostApp.subHeaderSelector,
        text: hostApp.appNameText,
      });
    });

    it('should display version information', () => {
      basePage.checkElementWithTextPresence({
        selector: 'h4',
        text: 'Host Used React: 17.0.2',
      });
      basePage.checkElementWithTextPresence({
        selector: 'h4',
        text: 'Host Used ReactDOM: 17.0.2',
      });
      basePage.checkElementWithTextPresence({
        selector: 'h4',
        text: 'Host Used Lodash: 4.17.21',
      });
    });

    it('should display app cards with package information', () => {
      // App1 Card
      basePage.checkElementWithTextPresence({
        selector: 'h3',
        text: 'app1',
      });

      // Package sections
      ['lodash', 'react-dom', 'react'].forEach(pkg => {
        basePage.checkElementWithTextPresence({
          selector: 'h4',
          text: pkg,
        });
      });

      // Version information
      basePage.checkElementWithTextPresence({
        selector: 'p',
        text: '4.17.21',
      });
      basePage.checkElementWithTextPresence({
        selector: 'p',
        text: '17.0.2',
      });
    });

    it('should have functional control buttons', () => {
      basePage.checkElementWithTextPresence({
        selector: hostApp.buttonSelector,
        text: 'Clear Settings',
      });
      basePage.checkElementWithTextPresence({
        selector: hostApp.buttonSelector,
        text: 'Save and Reload',
      });
    });

    it('should have version override selects', () => {
      // Check if select elements exist for each package
      basePage.checkElementWithTextPresence({
        selector: 'label',
        text: 'Override Version',
      });
      
      // Verify select options
      basePage.checkElementWithTextPresence({
        selector: 'option',
        text: '4.17.21',
      });
      basePage.checkElementWithTextPresence({
        selector: 'option',
        text: '3.10.1',
      });
      basePage.checkElementWithTextPresence({
        selector: 'option',
        text: '17.0.2',
      });
      basePage.checkElementWithTextPresence({
        selector: 'option',
        text: '16.14.0',
      });
    });

    it('should load version from localStorage and display correct button text', () => {
      // First verify initial version is 3.10.1
      basePage.checkElementWithTextPresence({
        selector: remoteApp.buttonSelector,
        text: 'App 2 Button - lodash 3.10.1',
      });

      // Set localStorage before loading the page
      cy.window().then((win) => {
        win.localStorage.setItem('formDataVMSC', JSON.stringify({"app2":{"lodash":"4.17.21"}}));
      });

      // Reload the page
      cy.reload();

      // Verify the button shows the correct version
      basePage.checkElementWithTextPresence({
        selector: remoteApp.buttonSelector,
        text: 'App 2 Button - lodash 4.17.21',
      });

      // Clear localStorage after test
      cy.window().then((win) => {
        win.localStorage.removeItem('formDataVMSC');
      });
    });
  });

  describe('Remote Application', () => {
    beforeEach(() => {
      basePage.openLocalhost({
        number: remoteApp.host,
      });
    });

    it('should display correct header and subheader', () => {
      basePage.checkElementWithTextPresence({
        selector: remoteApp.headerSelector,
        text: remoteApp.headerText,
      });
      basePage.checkElementWithTextPresence({
        selector: remoteApp.subHeaderSelector,
        text: remoteApp.appNameText,
      });
    });

    it('should have the correct button text', () => {
      basePage.checkElementWithTextPresence({
        selector: remoteApp.buttonSelector,
        text: `${remoteApp.appNameText} ${Constants.commonConstantsData.button}`,
      });
    });
  });
});
