import {combineReducers, Reducer} from "redux";
import {reducer as formReducer} from "redux-form";
import {router5Reducer} from "redux-router5";
import {IStore} from "./IStore";
import {counterReducer} from "./modules/counterModule";
import {settingsReducer} from "./modules/settingsModule";
import {starsReducer} from "./modules/starsModule";

const rootReducer: Reducer<IStore> = combineReducers<IStore>({
  counter: counterReducer,
  form: formReducer,
  router: router5Reducer,
  settings: settingsReducer,
  stars: starsReducer
});

export default rootReducer;
