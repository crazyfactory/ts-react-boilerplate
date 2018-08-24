import {FormStateMap} from "redux-form";
import {State as IRouteState} from "router5";
import {IState} from "./modules/baseModule";
import {ICounter} from "./modules/counterModule";
import {ILanguage} from "./modules/languageModule";
import {IStars} from "./modules/starsModule";

export interface IRouteReduxState {
  route: IRouteState;
  previousRoute?: IRouteState;
  transitionRoute?: IRouteState;
  transitionError?: string;
}

export interface IStore {
  counter: IState<ICounter>;
  form: FormStateMap;
  language: IState<ILanguage>;
  router: IRouteReduxState;
  stars: IState<IStars>;
}
