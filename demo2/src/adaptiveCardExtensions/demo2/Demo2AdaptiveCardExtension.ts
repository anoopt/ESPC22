import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { Demo2PropertyPane } from './Demo2PropertyPane';
//get the api key from constants.ts
import * as constants from './constants';
import { HttpClient } from "@microsoft/sp-http";

export interface IDemo2AdaptiveCardExtensionProps {
  title: string;
}

export interface IDemo2AdaptiveCardExtensionState {
  temperature: string;
}

const CARD_VIEW_REGISTRY_ID: string = 'Demo2_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'Demo2_QUICK_VIEW';

export default class Demo2AdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IDemo2AdaptiveCardExtensionProps,
  IDemo2AdaptiveCardExtensionState
> {
  private _deferredPropertyPane: Demo2PropertyPane | undefined;

  public async onInit(): Promise<void> {
    this.state = {
      temperature: ''
     };

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    //get the temperature and set the state
    const temperature = await this.getTemperature();
    this.setState({
      temperature
    });

    return Promise.resolve();
  }

  //get temperature using openweathermap api
  private async getTemperature(): Promise<string> {
    const response = await this.context.httpClient.get(`https://api.openweathermap.org/data/2.5/weather?lat=55.6761&lon=12.5683&appid=${constants.openWeatherMapApiKey}&units=metric`, HttpClient.configurations.v1);
    const data = await response.json();
    return data.main.temp;
  }
    

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'Demo2-property-pane'*/
      './Demo2PropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.Demo2PropertyPane();
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
