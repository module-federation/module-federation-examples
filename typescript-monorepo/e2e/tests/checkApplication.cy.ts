import {Constants} from "../../../cypress-e2e/fixtures/constants";
import {BaseMethods} from "../../../cypress-e2e/common/base";

const basePage: BaseMethods = new BaseMethods()

describe('Typescript Monorepo', () => {
    context('It checks typescript-monorepo app', () => {
        xit('Checks apps package json includes yarn workspaces', () => {
            basePage.checkValueInReadFile({
                filePath: Constants.filesPath.typeScriptMonoRepoPackageJsonPath,
                text: Constants.commonPhrases.typeScriptMonoRepoApp.yarnWorkspaceDependency
            })
        })
    })
})
