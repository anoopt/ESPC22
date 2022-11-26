import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { Demo3PropertyPane } from './Demo3PropertyPane';

export interface IDemo3AdaptiveCardExtensionProps {
  title: string;
}

export interface IDemo3AdaptiveCardExtensionState {
}

const CARD_VIEW_REGISTRY_ID: string = 'Demo3_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'Demo3_QUICK_VIEW';

export default class Demo3AdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IDemo3AdaptiveCardExtensionProps,
  IDemo3AdaptiveCardExtensionState
> {
  private _deferredPropertyPane: Demo3PropertyPane | undefined;

  public onInit(): Promise<void> {
    this.state = { };

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    return Promise.resolve();
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'Demo3-property-pane'*/
      './Demo3PropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.Demo3PropertyPane();
        }
      );
  }

  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane?.getPropertyPaneConfiguration();
  }
}
