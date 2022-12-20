export class SelfHealingMethods {

    public checkValueInWebpackConfig(filePath: string, separator: string, text: string, isContain: boolean = true): void {
        cy.readFile(filePath).then((file: string) => {
            if(isContain) {
                expect(file.split(separator)[1]).to.include(text)

                return;
            }

            expect(file.split(separator)[1]).not.to.include(text)
        })
    }
}