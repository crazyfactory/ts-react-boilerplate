import {RouterState} from "redux-router5";
import {ISettingsState} from "./modules/settingsModule";

export interface IStore {
  settings: ISettingsState;
  router: RouterState;
}
