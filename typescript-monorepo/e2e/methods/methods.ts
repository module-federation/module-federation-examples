import {BaseMethods} from "../../../cypress/common/base";
import {IJsonReader} from "./json-reader-interface";

export class TypeScriptMonoRepoMethods extends BaseMethods {

    public checkDependencyAddedInJson(path: string, text: string):void {
        cy.readFile(path).then((file: IJsonReader) => {
           expect(file.workspaces.toString()).to.be.eq(text)
        })
    }
}