import {BaseMethods} from "../../../cypress/common/base";
import {baseSelectors, selectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";
import {CssAttr} from "../../../cypress/types/cssAttr";
import {SharedRoutingMethods} from "../methods/methods";
import {CommonTestData} from "../../../cypress/fixtures/commonTestData";

const basePage: BaseMethods = new BaseMethods()
const methodsPage: SharedRoutingMethods = new SharedRoutingMethods()

const sharedRoutingAppChartBlockSelector = selectors.sharedRoutingApp.commonWidgetSelector
    .replace('{selector}', Constants.selectorParts.sharedRoutingAppSelectorsParts.chart.toUpperCase())
const sharedRoutingAppRecentDepositsBlockSelector = selectors.sharedRoutingApp.commonWidgetSelector
    .replace('{selector}', Constants.selectorParts.sharedRoutingAppSelectorsParts.recentDeposits.toUpperCase())
const sharedRoutingAppRecentOrdersBlockSelector = selectors.sharedRoutingApp.commonWidgetSelector
    .replace('{selector}', Constants.selectorParts.sharedRoutingAppSelectorsParts.recentOrders.toUpperCase())

CommonTestData.sharedRoutingAppHosts.forEach((property: { host: number }) => {
    describe('Shared Routing', () => {
        context('It checks dashboard page', () => {
            beforeEach(() => {
                basePage.openLocalhost({
                    number: property.host,
                    path: Constants.commonConstantsData.sharedRoutingAppPagesComponents.dashboard.toLowerCase()
                })
            })
            it('checks Dashboard text visibility on header', () => {
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.headers.header,
                    text: Constants.commonConstantsData.sharedRoutingAppPagesComponents.dashboard,
                    visibilityState: 'be.visible'
                })
            })
    
            it('checks Dashboard header color', () => {
                basePage.checkElementHaveProperty({
                    selector: baseSelectors.tags.headers.header,
                    prop: CssAttr.backgroundColor,
                    value: Constants.color.purple
                })
            })
    
            it('checks hamburger menu button functionality & visibility', () => {
                methodsPage.checkHamburgerMenuFunctionality()
            })
    
            it('checks that dashboard page can be visited by side menu button', () => {
                methodsPage.visitOnPageByName(Constants.commonConstantsData.sharedRoutingAppPagesComponents.dashboard,
                    Constants.commonConstantsData.sharedRoutingAppPagesComponents.orders, 3000)
            })
    
            it('checks visit pages buttons block visibility', () => {
                basePage.checkElementVisibility({
                    selector: selectors.sharedRoutingApp.navigationButtonsBlock
                })
            })
    
            it('checks that profile & orders page can be visited from dashboard page by click and stays on page after reload', () => {
                methodsPage.transferringThroughPages(Constants.commonConstantsData.sharedRoutingAppPagesComponents.dashboard,
                    Constants.commonConstantsData.sharedRoutingAppPagesComponents.orders, Constants.commonConstantsData.sharedRoutingAppPagesComponents.profile)
            })
    
            it('checks chart block visibility', () => {
                basePage.checkElementVisibility({
                    selector: sharedRoutingAppChartBlockSelector
                })
            })
    
            it('checks chart header visibility', () => {
                basePage.checkElementWithTextPresence({
                    selector: sharedRoutingAppChartBlockSelector,
                    text: Constants.elementsText.sharedRoutingApp.chartInfo.today,
                    visibilityState: 'be.visible'
                })
            })
    
            it('checks chart visibility', () => {
                basePage.checkElementVisibility({
                    parentSelector: sharedRoutingAppChartBlockSelector,
                    selector: selectors.sharedRoutingApp.chartComponents.chart
                })
            })
    
            it('checks chart type visibility', () => {
                basePage.checkElementWithTextPresence({
                    parentSelector: sharedRoutingAppChartBlockSelector,
                    selector: baseSelectors.tags.coreElements.spans.tspan,
                    text: Constants.elementsText.sharedRoutingApp.chartInfo.sales,
                    visibilityState: 'be.visible'
                })
            })
    
            it('checks chart horizontal marks visibility', () => {
                methodsPage.checkElementWithTextPresenceInTextArray({
                    textArray: Constants.elementsText.sharedRoutingApp.chartMarks.horizontal,
                    parentSelector: sharedRoutingAppChartBlockSelector,
                    selector: baseSelectors.tags.coreElements.spans.tspan,
                })
            })
    
            it('checks chart vertical marks visibility', () => {
                methodsPage.checkElementWithTextPresenceInTextArray({
                    textArray: Constants.elementsText.sharedRoutingApp.chartMarks.vertical,
                    parentSelector: sharedRoutingAppChartBlockSelector,
                    selector: baseSelectors.tags.coreElements.spans.tspan,
                })
            })
    
            it('checks chart graph appears', () => {
                basePage.checkElementVisibility({
                    selector: selectors.sharedRoutingApp.chartComponents.graph,
                    isVisible: false,
                    notVisibleState: 'not.be.visible'
                })
                basePage.checkElementVisibility({
                    selector: selectors.sharedRoutingApp.chartComponents.graph,
                    visibleState: 'exist'
                })
            })
    
            it('checks recent deposits block visibility', () => {
                basePage.checkElementVisibility({
                    selector: sharedRoutingAppRecentDepositsBlockSelector
                })
            })
    
            it('checks recent deposits header visibility', () => {
                basePage.checkElementWithTextPresence({
                    selector: sharedRoutingAppRecentDepositsBlockSelector,
                    text: Constants.elementsText.sharedRoutingApp.depositsInfo.recentDeposits,
                    visibilityState: 'be.visible'
                })
            })
    
            it('checks recent deposit sum in deposit block visibility', () => {
                basePage.checkElementWithTextPresence({
                    selector: sharedRoutingAppRecentDepositsBlockSelector,
                    text: Constants.elementsText.sharedRoutingApp.depositsInfo.sum,
                    visibilityState: 'be.visible'
                })
            })
    
            it('checks recent deposit date in deposit block visibility', () => {
                basePage.checkElementWithTextPresence({
                    selector: sharedRoutingAppRecentDepositsBlockSelector,
                    text: Constants.elementsText.sharedRoutingApp.depositsInfo.date,
                    visibilityState: 'be.visible'
                })
            })
    
            it('checks deposit block includes button', () => {
                basePage.checkElementVisibility({
                    parentSelector: sharedRoutingAppRecentDepositsBlockSelector,
                    selector: baseSelectors.tags.coreElements.button
                })
            })
    
            it('checks deposit block button text', () => {
                basePage.checkElementContainText({
                    parentSelector: sharedRoutingAppRecentDepositsBlockSelector,
                    selector: baseSelectors.tags.coreElements.button,
                    text: Constants.elementsText.sharedRoutingApp.buttonsTexts.viewBalance
                })
            })
    
            it('checks deposit block button is not disabled', () => {
                basePage.checkElementState({
                    parentSelector: sharedRoutingAppRecentDepositsBlockSelector,
                    selector: baseSelectors.tags.coreElements.button,
                    state: 'not.be.disabled'
                })
            })
    
            it('checks recent orders block visibility', () => {
                basePage.checkElementVisibility({
                    selector: sharedRoutingAppRecentOrdersBlockSelector
                })
            })
    
            it('checks recent orders header visibility', () => {
                basePage.checkElementWithTextPresence({
                    selector: sharedRoutingAppRecentOrdersBlockSelector,
                    text: Constants.elementsText.sharedRoutingApp.orders.ordersHeader,
                    visibilityState: 'be.visible'
                })
            })
    
            it('checks recent orders table columns headers visibility', () => {
                methodsPage.checkElementWithTextPresenceInTextArray({
                    textArray: Constants.elementsText.sharedRoutingApp.orders.recentOrdersTableColumnsHeaders,
                    parentSelector: sharedRoutingAppRecentOrdersBlockSelector,
                    selector: baseSelectors.tags.tableElements.header,
                })
            })
    
            it('checks recent orders table can contain more than one order row', () => {
                basePage.checkElementQuantity({
                    parentSelector: sharedRoutingAppRecentOrdersBlockSelector,
                    selector: selectors.sharedRoutingApp.recentOrdersRow,
                    quantity: 1,
                    state: 'have.length.above'
                })
            })
    
            it('checks table row contain all required cells', () => {
                methodsPage.checkElementWithTextPresenceInTextArray({
                    textArray: Constants.elementsText.sharedRoutingApp.orders.recentOrdersTableColumnsHeaders,
                    parentSelector: selectors.sharedRoutingApp.recentOrdersRow,
                    selector: selectors.sharedRoutingApp.recentOrdersWidgetCell,
                    childElement: true
                })
            })
    
            it('checks table row contain all required cells with text', () => {
                basePage.checkElementWithTextPresence({
                    textArray: Constants.elementsText.sharedRoutingApp.orders.recentOrdersTableColumnsHeaders,
                    parentSelector: selectors.sharedRoutingApp.recentOrdersRow,
                    selector: selectors.sharedRoutingApp.recentOrdersWidgetCell,
                    text: Constants.elementsText.sharedRoutingApp.orders.recentOrderInfo,
                    visibilityState: 'be.visible'
                })
            })
    
            it('checks recent orders block includes button', () => {
                basePage.checkElementVisibility({
                    parentSelector: sharedRoutingAppRecentOrdersBlockSelector,
                    selector: baseSelectors.tags.coreElements.button
                })
            })
    
            it('checks recent orders block button text', () => {
                basePage.checkElementContainText({
                    parentSelector: sharedRoutingAppRecentOrdersBlockSelector,
                    selector: baseSelectors.tags.coreElements.button,
                    text: Constants.elementsText.sharedRoutingApp.buttonsTexts.seeMoreOrders
                })
            })
    
            it('checks recent orders block button is not disabled', () => {
                basePage.checkElementState({
                    parentSelector: sharedRoutingAppRecentOrdersBlockSelector,
                    selector: baseSelectors.tags.coreElements.button,
                    state: 'not.be.disabled'
                })
            })
        })
    })
})
