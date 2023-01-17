export function readFile(filePath: string): any {
    return cy.task('readFile', {filePath})
}
