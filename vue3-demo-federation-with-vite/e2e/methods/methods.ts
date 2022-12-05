import { BaseMethods } from "../../../cypress/common/base";

export class Vue3DemoFederationWithViteMethods extends BaseMethods {

    public checkBrowserAlertByText(selector: string, alertMessage: string, isEqual: boolean = true): void {
        this.clickElementBySelector(selector)
        cy.wrap(new Promise<void>((resolve, reject) => {
            cy.on('window:alert', (alertText: string) => {
                try {
                    isEqual ? expect(alertText).to.be.eq(alertMessage) : expect(alertText).not.to.be.eq(alertMessage);
                } catch ( err ) {
                    return reject(err);
                }
                resolve();
            });
            setTimeout(() => {
                reject(new Error('window.confirm wasn\'t called within 1s'));
            }, 1000);
        }), { log: false });
    }
}