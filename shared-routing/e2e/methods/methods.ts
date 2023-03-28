import {baseSelectors, commonSelectors, selectors, updatedSelectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";
import {BaseMethods} from "../../../cypress/common/base";

export class SharedRoutingMethods extends BaseMethods {

    public checkInputWithLabelVisibilityInsideBlock(formField: string, text: string):void {
        cy.get(baseSelectors.tags.inputs.input).parentsUntil(formField).find(baseSelectors.tags.coreElements.label)
            .should( 'contain.text', text)
    }

    public returnReplacedFormFieldSelector({
         index,
         replaceElement
    }: {
        index? : number,
        replaceElement? : string
    }): string {
        // @ts-ignore
        if(index >= 0) {
            // @ts-ignore

            const replaceSelectorPart = index === 7 ? Constants.selectorParts.sharedRoutingAppSelectorsParts.userInfo.toUpperCase() : Constants.elementsText.sharedRoutingApp.editProfileBlockLabels[index].replace(/\s/g, '_')
                    .replace(/([()])/g, '')

            return commonSelectors.formField.replace('{fieldName}', replaceSelectorPart.toUpperCase())
        }

        // @ts-ignore
        return commonSelectors.formField.replace('{fieldName}', replaceElement)
    }

    public checkHamburgerMenuFunctionality(): void {
        Constants.elementsText.sharedRoutingApp.sideMenuButtonsTypes.forEach(buttonType => {
            this.checkElementWithTextPresence({
                selector: baseSelectors.css.href.replace('{link}', `/${buttonType.toLowerCase()}`),
                text: buttonType,
                visibilityState: 'not.be.visible'
            })
            this.clickElementBySelector({selector: updatedSelectors.sharedRoutingApp.hamburgerMenuButton})
            this.checkElementWithTextPresence({
                selector: baseSelectors.css.href.replace('{link}', `/${buttonType.toLowerCase()}`),
                text: buttonType,
                visibilityState: 'be.visible'
            })
            this.checkElementVisibility({
                selector: updatedSelectors.sharedRoutingApp.hamburgerMenuButton,
                isVisible: false
            })
            this.clickElementBySelector({selector: selectors.sharedRoutingApp.closeSideMenuButton})
            this.checkElementWithTextPresence({
                selector: baseSelectors.css.href.replace('{link}', `/${buttonType.toLowerCase()}`),
                text: buttonType,
                visibilityState: 'not.be.visible'
            })
        })
    }

    public visitOnPageByName(checkedPageHeader: string, remotePageHeader: string, host: number): void {
        this.openLocalhost({
            number: host,
            path: remotePageHeader
        })
        this.checkElementWithTextPresence({
            selector: baseSelectors.tags.headers.header,
            text: remotePageHeader,
            visibilityState: 'be.visible'
        })
        this.checkElementWithTextPresence({
            selector: baseSelectors.tags.headers.header,
            text: checkedPageHeader,
            isVisible: false
        })
        this.clickElementBySelector({selector: baseSelectors.css.href.replace('{link}',
                `/${checkedPageHeader.toLowerCase()}`)})
        this.checkElementWithTextPresence({
            selector: baseSelectors.tags.headers.header,
            text: remotePageHeader,
            isVisible: false
        })
        this.checkElementWithTextPresence({
            selector: baseSelectors.tags.headers.header,
            text: checkedPageHeader,
            visibilityState: 'be.visible'
        })
    }

    public transferringThroughPages(landingPageHeader: string, firstRemotePageHeader: string, secondRemotePageHeader: string): void {
        this.checkElementWithTextPresence({
            selector: baseSelectors.tags.headers.header,
            text: landingPageHeader,
            visibilityState: 'be.visible'
        })
        this.clickElementBySelector({selector: baseSelectors.css.href.replace('{link}',
                `/${firstRemotePageHeader.toLowerCase()}`)})
        this.checkElementWithTextPresence({
            selector: baseSelectors.tags.headers.header,
            text: firstRemotePageHeader,
            visibilityState: 'be.visible'
        })
        this.clickElementBySelector({selector: baseSelectors.css.href.replace('{link}',
                `/${secondRemotePageHeader.toLowerCase()}`)})
        this.checkElementWithTextPresence({
            selector: baseSelectors.tags.headers.header,
            text: secondRemotePageHeader,
            visibilityState: 'be.visible'
        })
        this.reloadWindow()
        this.checkElementWithTextPresence({
            selector: baseSelectors.tags.headers.header,
            text: secondRemotePageHeader,
            visibilityState: 'be.visible'
        })
    }

    public checkElementWithTextPresenceInTextArray
    ({
         textArray,
         parentSelector,
         selector,
         childElement,
         visibilityState = 'be.visible'
    }: {
        textArray: string[],
        parentSelector: string,
        selector: string,
        childElement?: boolean
        visibilityState?: string
    }): void {
        textArray.forEach(text => {
            if(childElement) {
                this.checkElementVisibility({
                    parentSelector,
                    selector: selector.replace(
                        '{cellType}', text.replace(/\s/g, '_').toUpperCase())
                })
            } else {
                this.checkElementWithTextPresence({
                    parentSelector,
                    selector: selector.replace(
                        '{cellType}', text.replace(/\s/g, '_').toUpperCase()),
                    text,
                    visibilityState
                })
            }
        })
    }

    public fillFieldAndCheckValue
    ({
         value,
         multipleSizeStringsArray,
         isReloaded = false
    }: {
        value?: any,
        multipleSizeStringsArray? : string[]
        isReloaded? : boolean
    }): void {
        for (let i = 1; i < 8; i++) {
            const formFieldSelector = this.returnReplacedFormFieldSelector({index: i})

            if(multipleSizeStringsArray) {
                multipleSizeStringsArray.forEach(string => {
                    this._fillFieldAndCheckValue(formFieldSelector, string, isReloaded)
                })

                return;
            }

         this._fillFieldAndCheckValue(formFieldSelector, value, isReloaded)
        }
    }

    private _fillFieldAndCheckValue(formFieldSelector: string, value: string, isReloaded : boolean = false):void {
        this.fillField({
            parentSelector: formFieldSelector,
            selector: this.getInputSelector(formFieldSelector),
            text: value
        })
        this.checkInputValue(value, formFieldSelector)

        if(isReloaded) {
            this.reloadWindow()
            this.checkInputValue('', formFieldSelector)
        }
    }

}