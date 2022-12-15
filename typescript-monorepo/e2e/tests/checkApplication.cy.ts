import {TypeScriptMonoRepoMethods} from "../methods/methods";
import {Constants} from "../../../cypress/fixtures/constants";

const methodsPage: TypeScriptMonoRepoMethods = new TypeScriptMonoRepoMethods()

describe("It checks apps' package.json", () => {
    it('Checks apps package json includes yarn workspaces', () => {
        methodsPage.checkDependencyAddedInJson(Constants.samplesPath.typeScriptMonoRepoPackageJsonPath,
            Constants.commonText.typeScriptMonoRepoYarnWorkspaceDependency)
    })
})