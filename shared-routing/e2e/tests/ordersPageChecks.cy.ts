import { BaseMethods } from "../../../cypress/common/base";
import {baseSelectors, selectors} from "../../../cypress/common/selectors";
import { Constants } from "../../../cypress/fixtures/constants";
import {CssAttr} from "../../../cypress/types/cssAttr";
import {SharedRoutingMethods} from "../methods/methods";
import {CommonTestData} from "../../../cypress/fixtures/commonTestData";

const basePage: BaseMethods = new BaseMethods()
const methodsPage: SharedRoutingMethods = new SharedRoutingMethods()

const sharedRoutingAppOrdersBlockSelector = selectors.sharedRoutingApp.commonWidgetSelector
    .replace('{selector}', Constants.selectorParts.sharedRoutingAppSelectorsParts.recentOrders.toUpperCase())
const sharedRoutingAppOrdersRowSelector = selectors.sharedRoutingApp.recentOrdersRow.replace(Constants.selectorParts.sharedRoutingAppReplaceSelectorPart, '')
const sharedRoutingAppOrdersRowCellSelector = selectors.sharedRoutingApp.recentOrdersWidgetCell.replace(Constants.selectorParts.sharedRoutingAppReplaceSelectorPart, '')

CommonTestData.sharedRoutingAppHosts.forEach((property: { host: number }) => {
    describe('Shared Routing', () => {
        context('It checks orders page', () => {
            beforeEach(() => {
                basePage.openLocalhost({
                    number: property.host,
                    path: Constants.commonConstantsData.sharedRoutingAppPagesComponents.orders.toLowerCase()
                })
            })
    
            it('checks Orders text visibility on header', () => {
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.headers.header,
                    text: Constants.commonConstantsData.sharedRoutingAppPagesComponents.orders,
                    visibilityState: 'be.visible'
                })
            })
    
            it('checks Orders header color', () => {
                basePage.checkElementHaveProperty({
                    selector: baseSelectors.tags.headers.header,
                    prop: CssAttr.backgroundColor,
                    value: Constants.color.purple
                })
            })
    
            it('checks hamburger menu button functionality & visibility', () => {
                methodsPage.checkHamburgerMenuFunctionality()
            })
    
            it('checks that orders page can be visited by side menu button', () => {
                methodsPage.visitOnPageByName(Constants.commonConstantsData.sharedRoutingAppPagesComponents.orders,
                    Constants.commonConstantsData.sharedRoutingAppPagesComponents.dashboard, 3000)
            })
    
            it('checks visit pages buttons block visibility', () => {
                basePage.checkElementVisibility({
                    selector: selectors.sharedRoutingApp.navigationButtonsBlock
                })
            })
    
            it('checks that profile & dashboard page can be visited from orders page by click and stays on page after reload', () => {
                methodsPage.transferringThroughPages(Constants.commonConstantsData.sharedRoutingAppPagesComponents.orders,
                    Constants.commonConstantsData.sharedRoutingAppPagesComponents.dashboard, Constants.commonConstantsData.sharedRoutingAppPagesComponents.profile)
            })
    
            it('checks orders block visibility', () => {
                basePage.checkElementVisibility({
                    selector: sharedRoutingAppOrdersBlockSelector
                })
            })
    
            it('checks orders header visibility', () => {
                basePage.checkElementWithTextPresence({
                    selector: sharedRoutingAppOrdersBlockSelector,
                    text: Constants.elementsText.sharedRoutingApp.orders.ordersHeader.split(' ')[1].trim(),
                    visibilityState: 'be.visible'
                })
            })
    
            it('checks orders table columns headers visibility', () => {
                methodsPage.checkElementWithTextPresenceInTextArray( {
                    textArray: Constants.elementsText.sharedRoutingApp.orders.recentOrdersTableColumnsHeaders,
                    parentSelector: sharedRoutingAppOrdersBlockSelector,
                    selector:  baseSelectors.tags.tableElements.header,
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
                methodsPage.checkElementWithTextPresenceInTextArray( {
                    textArray: Constants.elementsText.sharedRoutingApp.orders.recentOrdersTableColumnsHeaders,
                    parentSelector: sharedRoutingAppOrdersRowSelector,
                    selector:  sharedRoutingAppOrdersRowCellSelector,
                    childElement: true
                })
            })
    
            it('checks table row contain all required cells with text', () => {
                methodsPage.checkElementWithTextPresence({
                    textArray: Constants.elementsText.sharedRoutingApp.orders.recentOrdersTableColumnsHeaders,
                    parentSelector: sharedRoutingAppOrdersRowSelector,
                    selector: sharedRoutingAppOrdersRowCellSelector,
                    text: Constants.elementsText.sharedRoutingApp.orders.recentOrderInfo,
                    visibilityState: 'be.visible'
                })
            })
    
            it('checks that table contain row with same value as one in dashboard page', () => {
                methodsPage.checkElementWithTextPresence({
                    textArray: Constants.elementsText.sharedRoutingApp.orders.recentOrdersTableColumnsHeaders,
                    parentSelector: sharedRoutingAppOrdersRowSelector,
                    selector: sharedRoutingAppOrdersRowCellSelector,
                    text: Constants.elementsText.sharedRoutingApp.orders.recentOrderInfo,
                    visibilityState: 'be.visible'
                })
                basePage.clickElementBySelector({selector: baseSelectors.css.href.replace('{link}',
                        `/${Constants.commonConstantsData.sharedRoutingAppPagesComponents.dashboard.toLowerCase()}`)})
                methodsPage.checkElementWithTextPresence({
                    textArray: Constants.elementsText.sharedRoutingApp.orders.recentOrdersTableColumnsHeaders,
                    parentSelector: selectors.sharedRoutingApp.recentOrdersRow,
                    selector: selectors.sharedRoutingApp.recentOrdersWidgetCell,
                    text: Constants.elementsText.sharedRoutingApp.orders.recentOrderInfo,
                    visibilityState: 'be.visible'
                })
            })
        })
    })
})
