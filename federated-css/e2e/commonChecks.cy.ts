import { selectors } from '../../cypress/common/selectors';
import { CssAttr } from '../../cypress/types/cssAttr';
import { Constants } from '../../cypress/fixtures/constants';
import { BaseMethods } from '../../cypress/common/base';

const basePage: BaseMethods = new BaseMethods();

describe('It checks federated css apps', () => {
  const { fullTestData: {
    federatedCssTestData: {
      css,
      cssModule,
      jss,
      less,
      scss,
      styledComponent,
      tailwindGlobal,
      tailwindModule,
    }
   }
  } = Constants;
  const appsData = [
    {
      port: 8081,
      buttons: [css, scss, less, tailwindGlobal],
      isNextJs: true,
    },
    {
      port: 8083,
      buttons: [cssModule, jss, tailwindModule],
      isNextJs: true,
    },
    {
      port: 8082,
      buttons: [jss, tailwindGlobal],
      isNextJs: true,
    },
    {
      port: 8084,
      buttons: [styledComponent, less],
      isNextJs: true,
    },
    {
      port: 3001,
      buttons: [css, scss, less, tailwindGlobal],
    },
    {
      port: 3002,
      buttons: [tailwindModule, jss, css, less, scss],
    },
    {
      port: 3003,
      buttons: [css, styledComponent],
    },
    {
      port: 3004,
      buttons: [cssModule, jss],
    },
    {
      port: 3005,
      buttons: [less, scss],
    },
    {
      port: 3006,
      buttons: [less, tailwindGlobal],
    },
    {
      port: 3007,
      buttons: [jss, tailwindModule],
    },
    {
      port: 4000,
      buttons: [css],
    },
    {
      port: 4001,
      buttons: [cssModule],
    },
    {
      port: 4002,
      buttons: [jss],
    },
    {
      port: 4003,
      buttons: [less],
    },
    {
      port: 4004,
      buttons: [scss],
    },
    {
      port: 4005,
      buttons: [styledComponent],
    },
    {
      port: 4006,
      buttons: [tailwindGlobal],
    },
    {
      port: 4007,
      buttons: [tailwindModule],
    },
  ];

  appsData.forEach(appConfig => {
    appConfig.buttons.forEach(cfg => {
      it(`should verify consumed ${cfg.path} page`, () => {
        basePage.openLocalhost(appConfig.port, appConfig.buttons.length > 1
          ? `${appConfig.isNextJs ? '' : '#/'}${cfg.path}`
          : '');
        basePage.checkElementHaveProperty({
          selector: selectors.federatedCssButton,
          prop: CssAttr.backgroundColor,
          value: cfg.bgColor,
        });
      });
    });

    it('should verify exposed buttons colors on combined page', () => {
      basePage.skipTestByCondition(appConfig.buttons.length <= 1)
      basePage.openLocalhost(appConfig.port, `${appConfig.isNextJs ? '' : '#/'}combined`);
      appConfig.buttons.forEach((cfg, idx) => {
        basePage.checkElementHaveProperty({
          selector: selectors.federatedCssButton,
          prop: CssAttr.backgroundColor,
          value: cfg.bgColor,
          index: idx,
        });
      });
    });
  })
});
