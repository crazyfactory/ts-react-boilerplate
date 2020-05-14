import {CombinedState, combineReducers, Reducer} from "redux";
import {router5Reducer} from "redux-router5";
import {IStore} from "./IStore";
import {counterReducer} from "./modules/counterModule";
import {settingsReducer} from "./modules/settingsModule";
import {starsReducer} from "./modules/starsModule";

const rootReducer: Reducer<CombinedState<IStore>> = combineReducers<IStore>({
  counter: counterReducer,
  router: router5Reducer,
  settings: settingsReducer,
  stars: starsReducer
});

export default rootReducer;
