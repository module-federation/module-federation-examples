import {BaseMethods} from "../../../cypress-e2e/common/base";
import {baseSelectors, selectors} from "../../../cypress-e2e/common/selectors";

export class RustWasmMethods extends BaseMethods {

    public checkGameBoardAppearsByClick(buttonName: string): void {
        this.checkElementVisibility({
            selector: selectors.rustWasmApp.gameBoard,
            isVisible: false,
            notVisibleState: 'not.be.visible'
        })
        this.clickElementWithText({
            selector: baseSelectors.tags.coreElements.button,
            text: buttonName
        })
        this.checkElementVisibility({
            selector: selectors.rustWasmApp.gameBoard
        })
    }
}
