import {ILanguageState, languageReducer, requestType, SET_LANGUAGE} from "./languageModule";

describe("languageModule", () => {
  it("returns initial state with default language", () => {
    const initialState: ILanguageState = {
      isFetching: false,
      payload: {
        languageData: {},
        locale: "en-GB"
      }
    };
    expect(languageReducer(undefined, {type: undefined})).toEqual(initialState);
  });

  it("handles action of type LANGUAGE_PENDING", () => {
    expect(languageReducer({}, {type: requestType.PENDING})).toEqual({isFetching: true});
  });

  it("handles action of type SET_LANGUAGE", () => {
    const payload = {
      languageData: {hello: "world"},
      locale: "de"
    };
    expect(languageReducer(null, {type: SET_LANGUAGE, payload})).toEqual({isFetching: false, payload});
  });

  it("handles action of type LANGUAGE_FAILURE", () => {
    const stateAfter = {
      error: true,
      isFetching: false,
      message: "error!"
    };
    expect(languageReducer({}, {type: requestType.FAILURE, message: "error!"})).toEqual(stateAfter);
  });

  it("handles actions with unknown type", () => {
    const state: ILanguageState = {
      isFetching: false,
      payload: {
        languageData: {hello: "world"},
        locale: "de"
      }
    };
    expect(languageReducer(state, {type: "sampleInvalidAction", payload: undefined})).toEqual(state);
  });

});
