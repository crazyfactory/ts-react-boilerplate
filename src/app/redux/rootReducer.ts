import {routerReducer} from "react-router-redux";
import {combineReducers} from "redux";
import {IStore} from "./IStore";
import {counterReducer} from "./modules/counterModule";
import {languageReducer} from "./modules/languageModule";
import {starsReducer} from "./modules/starsModule";

const rootReducer: Redux.Reducer<IStore> = combineReducers<IStore>({
  counter: counterReducer,
  language: languageReducer,
  routing: routerReducer,
  stars: starsReducer
});

export default rootReducer;
