import {call, takeLatest} from "redux-saga/effects";

import {requestType, SWITCH_LANGUAGE} from "../redux/modules/languageModule";
import {dummyApi} from "./dummyApi";
import {updateLanguage, watchLanguageSwitch} from "./languageSaga";
import makeRequest from "./makeRequest";

describe("languageSaga", () => {
  describe("updateLanguage", () => {
    const payload = {locale: "en", language: {hello: "world"}};
    const gen = updateLanguage({type: "", payload});

    it("must call makeRequest of api.getStars", () => {
      expect(gen.next().value).toEqual(call(makeRequest, dummyApi.getLanguageData, requestType, payload));
    });

    it("must be done", () => {
      expect(gen.next()).toEqual({done: true, value: undefined});
    });
  });

  describe("watchLanguageSwitch", () => {
    const gen = watchLanguageSwitch();
    it("should watch for LANGUAGE_SWITCH actions", () => {
        expect(gen.next().value).toEqual(takeLatest(SWITCH_LANGUAGE, updateLanguage));
    });

    it("must be done", () => {
      expect(gen.next()).toEqual({done: true, value: undefined});
    });
  });
});
