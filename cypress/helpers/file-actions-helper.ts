export function readFile(filePath: string): any {
    return cy.task('readFile', {filePath})
}

export function writeTofile(filePath: string, content: string): any {
    return cy.task('writeToFile', {filePath, content})
}
