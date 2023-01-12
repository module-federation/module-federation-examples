import {BaseMethods} from "../../../cypress/common/base";
import {baseSelectors, selectors} from "../../../cypress/common/selectors";

export class RustWasmMethods extends BaseMethods {

    public checkGameBoardAppearsByClick(buttonName: string): void {
        this.checkElementVisibility(selectors.rustWasmGameBoard, false)
        this.clickElementWithText({
            selector: baseSelectors.button,
            text: buttonName
        })
        this.checkElementVisibility(selectors.rustWasmGameBoard)
    }
}
