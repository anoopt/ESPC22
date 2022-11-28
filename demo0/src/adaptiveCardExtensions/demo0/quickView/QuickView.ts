import { ISPFxAdaptiveCard, BaseAdaptiveCardView } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'Demo0AdaptiveCardExtensionStrings';
import { IDemo0AdaptiveCardExtensionProps, IDemo0AdaptiveCardExtensionState } from '../Demo0AdaptiveCardExtension';

export interface IQuickViewData {
  subHeading: string;
  heading: string;
}

export class QuickView extends BaseAdaptiveCardView<
  IDemo0AdaptiveCardExtensionProps,
  IDemo0AdaptiveCardExtensionState,
  IQuickViewData
> {

  //* This is the view  (which is the adaptive card)
  //* The view and model get merged together to show what is displayed in the card
  public get template(): ISPFxAdaptiveCard {
    return require('./template/QuickViewTemplate.json');
  }

  //* This the model that is passed to the template which is the view
  public get data(): IQuickViewData {
    return {
      heading: "Session T7",
      subHeading: "This is a session on ACEs"
    };
  }
}