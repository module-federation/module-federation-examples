import {Constants} from "../../../cypress/fixtures/constants.js";
import {BaseMethods} from "../../../cypress/common/base.js";

const basePage: BaseMethods = new BaseMethods()

describe('Typescript Monorepo', () => {
    context('It checks typescript-monorepo app', () => {
        it('Checks apps package json includes yarn workspaces', () => {
            basePage.checkValueInReadFile({
                filePath: Constants.filesPath.typeScriptMonoRepoPackageJsonPath,
                text: Constants.commonPhrases.typeScriptMonoRepoApp.yarnWorkspaceDependency
            })
        })
    })
})
