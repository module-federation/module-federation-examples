import { Constants } from './../../cypress/fixtures/constants';
import {baseSelectors} from './../../cypress/common/selectors';
import { BaseMethods } from "../../cypress/common/base";

const basePage: BaseMethods = new BaseMethods()

const app1RemoteConfig = {
    port: 8081,
    page1: {
        path: 'page-1',
        text: 'Page 1 from App1',
        linkHref: '/page-2',
        linkText: 'Go to Page 2',
    },
    page2: {
        path: 'page-2',
        text: 'Page 2 from App1',
        linkHref: '/page-1',
        linkText: 'Go to Page 1',
    },
};

const app2RemoteConfig = {
    port: 8082,
    pageA: {
        path: 'page-a',
        text: 'Page A from App2',
        linkHref: '/page-b',
        linkText: 'Go to Page B',
    },
    pageB: {
        path: 'page-b',
        text: 'Page B from App2',
        linkHref: '/page-a',
        linkText: 'Go to Page A',
    },
};

const app1RemoteRoutingPrefix = 'app-1';
const app2RemoteRoutingPrefix = 'app-2';
const hostConfig = {
    port: 8080,
    pages: [
        {
            name: 'App1 Page1',
            link: `/${app1RemoteRoutingPrefix}/${app1RemoteConfig.page1.path}`,
            index: Constants.commonConstantsData.commonIndexes.zero,
            text: app1RemoteConfig.page1.text,
            linkText: app1RemoteConfig.page1.linkText,
            linkHref: app1RemoteConfig.page1.linkHref,
        },
        {
            name: 'App1 Page2',
            link: `/${app1RemoteRoutingPrefix}/${app1RemoteConfig.page2.path}`,
            index: Constants.commonConstantsData.commonIndexes.one,
            text: app1RemoteConfig.page2.text,
            linkText: app1RemoteConfig.page2.linkText,
            linkHref: app1RemoteConfig.page2.linkHref,
        },
        {
            name: 'App2 PageA',
            link: `/${app2RemoteRoutingPrefix}/${app2RemoteConfig.pageA.path}`,
            index: Constants.commonConstantsData.commonIndexes.two,
            text: app2RemoteConfig.pageA.text,
            linkText: app2RemoteConfig.pageA.linkText,
            linkHref: app2RemoteConfig.pageA.linkHref
        },
        {
            name: 'App2 PageB',
            link: `/${app2RemoteRoutingPrefix}/${app2RemoteConfig.pageB.path}`,
            index: Constants.commonConstantsData.commonIndexes.three,
            text: app2RemoteConfig.pageB.text,
            linkText: app2RemoteConfig.pageB.linkText,
            linkHref: app2RemoteConfig.pageB.linkHref
        }
    ]
};

describe('React Nested Routers', () => {
    context('App1 remote', () => {
        describe('page1', () => {
            it('should be rendered when loaded on root path', () => {
                basePage.openLocalhost(app1RemoteConfig.port);
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.div,
                    text: app1RemoteConfig.page1.text
                });
            });
    
            it('should be rendered when loaded on its relative path', () => {
                basePage.openLocalhost(app1RemoteConfig.port, app1RemoteConfig.page1.path);
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.div,
                    text: app1RemoteConfig.page1.text
                });
            });
    
            it('should contain a link allowing to navigate to page2', () => {
                basePage.openLocalhost(app1RemoteConfig.port);
                basePage.checkElementHaveProperty({
                    selector: baseSelectors.tags.coreElements.link,
                    attr: Constants.commonConstantsData.commonAttributes.attr,
                    prop: Constants.commonConstantsData.commonAttributes.href,
                    text: app1RemoteConfig.page1.linkText,
                    value: app1RemoteConfig.page1.linkHref
                })
                basePage.clickElementBySelector({
                    selector: baseSelectors.tags.coreElements.link,
                });
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.div,
                    text: app1RemoteConfig.page2.text
                });
            });
        });
    
        describe('page2', () => {
            it('should be rendered when loaded on its relative path', () => {
                basePage.openLocalhost(app1RemoteConfig.port, app1RemoteConfig.page2.path);
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.div,
                    text: app1RemoteConfig.page2.text
                });
            });
    
            it('should contain a link allowing to navigate to page1', () => {
                basePage.openLocalhost(app1RemoteConfig.port, app1RemoteConfig.page2.path);
                basePage.checkElementHaveProperty({
                    selector: baseSelectors.tags.coreElements.link,
                    attr: Constants.commonConstantsData.commonAttributes.attr,
                    prop: Constants.commonConstantsData.commonAttributes.href,
                    text: app1RemoteConfig.page2.linkText,
                    value: app1RemoteConfig.page2.linkHref
                })
                basePage.clickElementBySelector({
                    selector: baseSelectors.tags.coreElements.link,
                });
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.div,
                    text: app1RemoteConfig.page1.text
                });
            });
        });
    });
    
    describe('App2 remote', () => {
        describe('pageA', () => {
            it('should be rendered when loaded on root path', () => {
                basePage.openLocalhost(app2RemoteConfig.port);
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.div,
                    text: app2RemoteConfig.pageA.text
                });
            });
    
            it('should be rendered when loaded on its relative path', () => {
                basePage.openLocalhost(app2RemoteConfig.port, app2RemoteConfig.pageA.path);
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.div,
                    text: app2RemoteConfig.pageA.text
                });
            });
    
            it('should contain a link allowing to navigate to pageB', () => {
                basePage.openLocalhost(app2RemoteConfig.port);
                basePage.checkElementHaveProperty({
                    selector: baseSelectors.tags.coreElements.link,
                    attr: Constants.commonConstantsData.commonAttributes.attr,
                    prop: Constants.commonConstantsData.commonAttributes.href,
                    text: app2RemoteConfig.pageA.linkText,
                    value: app2RemoteConfig.pageA.linkHref
                })
                basePage.clickElementBySelector({
                    selector: baseSelectors.tags.coreElements.link,
                });
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.div,
                    text: app2RemoteConfig.pageB.text
                });
            });
        });
    
        describe('pageB', () => {
            it('should be rendered when loaded on its relative path', () => {
                basePage.openLocalhost(app2RemoteConfig.port, app2RemoteConfig.pageB.path);
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.div,
                    text: app2RemoteConfig.pageB.text
                });
            });
    
            it('should contain a link allowing to navigate to pageA', () => {
                basePage.openLocalhost(app2RemoteConfig.port, app2RemoteConfig.pageB.path);
                basePage.checkElementHaveProperty({
                    selector: baseSelectors.tags.coreElements.link,
                    attr: Constants.commonConstantsData.commonAttributes.attr,
                    prop: Constants.commonConstantsData.commonAttributes.href,
                    text: app2RemoteConfig.pageB.linkText,
                    value: app2RemoteConfig.pageB.linkHref
                })
                basePage.clickElementBySelector({
                    selector: baseSelectors.tags.coreElements.link,
                });
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.div,
                    text: app2RemoteConfig.pageA.text
                });
            });
        });
    });
    
    describe('React Nested Routers', () => {
        context('Host app', () => {
            const { pages } = hostConfig;
    
            beforeEach(() => {
                basePage.openLocalhost(hostConfig.port)
            })
        
            it('should rendered correct pages and remotes', () => {
                basePage.checkElementVisibility({
                    selector: baseSelectors.tags.navigation
                })
                pages.forEach((item) => {
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.coreElements.link,
                        text: item.name,
                        index: item.index
                    })
                    basePage.checkElementHaveProperty({
                        selector: baseSelectors.tags.coreElements.link,
                        text: item.name,
                        attr: Constants.commonConstantsData.commonAttributes.attr,
                        prop: Constants.commonConstantsData.commonAttributes.href,
                        value: item.link
                    })
                })
            })
        
            it('should allow to navigate between pages and mount/unmount remotes', () => {
                pages.forEach((item) => {
                    basePage.clickElementWithText({
                        selector: baseSelectors.tags.coreElements.link,
                        text: item.name
                    })
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.coreElements.div,
                        text: item.text
                    })
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.coreElements.link,
                        text: item.linkText
                    })
                    basePage.checkElementHaveProperty({
                        selector: baseSelectors.tags.coreElements.link,
                        text: item.linkText,
                        attr: Constants.commonConstantsData.commonAttributes.attr,
                        prop: Constants.commonConstantsData.commonAttributes.href,
                        value: item.linkHref
                    })
                })
            })
        })
    })
})