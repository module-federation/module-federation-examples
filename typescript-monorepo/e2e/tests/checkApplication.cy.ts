import {Constants} from "../../../cypress/fixtures/constants";
import {BaseMethods} from "../../../cypress/common/base";

const basePage: BaseMethods = new BaseMethods()

describe("It checks apps' package.json", () => {
    it('Checks apps package json includes yarn workspaces', () => {
        basePage.checkValueInReadFile({
            filePath: Constants.filesPath.typeScriptMonoRepoPackageJsonPath,
            text: Constants.commonPhrases.typeScriptMonoRepoApp.yarnWorkspaceDependency
        })
    })
})