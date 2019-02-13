import {FULFILLED, getPromiseAction, IAction, IBaseState, INVOKED, PENDING, REJECTED} from "./baseModule";

export type TLanguage = "en" | "de";

export interface ITranslations {
  [key: string]: string;
}

export interface ISettingsState extends IBaseState {
  language: TLanguage;
  translations: ITranslations;
}

const initialState: ISettingsState = {
  error: "",
  language: "en",
  loaded: false,
  pending: false,
  translations: {}
};

export const setLanguage = getPromiseAction<TLanguage, null, any, string>("SETTINGS/SET_LANGUAGE");

export function settingsReducer(
  state: ISettingsState = initialState,
  action: IAction<TLanguage, INVOKED> |
    IAction<null, PENDING> |
    IAction<ITranslations, FULFILLED> |
    IAction<null, REJECTED>
): ISettingsState {
  switch (action.type) {
    case setLanguage.actionTypes.INVOKED:
      return {
        ...state,
        language: action.payload
      };
    case setLanguage.actionTypes.PENDING:
      return {
        ...state,
        pending: true
      };
    case setLanguage.actionTypes.FULFILLED:
      return {
        ...state,
        error: "",
        pending: false,
        translations: action.payload
      };
    case setLanguage.actionTypes.REJECTED:
      return {
        ...state,
        error: action.message,
        pending: false
      };
    default:
      return state;
  }
}
