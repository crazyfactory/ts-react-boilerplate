import {FormStateMap} from "redux-form";
import {RouterState} from "redux-router5";
import {ISettingsState} from "./modules/settingsModule";

export interface IStore {
  form: FormStateMap;
  settings: ISettingsState;
  router: RouterState;
}
