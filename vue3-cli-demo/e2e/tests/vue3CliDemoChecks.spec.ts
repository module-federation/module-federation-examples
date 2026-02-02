import { test } from '@playwright/test';
import { BaseMethods } from '../../../playwright-e2e/common/base';
import {
  baseSelectors,
  selectors,
  updatedSelectors,
} from '../../../playwright-e2e/common/selectors';
import { Constants } from '../../../playwright-e2e/fixtures/constants';

test.describe('Vue 3 CLI Demo', () => {
  test.describe('It checks certain texted button contains link and not disabled', () => {
    const textedLinks = [
      {
        text: Constants.hrefs.vueCliApp.documentation.name,
        link: Constants.hrefs.vueCliApp.documentation.link,
      },
      { text: Constants.hrefs.vueCliApp.babel.name, link: Constants.hrefs.vueCliApp.babel.link },
      { text: Constants.hrefs.vueCliApp.router.name, link: Constants.hrefs.vueCliApp.router.link },
      { text: Constants.hrefs.vueCliApp.vuex.name, link: Constants.hrefs.vueCliApp.vuex.link },
      { text: Constants.hrefs.vueCliApp.esLint.name, link: Constants.hrefs.vueCliApp.esLint.link },
      {
        text: Constants.commonConstantsData.typeScript,
        link: Constants.hrefs.vueCliApp.typeScript,
      },
      {
        text: Constants.hrefs.vueCliApp.coreDocs.name,
        link: Constants.hrefs.vueCliApp.coreDocs.link,
      },
      { text: Constants.hrefs.vueCliApp.forum.name, link: Constants.hrefs.vueCliApp.forum.link },
      {
        text: Constants.hrefs.vueCliApp.communityChat.name,
        link: Constants.hrefs.vueCliApp.communityChat.link,
      },
      {
        text: Constants.hrefs.vueCliApp.twitter.name,
        link: Constants.hrefs.vueCliApp.twitter.link,
      },
      { text: Constants.hrefs.vueCliApp.news.name, link: Constants.hrefs.vueCliApp.news.link },
      {
        text: Constants.hrefs.vueCliApp.vueRouter.name,
        link: Constants.hrefs.vueCliApp.vueRouter.link,
      },
      { text: Constants.hrefs.vueCliApp.vuex.name, link: Constants.hrefs.vueCliApp.ecosystemVuex },
      {
        text: Constants.hrefs.vueCliApp.vueDevTools.name,
        link: Constants.hrefs.vueCliApp.vueDevTools.link,
      },
      {
        text: Constants.hrefs.vueCliApp.vueLoader.name,
        link: Constants.hrefs.vueCliApp.vueLoader.link,
      },
      {
        text: Constants.hrefs.vueCliApp.awesomeVue.name,
        link: Constants.hrefs.vueCliApp.awesomeVue.link,
      },
    ];

    textedLinks.forEach(({ text, link }) => {
      test(`Check that ${text} text includes link and not disabled`, async ({ page }) => {
        const basePage = new BaseMethods(page);
        await basePage.openLocalhost({ number: 8081 });
        await basePage.checkElementContainText({
          selector: updatedSelectors.vue3CliDemoApp.linkContainer,
          text,
          link,
        });
      });
    });
  });

  test.describe('It checks messages on page visibility', () => {
    const messages = [
      { message: Constants.commonPhrases.vueCliApp.welcomeMessage },
      { message: Constants.commonPhrases.vueCliApp.configurationMessage },
      { message: Constants.commonPhrases.vueCliApp.installedCliPluginsMessage },
      { message: Constants.commonPhrases.vueCliApp.essentialLinksMessage },
      { message: Constants.commonPhrases.vueCliApp.ecosystemLinksMessage },
    ];

    messages.forEach(({ message }) => {
      test(`Check that ${message} text is visible`, async ({ page }) => {
        const basePage = new BaseMethods(page);
        await basePage.openLocalhost({ number: 8081 });
        await basePage.checkElementWithTextPresence({
          selector: selectors.vue3CliDemoApp.tabs.home,
          text: message,
          visibilityState: 'be.visible',
        });
      });
    });
  });

  test.describe('Checks tabs and logo', () => {
    let basePage: BaseMethods;

    test.beforeEach(async ({ page }) => {
      basePage = new BaseMethods(page);
      await basePage.openLocalhost({ number: 8081 });
    });

    test('Checks vue logo visibility', async () => {
      await basePage.checkElementVisibility({
        selector: baseSelectors.tags.coreElements.image,
      });
    });

    test('Checks that host link does not contain about if tab is not active', async () => {
      await basePage.checkElementWithTextPresence({
        selector: updatedSelectors.vue3CliDemoApp.navigationActiveStateTab,
        text: Constants.elementsText.vue3CliDemoApp.aboutTab,
        isVisible: false,
      });
      await basePage.checkUrlText({
        url: Constants.elementsText.vue3CliDemoApp.aboutTab.toLowerCase(),
      });
    });

    test('Checks that host link contains about when about tab is active', async () => {
      await basePage.checkElementWithTextPresence({
        selector: updatedSelectors.vue3CliDemoApp.navigationActiveStateTab,
        text: Constants.elementsText.vue3CliDemoApp.aboutTab,
        isVisible: false,
      });
      await basePage.checkUrlText({
        url: Constants.elementsText.vue3CliDemoApp.aboutTab.toLowerCase(),
      });
      await basePage.clickElementBySelector({
        selector: baseSelectors.css.href.replace('{link}', Constants.hrefs.vueCliApp.aboutTab),
      });
      await basePage.checkElementWithTextPresence({
        selector: updatedSelectors.vue3CliDemoApp.navigationActiveStateTab,
        text: Constants.elementsText.vue3CliDemoApp.aboutTab,
      });
      await basePage.checkUrlText({
        url: Constants.elementsText.vue3CliDemoApp.aboutTab.toLowerCase(),
        isInclude: true,
      });
    });

    test('Checks text on active about tab', async () => {
      await basePage.clickElementBySelector({
        selector: baseSelectors.css.href.replace('{link}', Constants.hrefs.vueCliApp.aboutTab),
      });
      await basePage.checkElementWithTextPresence({
        selector: updatedSelectors.vue3CliDemoApp.navigationActiveStateTab,
        text: Constants.elementsText.vue3CliDemoApp.aboutTab,
      });
      await basePage.checkElementWithTextPresence({
        selector: selectors.vue3CliDemoApp.tabs.about,
        text: Constants.commonPhrases.vueCliApp.aboutTabMessage,
        visibilityState: 'be.visible',
      });
    });

    test('Checks that both tabs are not disabled', async () => {
      await basePage.checkElementState({
        selector: baseSelectors.css.href.replace('{link}', Constants.hrefs.vueCliApp.aboutTab),
        state: 'not.be.disabled',
      });
      await basePage.clickElementBySelector({
        selector: baseSelectors.css.href.replace('{link}', Constants.hrefs.vueCliApp.aboutTab),
      });
      await basePage.checkElementWithTextPresence({
        selector: updatedSelectors.vue3CliDemoApp.navigationActiveStateTab,
        text: Constants.elementsText.vue3CliDemoApp.aboutTab,
      });
      await basePage.checkElementState({
        selector: baseSelectors.css.href.replace(
          '{link}',
          Constants.commonConstantsData.commonLinks.cellLink,
        ),
        state: 'not.be.disabled',
      });
      await basePage.clickElementBySelector({
        selector: baseSelectors.css.href.replace(
          '{link}',
          Constants.commonConstantsData.commonLinks.cellLink,
        ),
      });
      await basePage.checkElementWithTextPresence({
        selector: updatedSelectors.vue3CliDemoApp.navigationActiveStateTab,
        text: Constants.commonConstantsData.home,
      });
    });
  });
});
