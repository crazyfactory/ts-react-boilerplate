import {combineReducers, Reducer} from "redux";
import {reducer as formReducer} from "redux-form";
import {router5Reducer} from "redux-router5";
import {IStore} from "./IStore";
import {counterReducer} from "./modules/counterModule";
import {languageReducer} from "./modules/languageModule";
import {starsReducer} from "./modules/starsModule";

const rootReducer: Reducer<IStore> = combineReducers<IStore>({
  counter: counterReducer,
  form: formReducer,
  language: languageReducer,
  router: router5Reducer,
  stars: starsReducer
});

export default rootReducer;
