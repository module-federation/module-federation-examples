import { BaseMethods } from "../../../cypress/common/base";
import {baseSelectors, selectors, widgets} from "../../../cypress/common/selectors";
import { Constants } from "../../../cypress/fixtures/constants";
import {CssAttr} from "../../../cypress/types/cssAttr";
import {SharedRoutingMethods} from "../methods/methods";

const basePage: BaseMethods = new BaseMethods()
const methodsPage: SharedRoutingMethods = new SharedRoutingMethods()

const sharedRoutingAppOrdersBlockSelector = widgets.sharedRoutingAppCommonWidgetSelector
    .replace('{selector}', Constants.elementsText.sharedRoutingAppSelectorsParts.recentOrders.toUpperCase())
const sharedRoutingAppOrdersRowSelector = selectors.sharedRoutingAppRecentOrderRow.replace(Constants.commonText.sharedRoutingAppReplaceSelectorPart, '')
const sharedRoutingAppOrdersRowCellSelector = widgets.recentOrdersWidgetCell.replace(Constants.commonText.sharedRoutingAppReplaceSelectorPart, '')

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
    describe("It checks apps' orders page", () => {
        beforeEach(() => {
            basePage.openLocalhost(property.host, Constants.elementsText.sharedRoutingAppPageHeaders.orders.toLowerCase())
        })

        it('checks Orders text visibility on header', () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.header,
                text: Constants.elementsText.sharedRoutingAppPageHeaders.orders,
                visibilityState: 'be.visible'
            })
        })

        it('checks Orders header color', () => {
            basePage.checkElementHaveProperty({
                selector: baseSelectors.header,
                prop: CssAttr.backgroundColor,
                value: Constants.color.purple
            })
        })

        it('checks hamburger menu button functionality & visibility', () => {
            methodsPage.checkHamburgerMenuFunctionality()
        })

        it('checks that orders page can be visited by side menu button', () => {
            methodsPage.visitOnPageByName(Constants.elementsText.sharedRoutingAppPageHeaders.orders,
                Constants.elementsText.sharedRoutingAppPageHeaders.dashboard, 3000)
        })

        it('checks visit pages buttons block visibility', () => {
            basePage.checkElementVisibility(selectors.sharedRoutingAppSideMenuVisitPageButtonsBlock)
        })

        it('checks that profile & dashboard page can be visited from orders page by click and stays on page after reload', () => {
            methodsPage.transferringThroughPages(Constants.elementsText.sharedRoutingAppPageHeaders.orders,
                Constants.elementsText.sharedRoutingAppPageHeaders.dashboard, Constants.elementsText.sharedRoutingAppPageHeaders.profile)
        })

        it('checks orders block visibility', () => {
            basePage.checkElementVisibility(sharedRoutingAppOrdersBlockSelector)
        })

        it('checks orders header visibility', () => {
            basePage.checkElementWithTextPresence({
                selector: sharedRoutingAppOrdersBlockSelector,
                text: Constants.elementsText.sharedRoutingAppRecentOrdersHeader.split(' ')[1].trim(),
                visibilityState: 'be.visible'
            })
        })

        it('checks orders table columns headers visibility', () => {
            methodsPage.checkElementWithTextPresenceForMultipleTexts( {
                textsArray: Constants.elementsText.sharedRoutingAppRecentOrdersTableColumnsHeaders,
                parentSelector: sharedRoutingAppOrdersBlockSelector,
                selector:  baseSelectors.tableHeader
            })
        })

        it('checks orders table can contain more than one order row', () => {
            basePage.checkElementQuantity({
                parentSelector: sharedRoutingAppOrdersBlockSelector,
                selector: sharedRoutingAppOrdersRowSelector,
                quantity: 1,
                state: 'have.length.above'
            })
        })

        it('checks table row contain all required cells', () => {
            methodsPage.checkElementWithTextPresenceForMultipleTexts( {
                textsArray: Constants.elementsText.sharedRoutingAppRecentOrdersTableColumnsHeaders,
                parentSelector: sharedRoutingAppOrdersRowSelector,
                selector:  sharedRoutingAppOrdersRowCellSelector,
                childElement: true
            })
        })

        it('checks table row contain all required cells with text', () => {
            methodsPage.checkElementWithTextPresenceByForCycle({
                textsArray: Constants.elementsText.sharedRoutingAppRecentOrdersTableColumnsHeaders,
                parentSelector: sharedRoutingAppOrdersRowSelector,
                selector: sharedRoutingAppOrdersRowCellSelector,
                text: Constants.elementsText.sharedRoutingAppRecentOrderInfo
            })
        })

        it('checks that table contain row with same value as one in dashboard page', () => {
            methodsPage.checkElementWithTextPresenceByForCycle({
                textsArray: Constants.elementsText.sharedRoutingAppRecentOrdersTableColumnsHeaders,
                parentSelector: sharedRoutingAppOrdersRowSelector,
                selector: sharedRoutingAppOrdersRowCellSelector,
                text: Constants.elementsText.sharedRoutingAppRecentOrderInfo
            })
            basePage.clickElementBySelector({selector: selectors.hrefSelector.replace('{link}',
                    `/${Constants.elementsText.sharedRoutingAppPageHeaders.dashboard.toLowerCase()}`)})
            methodsPage.checkElementWithTextPresenceByForCycle({
                textsArray: Constants.elementsText.sharedRoutingAppRecentOrdersTableColumnsHeaders,
                parentSelector: selectors.sharedRoutingAppRecentOrderRow,
                selector: widgets.recentOrdersWidgetCell,
                text: Constants.elementsText.sharedRoutingAppRecentOrderInfo
            })
        })
    })
})