import { selectors } from '../../cypress/common/selectors';
import { CssAttr } from '../../cypress/types/cssAttr';
import { Constants } from '../../cypress/fixtures/constants';
import { BaseMethods } from '../../cypress/common/base';

const basePage: BaseMethods = new BaseMethods();

describe('It checks federated css ssr apps', () => {
  const { fullTestData: {
    federatedCssTestData: {
      css,
      cssModule,
      jss,
      less,
      scss,
      styledComponent,
      tailwindModule,
    }
  }
  } = Constants;

  const appsData = [
    {
      port: 4000,
      buttons: [css, jss],
      isShell: true,
    },
    {
      port: 4001,
      buttons: [css, scss, scss],
      isShell: true,
    },
    {
      port: 4002,
      buttons: [styledComponent, jss],
      isShell: true,
    },
    {
      port: 4003,
      buttons: [styledComponent, jss, cssModule],
      isShell: true,
    },
    {
      port: 4004,
      buttons: [less, less, scss, scss],
      isShell: true,
    },
    {
      port: 4005,
      buttons: [tailwindModule, scss, scss],
      isShell: true,
    },
    {
      port: 3001,
      buttons: [css],
      isShell: false,
    },
    {
      port: 3002,
      buttons: [jss],
      isShell: false,
    },
    {
      port: 3003,
      buttons: [tailwindModule],
      isShell: false,
    },
    {
      port: 3004,
      buttons: [scss],
      isShell: false,
    },
    {
      port: 3005,
      buttons: [styledComponent],
      isShell: false,
    },
    {
      port: 3006,
      buttons: [cssModule],
      isShell: false,
    },
    {
      port: 3007,
      buttons: [less],
      isShell: false,
    },
  ];
  appsData.forEach(appConfig => {
    if(appConfig.isShell) {
      it('should verify Shell App exposed buttons colors on page with invoked JS', () => {
        basePage.openLocalhost(appConfig.port);
        appConfig.buttons.forEach((cfg, idx) => {
          basePage.checkElementHaveProperty({
            selector: selectors.federatedCssButton,
            prop: CssAttr.backgroundColor,
            value: cfg.bgColor,
            index: idx,
          });
        });
      });

      it(`should verify Shell App exposed buttons colors on page without JS`, () => {
        cy.reload();
        cy.request(Cypress.env(`localhost${appConfig.port}`))
          .its('body')
          .then((html: string) => {
            const scriptTag = `<script async data-chunk="main" src="http://localhost:${appConfig.port}/static/main.js"></script>`;
            const htmlWithoutJS = html.replace(scriptTag, '');
            // render Application without script tag
            cy.document().invoke({ log: false }, 'write', htmlWithoutJS);
            appConfig.buttons.forEach((cfg, idx) => {
              basePage.checkElementHaveProperty({
                selector: selectors.federatedCssButton,
                prop: CssAttr.backgroundColor,
                value: cfg.bgColor,
                index: idx,
              });
            });
          });
      });
    } else {
      appConfig.buttons.forEach(cfg => {
        it(`should verify every button in expose ${appConfig.port} app`, () => {
          basePage.openLocalhost(appConfig.port, 'client');
          basePage.checkElementHaveProperty({
            selector: selectors.federatedCssButton,
            prop: CssAttr.css,
            value: cfg.bgColor,
            isMultiple: true,
          });
        });
      })
    }
  });
});
