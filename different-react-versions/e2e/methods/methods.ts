import { selectors } from '../../../playwright-e2e/common/selectors';

export class DifferentReactVersionsMethods {
  public getBlockSelector(blockType: string): string {
    return selectors.differentReactVersionsIsolatedApp.commonReactBlock.replace(
      '{blockType}',
      blockType,
    );
  }
}
