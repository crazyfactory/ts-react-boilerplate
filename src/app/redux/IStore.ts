import {FormStateMap} from "redux-form";
import {RouterState} from "redux-router5";
import {IState} from "./modules/baseModule";
import {ICounter} from "./modules/counterModule";
import {ILanguage} from "./modules/languageModule";
import {IStars} from "./modules/starsModule";

export interface IStore {
  counter: IState<ICounter>;
  form: FormStateMap;
  language: IState<ILanguage>;
  router: RouterState;
  stars: IState<IStars>;
}
