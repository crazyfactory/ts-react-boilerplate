import {FULFILLED, getPromiseAction, IAction, IBaseState, INVOKED, PENDING, REJECTED} from "./baseModule";

export const changeLanguage = getPromiseAction<string, null, any, string>("settings/CHANGE_LANGUAGE");

export interface ITranslations {
  [key: string]: string;
}

export interface ISettingsState extends IBaseState {
  language: string;
  translations: ITranslations;
}

const initialState: ISettingsState = {
  error: "",
  language: "en-US",
  pending: false,
  translations: {}
};

type CHANGE_LANGUAGE_PENDING = PENDING;
type CHANGE_LANGUAGE_FULFILLED = FULFILLED;
type CHANGE_LANGUAGE_REJECTED = REJECTED;

export function settingsReducer(
  state: ISettingsState = initialState,
  action: IAction<null, CHANGE_LANGUAGE_PENDING> |
    IAction<ITranslations, CHANGE_LANGUAGE_FULFILLED> |
    IAction<null, CHANGE_LANGUAGE_REJECTED, string>
): ISettingsState {
  switch (action.type) {
    case changeLanguage.actionTypes.PENDING:
      return {
        ...state,
        pending: true
      };
    case changeLanguage.actionTypes.FULFILLED:
      return {
        ...state,
        translations: action.payload
      };
    case changeLanguage.actionTypes.REJECTED:
      return {
        ...state,
        error: action.message,
        pending: false
      };
    default:
      return state;
  }
}

export function invokeChangeLanguage(language: string): IAction<string, INVOKED> {
  return {
    payload: language,
    type: changeLanguage.actionTypes.INVOKED
  };
}
