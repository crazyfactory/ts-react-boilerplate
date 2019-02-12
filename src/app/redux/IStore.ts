import {RouterState} from "redux-router5";
import {ISettingsState} from "./modules/settingsModule";
import {IStarsState} from "./modules/starsModule";

export interface IStore {
  counter: any;
  router: RouterState;
  settings: ISettingsState;
  stars: IStarsState;
}
