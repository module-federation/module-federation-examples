import {
  baseSelectors,
  commonSelectors,
} from './../../cypress/common/selectors';
import { Constants } from '../../cypress/fixtures/constants';
import { BaseMethods } from '../../cypress/common/base';

const basePage: BaseMethods = new BaseMethods();

describe('Angular 15 and Vue 3 microfrontends', () => {
  // context(`Check App Page`, () => {
    beforeEach(() => {
      basePage.openLocalhost(4201);
      basePage.openLocalhost(4200);
    });
    it('Check Angular App is running', () => {

      basePage.clickElementWithText({
        selector: baseSelectors.tags.paragraph,
        text: String('Welcome to the Angular 15 Microfrontend demo using Webpack 5 Module Federation')
      });
    });
    it('Check Vue as a Web Component loaded', () => {
      basePage.clickElementWithText({
        selector: baseSelectors.tags.coreElements.div,
        text: String('Vue Remote Custom Element Content')
      });
    });
  // });
});
