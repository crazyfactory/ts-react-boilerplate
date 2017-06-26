import {default as promiseReducer, IRequestType} from "../../helpers/promiseReducer";

export const SET_LANGUAGE = "language/SET_LANGUAGE";
export const SWITCH_LANGUAGE = "language/SWITCH_LANGUAGE";

export const requestType: IRequestType = {
  FAILURE: "language/FAILURE",
  PENDING: "language/PENDING",
  SUCCESS: SET_LANGUAGE
};

export interface ILanguageState {
  error?: boolean;
  isFetching?: boolean;
  message?: string;
  payload?: {
    languageData: any;
    locale: string;
  };
}

export interface ILanguageAction {
  type: string;
  message?: string;
  payload?: {
    languageData: any;
    locale: string;
  };
}

const initialState: ILanguageState = {
  isFetching: false,
  payload: {
    languageData: {},
    locale: "en-GB"
  }
};

export function languageReducer(state: ILanguageState = initialState, action: ILanguageAction): ILanguageState {
  return promiseReducer<ILanguageState, ILanguageAction>(requestType, state, action);
}
