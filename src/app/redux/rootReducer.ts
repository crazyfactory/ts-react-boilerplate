import {combineReducers, Reducer} from "redux";
import {reducer as formReducer} from "redux-form";
import {router5Reducer} from "redux-router5";
import {IStore} from "./IStore";
import {settingsReducer} from "./modules/settingsModule";

const rootReducer: Reducer<IStore> = combineReducers<IStore>({
  form: formReducer,
  router: router5Reducer,
  settings: settingsReducer
});

export default rootReducer;
