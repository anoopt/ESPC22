import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { Demo1PropertyPane } from './Demo1PropertyPane';
import { SPHttpClient } from '@microsoft/sp-http';

export interface IDemo1AdaptiveCardExtensionProps {
  title: string;
}

export interface IDemo1AdaptiveCardExtensionState {
  homeSiteTitle: string;
}

const CARD_VIEW_REGISTRY_ID: string = 'Demo1_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'Demo1_QUICK_VIEW';

export default class Demo1AdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IDemo1AdaptiveCardExtensionProps,
  IDemo1AdaptiveCardExtensionState
> {
  private _deferredPropertyPane: Demo1PropertyPane | undefined;
  
  public async onInit(): Promise<void> {
    this.state = {
      homeSiteTitle: ""
    };

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    let homeSiteTitle: string = await this._getHomeSiteTitle();

    this.setState({
      homeSiteTitle
    });

    return Promise.resolve();
  }

  private _getHomeSiteTitle = async (): Promise<string> => {

    const response = await this.context.spHttpClient
      .get(`${this.context.pageContext.web.absoluteUrl}/_api/SP.SPHSite/Details`, SPHttpClient.configurations.v1, {
        headers: {
          accept: 'application/json;odata.metadata=none'
        }
      });

    const responseJSON = await response.json();

    return responseJSON.Title;

  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'Demo1-property-pane'*/
      './Demo1PropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.Demo1PropertyPane();
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
