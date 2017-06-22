import {routerReducer} from "react-router-redux";
import {combineReducers} from "redux";
import {IStore} from "./IStore";
import {counterReducer} from "./modules/counterModule";
import {starsReducer} from "./modules/starsModule";

const rootReducer: Redux.Reducer<IStore> = combineReducers<IStore>({
  counter: counterReducer,
  routing: routerReducer,
  stars: starsReducer
});

export default rootReducer;
