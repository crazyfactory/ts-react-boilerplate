import promiseReducer, {IRequestType} from "../../helpers/promiseReducer";
import {IAction, IState} from "./baseModule";

export const SET_LANGUAGE = "language/SET_LANGUAGE";
export const SWITCH_LANGUAGE = "language/SWITCH_LANGUAGE";
export const requestType: IRequestType = {
  FAILURE: "language/FAILURE",
  PENDING: "language/PENDING",
  SUCCESS: SET_LANGUAGE
};

export interface ILanguage {
  languageData: any;
  locale: string;
}

const initialState: IState<ILanguage> = {
  isFetching: false,
  payload: {
    languageData: {},
    locale: "en-GB"
  }
};

export function languageReducer(state: IState<ILanguage> = initialState, action: IAction<ILanguage>): IState<ILanguage> {
  return promiseReducer<ILanguage>(requestType, state, action);
}
