import { BaseMethods } from "../../../cypress/common/base";
import {baseSelectors, selectors, widgets} from "../../../cypress/common/selectors";
import { Constants } from "../../../cypress/fixtures/constants";
import {CssAttr} from "../../../cypress/types/cssAttr";
import {SharedRoutingMethods} from "../methods/methods";
import {getRandomIntegerString, getRandomTextString} from "../../../cypress/helpers/base-helper";

const basePage: BaseMethods = new BaseMethods()
const methodsPage: SharedRoutingMethods = new SharedRoutingMethods()

const sharedRoutingAppEditProfileBlockSelector = widgets.sharedRoutingAppCommonWidgetSelector
    .replace('{selector}', Constants.elementsText.sharedRoutingAppSelectorsParts.editProfile.toUpperCase())
const disabledCompanyFieldSelectorPart = Constants.elementsText.sharedRoutingAppEditProfileBlockLabels[0].replace(/\s/g, '_')
    .replace(/([()])/g, '').toUpperCase()
const sharedRoutingAppCardProfileBlockSelector = widgets.sharedRoutingAppCommonWidgetSelector.replace('{selector}',
    Constants.elementsText.sharedRoutingAppSelectorsParts.cardProfile.toUpperCase())

const hosts = [
    {
        host: 3000
    },
    {
        host: 3001
    },
    {
        host: 3002
    },
    {
        host: 3003
    },
    {
        host: 3004
    },
]

hosts.forEach((property: { host: number }) => {
    describe("It checks apps' profile page", () => {
        beforeEach(() => {
            basePage.openLocalhost(property.host, Constants.elementsText.sharedRoutingAppPageHeaders.profile.toLowerCase())
        })

        it('checks Profile text visibility on header', () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.header,
                text: Constants.elementsText.sharedRoutingAppPageHeaders.profile,
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
            methodsPage.visitOnPageByName(Constants.elementsText.sharedRoutingAppPageHeaders.profile,
                Constants.elementsText.sharedRoutingAppPageHeaders.orders, 3000)
        })

        it('checks visit pages buttons block visibility', () => {
            basePage.checkElementVisibility(selectors.sharedRoutingAppSideMenuVisitPageButtonsBlock)
        })

        it('checks that orders & dashboard page can be visited from orders page by click and stays on page after reload', () => {
            methodsPage.transferringThroughPages(Constants.elementsText.sharedRoutingAppPageHeaders.profile,
                Constants.elementsText.sharedRoutingAppPageHeaders.orders, Constants.elementsText.sharedRoutingAppPageHeaders.dashboard)
        })

        it('checks edit profile block header visibility', () => {
            basePage.checkElementWithTextPresence({
                selector: sharedRoutingAppEditProfileBlockSelector,
                text: Constants.elementsText.sharedRoutingAppEditProfileBlockInfo.editProfile,
                visibilityState: 'be.visible'
            })
        })

        it('checks edit profile block description visibility', () => {
            basePage.checkElementWithTextPresence({
                selector: sharedRoutingAppEditProfileBlockSelector,
                text: Constants.elementsText.sharedRoutingAppEditProfileBlockInfo.completeProfile,
                visibilityState: 'be.visible'
            })
        })

        it('checks all texted labels visibility', () => {
            methodsPage.checkElementWithTextPresenceInTextArray( {
                textArray: Constants.elementsText.sharedRoutingAppEditProfileBlockLabels,
                parentSelector: sharedRoutingAppEditProfileBlockSelector,
                selector: baseSelectors.label,
                visibilityState: 'exist'
            })
        })

        it('checks that all labels are related to inputs', () => {
            for (let i = 0; i <  9; i++) {
                const formFieldSelector = methodsPage.returnReplacedFormFieldSelector({index: i})

                methodsPage.checkInputWithLabelVisibilityInsideBlock(formFieldSelector,
                    Constants.elementsText.sharedRoutingAppEditProfileBlockLabels[i])
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
            methodsPage.fillFieldAndCheckValue({ value: getRandomTextString(10) })
        })

        it('checks that each non disabled field can be filled with numbers', () => {
            methodsPage.fillFieldAndCheckValue({ value: getRandomIntegerString(10) })
        })

        it('checks that each non disabled field can be filled with special symbols', () => {
            methodsPage.fillFieldAndCheckValue({ value: Constants.commonPhrases.randomSymbolsString })
        })

        it('checks that each non disabled field can be filled with letters + numbers + specials symbols', () => {
            methodsPage.fillFieldAndCheckValue({ value: getRandomTextString(5) + getRandomIntegerString(5) + Constants.commonPhrases.randomSymbolsString })
        })

        it('checks that each non disabled field has no validation', () => {
            methodsPage.fillFieldAndCheckValue({ multipleSizeStringsArray: [
                    getRandomTextString(10),
                    getRandomTextString(100),
                    getRandomTextString(1000),
                ]
            })
        })

        it('checks that each non disabled field clears after reload', () => {
            methodsPage.fillFieldAndCheckValue({
                value: getRandomTextString(10),
                isReloaded: true
            })
        })

        it('checks update profile button visibility', () => {
            basePage.checkChildElementVisibility(sharedRoutingAppEditProfileBlockSelector, baseSelectors.button)
        })

        it('checks update profile block button text', () => {
            basePage.checkChildElementContainText(sharedRoutingAppEditProfileBlockSelector, baseSelectors.button,
                Constants.elementsText.sharedRoutingAppButtonTexts.updateProfile)
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
                text: Constants.elementsText.sharedRoutingAppAboutUser.shortProfession
            })
        })

        it('checks card profile contain user name', () => {
            basePage.checkElementWithTextPresence({
                selector: sharedRoutingAppCardProfileBlockSelector,
                text: Constants.elementsText.sharedRoutingAppAboutUser.name
            })
        })

        it('checks card profile contain user long job title', () => {
            basePage.checkElementWithTextPresence({
                selector: sharedRoutingAppCardProfileBlockSelector,
                text: Constants.elementsText.sharedRoutingAppAboutUser.longProfession
            })
        })

        it('checks follow button visibility', () => {
            basePage.checkChildElementVisibility(sharedRoutingAppCardProfileBlockSelector, baseSelectors.button)
        })

        it('checks follow block button text', () => {
            basePage.checkChildElementContainText(sharedRoutingAppCardProfileBlockSelector, baseSelectors.button,
                Constants.elementsText.sharedRoutingAppButtonTexts.follow)
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