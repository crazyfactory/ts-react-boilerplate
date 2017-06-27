import {IState} from "./baseModule";
import {ILanguage, languageReducer, requestType, SET_LANGUAGE} from "./languageModule";

describe("languageModule", () => {
  it("returns initial state with default language", () => {
    const initialState: IState<ILanguage> = {
      isFetching: false,
      payload: {
        languageData: {},
        locale: "en-GB"
      }
    };
    expect(languageReducer(undefined, {type: undefined})).toEqual(initialState);
  });

  it("handles action of type LANGUAGE_PENDING", () => {
    expect(languageReducer({isFetching: false, payload: null}, {type: requestType.PENDING})).toEqual({isFetching: true, payload: null});
  });

  it("handles action of type SET_LANGUAGE", () => {
    const payload: ILanguage = {
      languageData: {hello: "world"},
      locale: "de"
    };
    expect(languageReducer(null, {type: SET_LANGUAGE, payload})).toEqual({isFetching: false, payload});
  });

  it("handles action of type LANGUAGE_FAILURE", () => {
    const stateAfter: IState<ILanguage> = {
      error: true,
      isFetching: false,
      message: "error!",
      payload: null
    };
    expect(languageReducer({isFetching: true, payload: null}, {type: requestType.FAILURE, message: "error!"})).toEqual(stateAfter);
  });

  it("handles actions with unknown type", () => {
    const state: IState<ILanguage> = {
      isFetching: false,
      payload: {
        languageData: {hello: "world"},
        locale: "de"
      }
    };
    expect(languageReducer(state, {type: "sampleInvalidAction", payload: undefined})).toEqual(state);
  });

});
