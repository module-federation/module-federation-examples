import {selectors} from "../../../cypress/common/selectors";

export class DifferentReactVersionsTypescriptMethods {
    public getBlockSelector(blockType: string): string {
        return selectors.differentReactVersionsIsolatedApp.commonReactBlock.replace('{blockType}', blockType);
    }
}