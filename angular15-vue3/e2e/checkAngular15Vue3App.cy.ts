import {
  baseSelectors,
  selectors,
} from './../../cypress/common/selectors';
import { Constants } from '../../cypress/fixtures/constants';
import { BaseMethods } from '../../cypress/common/base';

const basePage: BaseMethods = new BaseMethods();

describe('Angular 15 and Vue 3 microfrontends', () => {
  context("Check Angular 15 and Vue 3 elements", () => {
    beforeEach(() => {
      basePage.openLocalhost(4200);
    });
    it('Check Angular App is running', () => {

      basePage.checkElementWithTextPresence({
        selector: baseSelectors.tags.paragraph,
        text: String(Constants.elementsText.angularVue.angularAppHead)
      });
    });
    it('Check Vue as a Web Component loaded', () => {
      basePage.checkElementWithTextPresence({
        selector: selectors.angularVue.webComponent,
        text: String(Constants.elementsText.angularVue.vueWebComponentTitle),
        isShadowRoot: true,
      });
    });
    it('Check Vue as a Vue App Component loaded', () => {
      basePage.checkElementWithTextPresence({
        selector: baseSelectors.tags.coreElements.div,
        text: String(Constants.elementsText.angularVue.vueAsApplicationTitle)
      });
    });

    it('Check Vue as a Web Component interaction works', () => {
      basePage.checkElementWithTextPresence({
        selector: selectors.angularVue.webComponent,
        text: String(Constants.elementsText.angularVue.interactionTextInitial),
        isShadowRoot: true,
      });
      basePage.clickElementWithText({
        selector: selectors.angularVue.btn,
        isForce: true,
        text: 'Click Me'
      });
      basePage.checkElementWithTextPresence({
        selector: selectors.angularVue.webComponent,
        isShadowRoot: true,
        text: String(Constants.elementsText.angularVue.interactionTextChanged)
      });
    });

    it('Check Vue as a Vue App Component interaction works', () => {
      basePage.checkElementWithTextPresence({
        selector: selectors.angularVue.interactionText,
        text: String(Constants.elementsText.angularVue.interactionTextInitial),
        index: 1,
      });
      basePage.clickElementBySelector({
        selector: selectors.angularVue.btn,
        index: 1,
      });
      basePage.checkElementWithTextPresence({
        selector: selectors.angularVue.interactionText,
        text: String(Constants.elementsText.angularVue.interactionTextChanged),
        index: 1,
      });
    });
  });
});
