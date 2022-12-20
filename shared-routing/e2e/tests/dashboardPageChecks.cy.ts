import {BaseMethods} from "../../../cypress/common/base";
import {baseSelectors, selectors, widgets} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";
import {CssAttr} from "../../../cypress/types/cssAttr";
import {SharedRoutingMethods} from "../methods/methods";

const basePage: BaseMethods = new BaseMethods()
const methodsPage: SharedRoutingMethods = new SharedRoutingMethods()

const sharedRoutingAppChartBlockSelector = widgets.sharedRoutingAppCommonWidgetSelector
    .replace('{selector}', Constants.elementsText.sharedRoutingAppSelectorsParts.chart.toUpperCase())
const sharedRoutingAppRecentDepositsBlockSelector = widgets.sharedRoutingAppCommonWidgetSelector
    .replace('{selector}', Constants.elementsText.sharedRoutingAppSelectorsParts.recentDeposits.toUpperCase())
const sharedRoutingAppRecentOrdersBlockSelector = widgets.sharedRoutingAppCommonWidgetSelector
    .replace('{selector}', Constants.elementsText.sharedRoutingAppSelectorsParts.recentOrders.toUpperCase())

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
    describe("It checks apps' dashboard page", () => {
        beforeEach(() => {
            basePage.openLocalhost(property.host, Constants.elementsText.sharedRoutingAppPageHeaders.dashboard.toLowerCase())
        })
        it('checks Dashboard text visibility on header', () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.header,
                text: Constants.elementsText.sharedRoutingAppPageHeaders.dashboard,
                visibilityState: 'be.visible'
            })
        })

        it('checks Dashboard header color', () => {
            basePage.checkElementHaveProperty({
                selector: baseSelectors.header,
                prop: CssAttr.backgroundColor,
                value: Constants.color.purple
            })
        })

        it('checks hamburger menu button functionality & visibility', () => {
            methodsPage.checkHamburgerMenuFunctionality()
        })

        it('checks that dashboard page can be visited by side menu button', () => {
            methodsPage.visitOnPageByName(Constants.elementsText.sharedRoutingAppPageHeaders.dashboard,
                Constants.elementsText.sharedRoutingAppPageHeaders.orders, 3000)
        })

        it('checks visit pages buttons block visibility', () => {
            basePage.checkElementVisibility(selectors.sharedRoutingAppSideMenuVisitPageButtonsBlock)
        })

        it('checks that profile & orders page can be visited from dashboard page by click and stays on page after reload', () => {
            methodsPage.transferringThroughPages(Constants.elementsText.sharedRoutingAppPageHeaders.dashboard,
                Constants.elementsText.sharedRoutingAppPageHeaders.orders, Constants.elementsText.sharedRoutingAppPageHeaders.profile)
        })

        it('checks chart block visibility', () => {
            basePage.checkElementVisibility(sharedRoutingAppChartBlockSelector)
        })

        it('checks chart header visibility', () => {
            basePage.checkElementWithTextPresence({
                selector: sharedRoutingAppChartBlockSelector,
                text: Constants.elementsText.sharedRoutingAppChartInfo.today,
                visibilityState: 'be.visible'
            })
        })

        it('checks chart visibility', () => {
            basePage.checkChildElementVisibility(sharedRoutingAppChartBlockSelector, selectors.sharedRoutingAppChart)
        })

        it('checks chart type visibility', () => {
            basePage.checkElementWithTextPresence({
                parentSelector: sharedRoutingAppChartBlockSelector,
                selector: baseSelectors.tspan,
                text: Constants.elementsText.sharedRoutingAppChartInfo.sales,
                visibilityState: 'be.visible'
            })
        })

        it('checks chart horizontal marks visibility', () => {
            methodsPage.checkElementWithTextPresenceForMultipleTexts({
                textsArray: Constants.elementsText.sharedRoutingAppHorizontalChartMarks,
                parentSelector: sharedRoutingAppChartBlockSelector,
                selector: baseSelectors.tspan
            })
        })

        it('checks chart vertical marks visibility', () => {
            methodsPage.checkElementWithTextPresenceForMultipleTexts({
                textsArray: Constants.elementsText.sharedRoutingAppVerticalChartMarks,
                parentSelector: sharedRoutingAppChartBlockSelector,
                selector: baseSelectors.tspan
            })
        })

        it('checks chart graph appears', () => {
            basePage.checkElementExist({
                selector: selectors.sharedRoutingAppChartGraph,
                isVisible: false,
                notVisibleState: 'not.be.visible'
            })
            basePage.checkElementExist({
                selector: selectors.sharedRoutingAppChartGraph,
                visibleState: 'exist'
            })
        })

        it('checks recent deposits block visibility', () => {
            basePage.checkElementVisibility(sharedRoutingAppRecentDepositsBlockSelector)
        })

        it('checks recent deposits header visibility', () => {
            basePage.checkElementWithTextPresence({
                selector: sharedRoutingAppRecentDepositsBlockSelector,
                text: Constants.elementsText.sharedRoutingAppRecentDepositsInfo.recentDeposits,
                visibilityState: 'be.visible'
            })
        })

        it('checks recent deposit sum in deposit block visibility', () => {
            basePage.checkElementWithTextPresence({
                selector: sharedRoutingAppRecentDepositsBlockSelector,
                text: Constants.elementsText.sharedRoutingAppRecentDepositsInfo.sum,
                visibilityState: 'be.visible'
            })
        })

        it('checks recent deposit date in deposit block visibility', () => {
            basePage.checkElementWithTextPresence({
                selector: sharedRoutingAppRecentDepositsBlockSelector,
                text: Constants.elementsText.sharedRoutingAppRecentDepositsInfo.date,
                visibilityState: 'be.visible'
            })
        })

        it('checks deposit block includes button', () => {
            basePage.checkChildElementVisibility(sharedRoutingAppRecentDepositsBlockSelector, baseSelectors.button)
        })

        it('checks deposit block button text', () => {
            basePage.checkChildElementContainText(sharedRoutingAppRecentDepositsBlockSelector, baseSelectors.button,
                Constants.elementsText.sharedRoutingAppButtonTexts.viewBalance)
        })

        it('checks deposit block button is not disabled', () => {
            basePage.checkElementState({
                parentSelector: sharedRoutingAppRecentDepositsBlockSelector,
                selector: baseSelectors.button,
                state: 'not.be.disabled'
            })
        })

        it('checks recent orders block visibility', () => {
            basePage.checkElementVisibility(sharedRoutingAppRecentOrdersBlockSelector)
        })

        it('checks recent orders header visibility', () => {
            basePage.checkElementWithTextPresence({
                selector: sharedRoutingAppRecentOrdersBlockSelector,
                text: Constants.elementsText.sharedRoutingAppRecentOrdersHeader,
                visibilityState: 'be.visible'
            })
        })

        it('checks recent orders table columns headers visibility', () => {
            methodsPage.checkElementWithTextPresenceForMultipleTexts({
                textsArray: Constants.elementsText.sharedRoutingAppRecentOrdersTableColumnsHeaders,
                parentSelector: sharedRoutingAppRecentOrdersBlockSelector,
                selector: baseSelectors.tableHeader
            })
        })

        it('checks recent orders table can contain more than one order row', () => {
            basePage.checkElementQuantity({
                parentSelector: sharedRoutingAppRecentOrdersBlockSelector,
                selector: selectors.sharedRoutingAppRecentOrderRow,
                quantity: 1,
                state: 'have.length.above'
            })
        })

        it('checks table row contain all required cells', () => {
            methodsPage.checkElementWithTextPresenceForMultipleTexts({
                textsArray: Constants.elementsText.sharedRoutingAppRecentOrdersTableColumnsHeaders,
                parentSelector: selectors.sharedRoutingAppRecentOrderRow,
                selector: widgets.recentOrdersWidgetCell,
                childElement: true
            })
        })

        it('checks table row contain all required cells with text', () => {
            methodsPage.checkElementWithTextPresenceByForCycle({
                textsArray: Constants.elementsText.sharedRoutingAppRecentOrdersTableColumnsHeaders,
                parentSelector: selectors.sharedRoutingAppRecentOrderRow,
                selector: widgets.recentOrdersWidgetCell,
                text: Constants.elementsText.sharedRoutingAppRecentOrderInfo
            })
        })

        it('checks recent orders block includes button', () => {
            basePage.checkChildElementVisibility(sharedRoutingAppRecentOrdersBlockSelector, baseSelectors.button)
        })

        it('checks recent orders block button text', () => {
            basePage.checkChildElementContainText(sharedRoutingAppRecentOrdersBlockSelector, baseSelectors.button,
                Constants.elementsText.sharedRoutingAppButtonTexts.seeMoreOrders)
        })

        it('checks recent orders block button is not disabled', () => {
            basePage.checkElementState({
                parentSelector: sharedRoutingAppRecentOrdersBlockSelector,
                selector: baseSelectors.button,
                state: 'not.be.disabled'
            })
        })
    })
})