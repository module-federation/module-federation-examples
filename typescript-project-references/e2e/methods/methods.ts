import {BaseMethods} from "../../../cypress/common/base";
import {updatedSelectors} from "../../../cypress/common/selectors";

export class TypeScriptProjectReferencesMethods extends BaseMethods {

    public compareAppNames(extraHost: number): void {
        let appNameSelector: string = updatedSelectors.typeScriptProjectReferencesCommonAppNameSelector

        cy.get(appNameSelector)
            .invoke('text')
            .then((baseText: string) => {
                cy.origin(Cypress.env(`localhost${extraHost}`), {args: {baseText, appNameSelector}}, ({baseText, appNameSelector}) => {
                    cy.visit('/')
                    cy.get(appNameSelector)
                        .invoke('text')
                        .then((text: string) => {
                            expect(text).not.to.be.eq(baseText)
                        });
                });
            });
    }
}