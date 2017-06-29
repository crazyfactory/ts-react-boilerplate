import {ICounter} from "modules/counterModule";
import {IStars} from "modules/starsModule";
import {IState} from "./modules/baseModule";
import {ILanguage} from "./modules/languageModule";

export interface IStore {
  counter: IState<ICounter>;
  language: IState<ILanguage>;
  stars: IState<IStars>;
}
