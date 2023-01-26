import { BaseMethods } from "../../../cypress/common/base";
import {baseSelectors, selectors, widgets} from "../../../cypress/common/selectors";
import { Constants } from "../../../cypress/fixtures/constants";
import {CssAttr} from "../../../cypress/types/cssAttr";
import {SharedRoutingMethods} from "../methods/methods";
import {getRandomIntegerString, getRandomTextString} from "../../../cypress/helpers/base-helper";
import {CommonTestData} from "../../../cypress/fixtures/commonTestData";

const basePage: BaseMethods = new BaseMethods()
const methodsPage: SharedRoutingMethods = new SharedRoutingMethods()

const sharedRoutingAppEditProfileBlockSelector = widgets.sharedRoutingAppCommonWidgetSelector
    .replace('{selector}', Constants.selectorParts.sharedRoutingAppSelectorsParts.editProfile.toUpperCase())
const disabledCompanyFieldSelectorPart = Constants.elementsText.sharedRoutingApp.editProfileBlockLabels[0].replace(/\s/g, '_')
    .replace(/([()])/g, '').toUpperCase()
const sharedRoutingAppCardProfileBlockSelector = widgets.sharedRoutingAppCommonWidgetSelector.replace('{selector}',
    Constants.selectorParts.sharedRoutingAppSelectorsParts.cardProfile.toUpperCase())

CommonTestData.sharedRoutingAppHosts.forEach((property: { host: number }) => {
    describe("It checks apps' profile page", () => {
        beforeEach(() => {
            basePage.openLocalhost(property.host, Constants.commonConstantsData.sharedRoutingAppPagesComponents.profile.toLowerCase())
        })

        it('checks Profile text visibility on header', () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.header,
                text: Constants.commonConstantsData.sharedRoutingAppPagesComponents.profile,
                visibilityState: 'be.visible'
            })
        })

        it('checks Profile header color', () => {
            basePage.checkElementHaveProperty({
                selector: baseSelectors.header,
                prop: CssAttr.backgroundColor,
                value: Constants.color.purple
            })
        })

        it('checks hamburger menu button functionality & visibility', () => {
            methodsPage.checkHamburgerMenuFunctionality()
        })

        it('checks that profile page can be visited by side menu button', () => {
            methodsPage.visitOnPageByName(Constants.commonConstantsData.sharedRoutingAppPagesComponents.profile,
                Constants.commonConstantsData.sharedRoutingAppPagesComponents.orders, 3000)
        })

        it('checks visit pages buttons block visibility', () => {
            basePage.checkElementVisibility(selectors.sharedRoutingAppSideMenuVisitPageButtonsBlock)
        })

        it('checks that orders & dashboard page can be visited from orders page by click and stays on page after reload', () => {
            methodsPage.transferringThroughPages(Constants.commonConstantsData.sharedRoutingAppPagesComponents.profile,
                Constants.commonConstantsData.sharedRoutingAppPagesComponents.orders, Constants.commonConstantsData.sharedRoutingAppPagesComponents.dashboard)
        })

        it('checks edit profile block header visibility', () => {
            basePage.checkElementWithTextPresence({
                selector: sharedRoutingAppEditProfileBlockSelector,
                text: Constants.elementsText.sharedRoutingApp.profileActions.edit,
                visibilityState: 'be.visible'
            })
        })

        it('checks edit profile block description visibility', () => {
            basePage.checkElementWithTextPresence({
                selector: sharedRoutingAppEditProfileBlockSelector,
                text: Constants.elementsText.sharedRoutingApp.profileActions.complete,
                visibilityState: 'be.visible'
            })
        })

        it('checks all texted labels visibility', () => {
            methodsPage.checkElementWithTextPresenceInTextArray( {
                textArray: Constants.elementsText.sharedRoutingApp.editProfileBlockLabels,
                parentSelector: sharedRoutingAppEditProfileBlockSelector,
                selector: baseSelectors.label,
                visibilityState: 'exist'
            })
        })

        it('checks that all labels are related to inputs', () => {
            for (let i = 0; i <  9; i++) {
                const formFieldSelector = methodsPage.returnReplacedFormFieldSelector({index: i})

                methodsPage.checkInputWithLabelVisibilityInsideBlock(formFieldSelector,
                    Constants.elementsText.sharedRoutingApp.editProfileBlockLabels[i])
            }
        })

        it('checks that company input is disabled', () => {
            basePage.checkElementState({
                parentSelector: methodsPage.returnReplacedFormFieldSelector({replaceElement: disabledCompanyFieldSelectorPart}),
                selector: baseSelectors.input,
            })
        })

        it('checks that only company input is disabled', () => {
            for (let i = 0; i < 8; i++) {
                const formFieldSelector = methodsPage.returnReplacedFormFieldSelector({index: i})

                if(formFieldSelector.includes(disabledCompanyFieldSelectorPart)) {
                    basePage.checkElementState({
                        parentSelector: formFieldSelector,
                        selector: baseSelectors.input,
                    })
                } else {
                    basePage.checkElementState({
                        parentSelector: formFieldSelector,
                        selector: basePage.getInputSelector(formFieldSelector),
                        state: 'not.be.disabled'
                    })
                }
            }
        })

        it('checks shrink animation works for non disabled fields', () => {
            for (let i = 1; i < 8; i++) {
                const formFieldSelector = methodsPage.returnReplacedFormFieldSelector({index: i})

                basePage.checkChildElementVisibility(formFieldSelector, selectors.sharedRoutingAppInputShrinkAnimation
                    .replace('{state}', 'false'), true, 'exist')
                basePage.checkChildElementVisibility(formFieldSelector, selectors.sharedRoutingAppInputShrinkAnimation
                    .replace('{state}', 'true'), false)
                basePage.clickElementBySelector({
                    parentSelector: formFieldSelector,
                    selector: basePage.getInputSelector(formFieldSelector)
                })
                basePage.checkChildElementVisibility(formFieldSelector, selectors.sharedRoutingAppInputShrinkAnimation
                    .replace('{state}', 'false'), false)
                basePage.checkChildElementVisibility(formFieldSelector, selectors.sharedRoutingAppInputShrinkAnimation
                    .replace('{state}', 'true'), true, 'exist')
            }
        })

        it('checks that each non disabled field can be filled with letters', () => {
            methodsPage.fillFieldAndCheckValue({ value: CommonTestData.multipleSizeStringsArray[0] })
        })

        it('checks that each non disabled field can be filled with numbers', () => {
            methodsPage.fillFieldAndCheckValue({ value: getRandomIntegerString(10) })
        })

        it('checks that each non disabled field can be filled with special symbols', () => {
            methodsPage.fillFieldAndCheckValue({ value: Constants.commonPhrases.sharedRoutingApp.randomSymbolsString })
        })

        it('checks that each non disabled field can be filled with letters + numbers + specials symbols', () => {
            methodsPage.fillFieldAndCheckValue({ value: getRandomTextString(5) + getRandomIntegerString(5) + Constants.commonPhrases.sharedRoutingApp.randomSymbolsString })
        })

        it('checks that each non disabled field has no validation', () => {
            methodsPage.fillFieldAndCheckValue({ multipleSizeStringsArray: CommonTestData.multipleSizeStringsArray
            })
        })

        it.only('checks that each non disabled field clears after reload', () => {
            methodsPage.fillFieldAndCheckValue({
                value: CommonTestData.multipleSizeStringsArray[0],
                isReloaded: true
            })
        })

        it('checks update profile button visibility', () => {
            basePage.checkChildElementVisibility(sharedRoutingAppEditProfileBlockSelector, baseSelectors.button)
        })

        it('checks update profile block button text', () => {
            basePage.checkChildElementContainText(sharedRoutingAppEditProfileBlockSelector, baseSelectors.button,
                Constants.elementsText.sharedRoutingApp.buttonsTexts.updateProfile)
        })

        it('checks update profile button color', () => {
            basePage.checkElementHaveProperty({
                parentSelector: sharedRoutingAppEditProfileBlockSelector,
                selector: baseSelectors.button,
                prop: CssAttr.backgroundColor,
                value: Constants.color.deepPink
            })
        })

        it('checks update profile block button is not disabled', () => {
            basePage.checkElementState({
                parentSelector: sharedRoutingAppEditProfileBlockSelector,
                selector: baseSelectors.button,
                state: 'not.be.disabled'
            })
        })

        it('checks card profile visibility', () => {
            basePage.checkElementVisibility(sharedRoutingAppCardProfileBlockSelector)
        })

        it('checks card profile image visibility', () => {
            basePage.checkElementVisibility(selectors.sharedRoutingAppCardProfileImage)
        })

        it('checks image stored inside card profile', () => {
            basePage.checkChildElementVisibility(sharedRoutingAppCardProfileBlockSelector, selectors.sharedRoutingAppCardProfileImage )
        })

        it('checks card profile contain user short job title', () => {
            basePage.checkElementWithTextPresence({
                selector: sharedRoutingAppCardProfileBlockSelector,
                text: Constants.elementsText.sharedRoutingApp.aboutUserBlock.shortProfession
            })
        })

        it('checks card profile contain user name', () => {
            basePage.checkElementWithTextPresence({
                selector: sharedRoutingAppCardProfileBlockSelector,
                text: Constants.elementsText.sharedRoutingApp.aboutUserBlock.name
            })
        })

        it('checks card profile contain user long job title', () => {
            basePage.checkElementWithTextPresence({
                selector: sharedRoutingAppCardProfileBlockSelector,
                text: Constants.elementsText.sharedRoutingApp.aboutUserBlock.longProfession
            })
        })

        it('checks follow button visibility', () => {
            basePage.checkChildElementVisibility(sharedRoutingAppCardProfileBlockSelector, baseSelectors.button)
        })

        it('checks follow block button text', () => {
            basePage.checkChildElementContainText(sharedRoutingAppCardProfileBlockSelector, baseSelectors.button,
                Constants.elementsText.sharedRoutingApp.buttonsTexts.follow)
        })

        it('checks follow block button is not disabled', () => {
            basePage.checkElementState({
                parentSelector: sharedRoutingAppCardProfileBlockSelector,
                selector: baseSelectors.button,
                state: 'not.be.disabled'
            })
        })
    })
})