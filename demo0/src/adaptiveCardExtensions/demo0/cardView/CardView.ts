import {
  BaseBasicCardView,
  IBasicCardParameters,
  IExternalLinkCardAction,
  IQuickViewCardAction,
  ICardButton
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'Demo0AdaptiveCardExtensionStrings';
import { IDemo0AdaptiveCardExtensionProps, IDemo0AdaptiveCardExtensionState, QUICK_VIEW_REGISTRY_ID } from '../Demo0AdaptiveCardExtension';

//* Inherits from BaseBasicCardView (currently 3 supported)
export class CardView extends BaseBasicCardView<IDemo0AdaptiveCardExtensionProps, IDemo0AdaptiveCardExtensionState> {
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

  //* This shows the data to be displayed in the card
  //* We do not have control over the view - it is defined by Microsoft
  //* We can only control the data
  //* The data (model) and the view (adaptive card) get merged together to show what is displayed in the card
  public get data(): IBasicCardParameters {
    return {
      primaryText: strings.PrimaryText,
      title: this.properties.title
    };
  }

  //* The function that is called when the card is clicked
  //* A couple of options - Open link or open quick view
  public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
    return {
      type: 'ExternalLink',
      parameters: {
        target: 'https://www.bing.com'
      }
    };
  }
}
