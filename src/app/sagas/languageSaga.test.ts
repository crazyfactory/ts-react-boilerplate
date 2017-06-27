import {call, takeLatest} from "redux-saga/effects";

import {ILanguage, requestType, SWITCH_LANGUAGE} from "../redux/modules/languageModule";
import {dummyApi} from "./dummyApi";
import {updateLanguage, watchLanguageSwitch} from "./languageSaga";
import makeRequest from "./makeRequest";

describe("languageSaga", () => {
  describe("updateLanguage", () => {
    const payload: ILanguage = {locale: "en", languageData: {hello: "world"}};
    const gen = updateLanguage({type: "", payload});

    it("must call makeRequest of api.getLanguageData", () => {
      expect(gen.next().value).toEqual(call(makeRequest, requestType, dummyApi.getLanguageData, payload));
    });

    it("must be done", () => {
      expect(gen.next()).toEqual({done: true, value: undefined});
    });
  });

  describe("watchLanguageSwitch", () => {
    const gen = watchLanguageSwitch();
    it("should watch for LANGUAGE_SWITCH action", () => {
        expect(gen.next().value).toEqual(takeLatest(SWITCH_LANGUAGE, updateLanguage));
    });

    it("must be done", () => {
      expect(gen.next()).toEqual({done: true, value: undefined});
    });
  });
});
