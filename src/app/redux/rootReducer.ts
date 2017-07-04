import {combineReducers} from "redux";
import {router5Reducer} from "redux-router5";
import {IStore} from "./IStore";
import {counterReducer} from "./modules/counterModule";
import {starsReducer} from "./modules/starsModule";

const rootReducer: Redux.Reducer<IStore> = combineReducers<IStore>({
  counter: counterReducer,
  router: router5Reducer,
  stars: starsReducer
});

export default rootReducer;
