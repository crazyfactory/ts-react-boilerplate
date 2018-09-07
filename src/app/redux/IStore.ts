import {FormStateMap} from "redux-form";
import {RouterState} from "redux-router5";
import {IState} from "./modules/baseModule";
import {ICounter} from "./modules/counterModule";
import {IMeta as ISettingsMeta, ISettings} from "./modules/settingsModule";
import {IStars} from "./modules/starsModule";

export interface IStore {
  counter: IState<ICounter>;
  form: FormStateMap;
  settings: IState<ISettings, ISettingsMeta>;
  router: RouterState;
  stars: IState<IStars>;
}
