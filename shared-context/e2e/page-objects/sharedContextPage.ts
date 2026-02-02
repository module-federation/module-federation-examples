import { BasePage } from '../../../playwright-e2e/common/basePage';
import { baseSelectors } from '../../../playwright-e2e/common/selectors';

export interface SharedContextAppExpectations {
  header: string;
  subheader: string;
  paragraph: string;
}

export class SharedContextPage extends BasePage {
  async open(port: number): Promise<void> {
    await this.openLocalhost({ port });
  }

  async expectSharedContextContent({
    header,
    subheader,
    paragraph,
  }: SharedContextAppExpectations): Promise<void> {
    await this.expectElementWithTextPresence({
      selector: baseSelectors.tags.headers.h1,
      text: header,
    });

    await this.expectElementWithTextPresence({
      selector: baseSelectors.tags.headers.h2,
      text: subheader,
    });

    await this.expectElementWithTextPresence({
      selector: baseSelectors.tags.paragraph,
      text: paragraph,
    });
  }
}
