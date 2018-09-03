import promiseReducer from "../../helpers/promiseReducer";
import {IAction, IState} from "./baseModule";

export const CHANGE_LOCALE = "settings/CHANGE_LOCALE";

export interface IMeta {
  currency?: string;
  locale?: string;
}

export interface ISettings {
  translations: {[key: string]: string};
}

const initialState: IState<ISettings, IMeta> = {
  isFetching: false,
  meta: {
    currency: "EUR",
    locale: typeof window !== "undefined" ? window.navigator.language : "en-GB"
  },
  payload: {
    translations: {}
  }
};

export function settingsReducer(state: IState<ISettings, IMeta> = initialState, action: IAction<ISettings, IMeta>): IState<ISettings, IMeta> {
  if (action.type === CHANGE_LOCALE) {
    return {
      ...state,
      meta: {
        ...state.meta,
        ...action.meta
      }
    };
  }
  return promiseReducer<ISettings>(CHANGE_LOCALE, state, action);
}

export function changeLocale(locale: string): IAction<ISettings, IMeta> {
  return {
    meta: {
      locale
    },
    type: CHANGE_LOCALE
  };
}
