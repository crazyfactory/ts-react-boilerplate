// languageModule is very simple
import {ILanguageState, languageReducer, SET_LANGUAGE} from "./languageModule";

describe("languageModule", () => {
  let sampleState: ILanguageState;

  beforeAll(() => {

    sampleState = {
      isFetching: false,
      payload: {
        languageData: {hello: "world"},
        locale: "de"
      }
    };

  });

  it("returns initial state with default language", () => {
    expect(languageReducer(undefined, {type: undefined} as any).payload.locale).toEqual("en-GB");
  });

  it("returns normal state for unknown types", () => {
    expect(languageReducer(sampleState, {type: "sampleInvalidAction", payload: undefined})).toEqual(sampleState);
  });

  it("sets language data in payload when SET_LANGUAGE action type", () => {
    expect(languageReducer(null, {type: SET_LANGUAGE, payload: sampleState})).toEqual({isFetching: false, payload: sampleState});
  });

});
