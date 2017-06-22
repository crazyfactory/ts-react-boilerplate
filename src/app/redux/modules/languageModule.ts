import IBaseAction from "../../models/IBaseAction";

export const SET_LANGUAGE = "language/SET_LANGUAGE";
export interface ILanguageState {
  locale: string;
  language: object;
}
export interface ILanguageAction extends IBaseAction {
  payload: ILanguageState;
}
const initialState: ILanguageState = {
  language: {},
  locale: "en-GB"
};

export function languageReducer(state: ILanguageState = initialState, action: ILanguageAction): ILanguageState {
  switch (action.type) {
    case SET_LANGUAGE:
      return action.payload;
    default:
      return state;
  }
}
