import { BaseMethods } from '../../../cypress-e2e/common/base';
import { baseSelectors } from '../../../cypress-e2e/common/selectors';
import { Constants } from '../../../cypress-e2e/fixtures/constants';
import { CssAttr } from '../../../cypress-e2e/types/cssAttr';

const basePage: BaseMethods = new BaseMethods();

// Helper function to convert hex to RGB for browser comparison
const hexToRgb = (hex: string): string => {
  // Remove # if present
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);
  return `rgb(${r}, ${g}, ${b})`;
};

describe('Single Runtime Plugin Example', () => {
  describe('App 1 (port 3001)', () => {
    beforeEach(() => {
      basePage.openLocalhost({
        number: 3001,
      });
    });

    it('should have correct title', () => {
      basePage.checkElementWithTextPresence({
        selector: 'h1',
        text: 'App 1 - Single Runtime Demo',
      });
    });

    it('should have explanation section', () => {
      cy.get('h3').contains("What's Happening Here?").should('be.visible');
      cy.get('div').contains('This is').should('be.visible');
    });

    it('should have working counter', () => {
      cy.contains('Shared State Counter: 0').should('be.visible');
      cy.contains('button', 'Increment Counter').click();
      cy.contains('Shared State Counter: 1').should('be.visible');
    });

    it('should have local and remote buttons with correct styling', () => {
      // Check local button
      cy.get('button')
        .contains('App 1 Button')
        .should('be.visible')
        .should('have.css', 'background-color')
        .and('eq', hexToRgb('#4a90e2'));

      // Check remote button
      cy.get('button')
        .contains('App 2 Button')
        .should('be.visible')
        .should('have.css', 'background-color')
        .and('eq', hexToRgb('#e24a90'));
    });

    it('should have working click counters on buttons', () => {
      // Check local button counter
      cy.get('button').contains('App 1 Button').as('localButton');
      cy.get('@localButton').click();
      cy.get('@localButton').should('contain', 'Clicks: 1');

      // Check remote button counter
      cy.get('button').contains('App 2 Button').as('remoteButton');
      cy.get('@remoteButton').click();
      cy.get('@remoteButton').should('contain', 'Clicks: 1');
    });

    it('should show correct runtime information', () => {
      cy.contains('Runtime Information:').should('be.visible');
      
      // Check module names are present
      cy.contains('Module: app1').should('be.visible');
      cy.contains('Module: app2').should('be.visible');

      // Check remote entry URLs
      cy.contains('div', 'Module: app1')
        .parent()
        .contains('Remote Entries:')
        .parent()
        .contains('app2:')
        .parent()
        .find('code')
        .should('contain', 'http://localhost:3002/remoteEntry.js');

      cy.contains('div', 'Module: app2')
        .parent()
        .contains('Remote Entries:')
        .parent()
        .contains('app1:')
        .parent()
        .find('code')
        .should('contain', 'http://localhost:3001/app1_partial.js');
    });

    it('should have working navigation between apps', () => {
      cy.get('a').contains('Go to App 2')
        .should('have.attr', 'href')
        .and('include', '3002');
    });
  });

  describe('App 2 (port 3002)', () => {
    beforeEach(() => {
      basePage.openLocalhost({
        number: 3002,
      });
    });

    it('should have correct title', () => {
      basePage.checkElementWithTextPresence({
        selector: 'h1',
        text: 'App 2 - Single Runtime Demo',
      });
    });

    it('should have explanation section', () => {
      cy.get('h3').contains("What's Happening Here?").should('be.visible');
      cy.get('div').contains('This is').should('be.visible');
    });

    it('should have working counter', () => {
      cy.contains('Shared State Counter: 0').should('be.visible');
      cy.contains('button', 'Increment Counter').click();
      cy.contains('Shared State Counter: 1').should('be.visible');
    });

    it('should have local and remote buttons with correct styling', () => {
      // Check local button
      cy.get('button')
        .contains('App 2 Button')
        .should('be.visible')
        .should('have.css', 'background-color')
        .and('eq', hexToRgb('#e24a90'));

      // Check remote button
      cy.get('button')
        .contains('App 1 Button')
        .should('be.visible')
        .should('have.css', 'background-color')
        .and('eq', hexToRgb('#4a90e2'));
    });

    it('should have working click counters on buttons', () => {
      // Check local button counter
      cy.get('button').contains('App 2 Button').as('localButton');
      cy.get('@localButton').click();
      cy.get('@localButton').should('contain', 'Clicks: 1');

      // Check remote button counter
      cy.get('button').contains('App 1 Button').as('remoteButton');
      cy.get('@remoteButton').click();
      cy.get('@remoteButton').should('contain', 'Clicks: 1');
    });

    it('should show correct runtime information', () => {
      cy.contains('Runtime Information:').should('be.visible');
      
      // Check module names are present
      cy.contains('Module: app1').should('be.visible');
      cy.contains('Module: app2').should('be.visible');

      // Check remote entry URLs
      cy.contains('div', 'Module: app2')
        .parent()
        .contains('Remote Entries:')
        .parent()
        .contains('app1:')
        .parent()
        .find('code')
        .should('contain', 'http://localhost:3001/remoteEntry.js');

      cy.contains('div', 'Module: app1')
        .parent()
        .contains('Remote Entries:')
        .parent()
        .contains('app2:')
        .parent()
        .find('code')
        .should('contain', 'http://localhost:3002/remoteEntry.js');
    });

    it('should have working navigation between apps', () => {
      cy.get('a').contains('Go to App 1')
        .should('have.attr', 'href')
        .and('include', '3001');
    });
  });
});
