function readFile(filePath) {
    return cy.task('readFile', {filePath})
}

function writeTofile(filePath, content) {
    return cy.task('writeToFile', {filePath, content})
}
