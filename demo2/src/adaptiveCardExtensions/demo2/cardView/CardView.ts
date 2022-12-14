import {
  BasePrimaryTextCardView,
  IPrimaryTextCardParameters,
  IExternalLinkCardAction,
  IQuickViewCardAction,
  ICardButton
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'Demo2AdaptiveCardExtensionStrings';
import { IDemo2AdaptiveCardExtensionProps, IDemo2AdaptiveCardExtensionState, QUICK_VIEW_REGISTRY_ID } from '../Demo2AdaptiveCardExtension';

export class CardView extends BasePrimaryTextCardView<IDemo2AdaptiveCardExtensionProps, IDemo2AdaptiveCardExtensionState> {
  public get cardButtons(): [ICardButton] | [ICardButton, ICardButton] | undefined {
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
  }

  public get data(): IPrimaryTextCardParameters {
    return {
      primaryText: `${this.state.temperature}°C`,
      description: "The current temperature in Copenhagen",
      title: "Weather"
    };
  }

  public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
    return {
      type: 'ExternalLink',
      parameters: {
        target: 'https://www.bing.com'
      }
    };
  }
}
