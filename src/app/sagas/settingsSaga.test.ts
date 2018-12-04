import {call, takeLatest} from "redux-saga/effects";
import {promiseAction} from "../helpers/promiseReducer";
import {IAction} from "../redux/modules/baseModule";
import {CHANGE_LANGUAGE, IMeta, ISettings} from "../redux/modules/settingsModule";
import {dummyApi} from "./dummyApi";
import makeRequest from "./makeRequest";
import {fetchTranslations, watchChangeLocale} from "./settingsSaga";

describe("SettingsSaga", () => {
  describe("fetchTranslations", () => {
    const action: IAction<ISettings, IMeta> = {
      meta: {
        locale: "de"
      },
      type: "some type"
    };
    const gen = fetchTranslations(action);

    it("must call makeRequest of api.getTranslations", () => {
      expect(gen.next().value).toEqual(
        call(makeRequest, promiseAction(CHANGE_LANGUAGE), dummyApi.getTranslations, action.meta.locale)
      );
    });

    it("must be done", () => {
      expect(gen.next()).toEqual({done: true, value: undefined});
    });
  });

  describe("changeLocaleListener", () => {
    const gen = watchChangeLocale();
    it("should watch for CHANGE_LANGUAGE action", () => {
      expect(gen.next().value).toEqual(takeLatest(CHANGE_LANGUAGE, fetchTranslations));
    });

    it("must be done", () => {
      expect(gen.next()).toEqual({done: true, value: undefined});
    });
  });
});
