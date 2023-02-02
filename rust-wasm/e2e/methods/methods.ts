import {BaseMethods} from "../../../cypress/common/base";
import {baseSelectors, selectors} from "../../../cypress/common/selectors";

export class RustWasmMethods extends BaseMethods {

    public checkGameBoardAppearsByClick(buttonName: string): void {
        this.checkElementVisibility(selectors.rustWasmApp.gameBoard, false)
        this.clickElementWithText({
            selector: baseSelectors.tags.coreElements.button,
            text: buttonName
        })
        this.checkElementVisibility(selectors.rustWasmApp.gameBoard)
    }
}
