import {
  BasePrimaryTextCardView,
  IPrimaryTextCardParameters,
  // IExternalLinkCardAction,
  // IQuickViewCardAction,
  // ICardButton
} from '@microsoft/sp-adaptive-card-extension-base';
// import * as strings from 'Demo1AdaptiveCardExtensionStrings';
import { IDemo1AdaptiveCardExtensionProps, IDemo1AdaptiveCardExtensionState, QUICK_VIEW_REGISTRY_ID } from '../Demo1AdaptiveCardExtension';

export class CardView extends BasePrimaryTextCardView<IDemo1AdaptiveCardExtensionProps, IDemo1AdaptiveCardExtensionState> {

  public get data(): IPrimaryTextCardParameters {
    return {
      primaryText: this.state.homeSiteTitle,
      description: "",
      title: this.properties.title
    };
  }

  // #region code not used
  

  /* public get cardButtons(): [ICardButton] | [ICardButton, ICardButton] | undefined {
    return [
      {
        title: strings.QuickViewButton,
        action: {
          type: 'QuickView',
          parameters: {
            view: QUICK_VIEW_REGISTRY_ID
          }
        }
      }
    ];
  } */

  /* public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
    return {
      type: 'ExternalLink',
      parameters: {
        target: 'https://www.bing.com'
      }
    };
  } */

  //#endregion
}
