import {FormStateMap} from "redux-form";
import {RouterState} from "redux-router5";
import {IState} from "./modules/baseModule";
import {ICounter} from "./modules/counterModule";
import {ISettingsState} from "./modules/settingsModule";
import {IStars} from "./modules/starsModule";

export interface IStore {
  counter: IState<ICounter>;
  form: FormStateMap;
  settings: ISettingsState;
  router: RouterState;
  stars: IState<IStars>;
}
