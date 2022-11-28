import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { Demo0PropertyPane } from './Demo0PropertyPane';

export interface IDemo0AdaptiveCardExtensionProps {
  title: string;
}

export interface IDemo0AdaptiveCardExtensionState {
}

const CARD_VIEW_REGISTRY_ID: string = 'Demo0_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'Demo0_QUICK_VIEW';

//* Main class - inherts from BaseAdaptiveCardExtension
//* Accepts props and state
//* React like but not backed by React (something else maybe react native - but not needed to know)
//* Familiar to SPFx developers
export default class Demo0AdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IDemo0AdaptiveCardExtensionProps,
  IDemo0AdaptiveCardExtensionState
> {
  private _deferredPropertyPane: Demo0PropertyPane | undefined;

  //* Lifecycle method
  public onInit(): Promise<void> {

    //* Initialize the state - React like
    //* Next demo - we will see how to use the state
    this.state = { };

    //* cardNavigator and quickViewNavigator - index of all the views that exist in the ACE
    //* All card views are registered here (multiple card views can be registered based)
    //* () => new CardView() factory function
    //* Upon registration, the factory function is invoked
    //* This will be done only once and will not be invoked every time the card is rendered
    //* The data in the card can be maintained by the state and can be updated by the state
    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());

    // this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    //* Defer loading the quick view 
    this.quickViewNavigator.register(
      QUICK_VIEW_REGISTRY_ID,
      () => import(
        /* webpackChunkName: 'Demo0-quickView'*/
        './quickView/QuickView'
      ).then((component) => new component.QuickView())
    );

    return Promise.resolve();
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'Demo0-property-pane'*/
      './Demo0PropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.Demo0PropertyPane();
        }
      );
  }

  //* Tells the ACE which card to render
  //* In case of multiple card views - return the card view that needs to be rendered
  //* Example - Card with image for some users and card with text for some other users
  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }

  //* Property pane configuration - SPFx like
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane?.getPropertyPaneConfiguration();
  }
}
