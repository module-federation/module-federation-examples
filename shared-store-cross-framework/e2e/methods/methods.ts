import {baseSelectors} from "../../../cypress/common/selectors";
import {BaseMethods} from "../../../cypress/common/base";
import {CssAttr} from "../../../cypress/types/cssAttr";

export class SharedStoreCrossFrameworkMethods extends BaseMethods {

    public findValueInMultipleButtons
    ({
         buttonsBlockSelector,
         cssValue,
         text
    }: {
        buttonsBlockSelector: string,
        cssValue?: string
        text?: string
    }): void {
        cy.get(buttonsBlockSelector)
            .find(baseSelectors.tags.coreElements.button)
            .each((button: JQuery<HTMLElement>) => {
                if(cssValue) {
                    expect(button.css(CssAttr.backgroundColor)).to.be.eq(cssValue)

                    return;
                } else {
                    if(button.text().includes(<string>text)) {
                        expect(button.text()).to.include(text)
                    }
                }
            });
    }

    public checkDifferInButtonsColors(buttonsBlockSelector: string, secondButtonsBlockSelector: string): void {
        cy.get(buttonsBlockSelector)
            .find(baseSelectors.tags.coreElements.button)
            .then((button: JQuery<HTMLElement>) => {
                cy.get(secondButtonsBlockSelector)
                    .find(baseSelectors.tags.coreElements.button)
                    .then((secondButton: JQuery<HTMLElement>) => {

                        expect(button.css(CssAttr.backgroundColor)).not.to.be.eq(secondButton.css(CssAttr.backgroundColor))
                    });
            });
    }
}