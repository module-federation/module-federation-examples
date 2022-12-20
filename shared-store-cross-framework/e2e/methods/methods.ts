import {baseSelectors, buttons, selectors} from "../../../cypress/common/selectors";
import {BaseMethods} from "../../../cypress/common/base";
import {CssAttr} from "../../../cypress/types/cssAttr";
import {Constants} from "../../../cypress/fixtures/constants";

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
            .find(baseSelectors.button)
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
            .find(baseSelectors.button)
            .then((button: JQuery<HTMLElement>) => {
                cy.get(secondButtonsBlockSelector)
                    .find(baseSelectors.button)
                    .then((secondButton: JQuery<HTMLElement>) => {

                        expect(button.css(CssAttr.backgroundColor)).not.to.be.eq(secondButton.css(CssAttr.backgroundColor))
                    });
            });
    }

    public changeCounterValue({
         baseButtonsBlock,
         firstButtonsBlock,
         secondButtonsBlock
    }: {
        baseButtonsBlock?: string,
        firstButtonsBlock?: string
        secondButtonsBlock?: string
    }): void {
        let counter: number = 0;

        this.checkElementWithTextPresence({
            selector: selectors.sharedStoreCrossFrameworkAppClicksCounter,
            text: Constants.commonText.sharedStoreCrossFrameworkCounterValues.zero,
            visibilityState: 'be.visible'
        })
        for (let i = 1; i <  5; i++) {
            this.clickAndCheckCounterValue({
                parentSelector: baseButtonsBlock || firstButtonsBlock,
                selector: buttons.sharedStoreCrossFrameworkAppActionsButtons.incrementButton,
                value: i.toString()
            })
            counter++
        }
        for (let i = 1; i <  6; i++) {
            this.clickAndCheckCounterValue({
                parentSelector: baseButtonsBlock || secondButtonsBlock,
                selector: buttons.sharedStoreCrossFrameworkAppActionsButtons.decrementButton,
                value: `${counter - i}`
            })
        }
    }

    public clickAndCheckCounterValue
    ({
         parentSelector,
         selector,
         value

    }: {
        parentSelector?: string,
        selector: string,
        value: string
    }): void {
        if(parentSelector) {
            this.clickElementBySelector({
                parentSelector,
                selector
            })
            this.checkElementWithTextPresence({
                selector: selectors.sharedStoreCrossFrameworkAppClicksCounter,
                text: value,
                visibilityState: 'be.visible'
            })

            return;
        }

        this.clickElementBySelector({
            selector,
            isMultiple: true,
            wait: 500
        })
        this.checkElementWithTextPresence({
            selector: selectors.sharedStoreCrossFrameworkAppClicksCounter,
            text: value,
            visibilityState: 'be.visible'
        })
    }

}