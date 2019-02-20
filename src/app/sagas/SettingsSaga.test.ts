jest.mock("./dummyApi");
import {runSaga} from "redux-saga";
import * as ReduxSagaEffects from "redux-saga/effects";
import {getType} from "typesafe-actions";
import {setLanguage} from "../redux/modules/settingsActionCreators";
import {dummyApi} from "./dummyApi";
import {SettingsSaga} from "./settingsSaga";

describe("SettingsSaga", () => {
  describe("fetchTranslations", () => {
    it("gets translations and sets fulfilled", () => {
      expect.assertions(1);
      const dispatched = [];
      (dummyApi as any).getTranslations.mockResolvedValue({"Translation Key": "Translation Value"});
      return runSaga(
        {
          dispatch: (action) => dispatched.push(action)
        },
        (new SettingsSaga()).fetchTranslations,
        {
          payload: "en",
          type: "SETTINGS/SET_LANGUAGE"
        }
      ).toPromise().then(() => {
        expect(dispatched).toEqual([
          {payload: null, type: "SETTINGS/SET_LANGUAGE_PENDING"},
          {payload: {"Translation Key": "Translation Value"}, type: "SETTINGS/SET_LANGUAGE_FULFILLED"}
        ]);
      });
    });

    it("gets rejected and sets rejected", () => {
      expect.assertions(1);
      const dispatched = [];
      (dummyApi as any).getTranslations.mockRejectedValue("Error");
      return runSaga(
        {
          dispatch: (action) => dispatched.push(action)
        },
        (new SettingsSaga()).fetchTranslations,
        {
          payload: "en",
          type: "SETTINGS/SET_LANGUAGE"
        }
      ).toPromise().then(() => {
        expect(dispatched).toEqual([
          {payload: null, type: "SETTINGS/SET_LANGUAGE_PENDING"},
          {message: "Error", payload: null, type: "SETTINGS/SET_LANGUAGE_REJECTED"}
        ]);
      });
    });
  });

  describe("registerListeners", () => {
    it("listens for setLanguage INVOKED and calls fetchTranslations", () => {
      const spied = jest.spyOn(ReduxSagaEffects, "fork");
      const settingsSaga = new SettingsSaga();
      settingsSaga.watch();
      const gen = (spied.mock.calls[0][0] as any)();
      expect(
        gen.next().value
      ).toEqual(ReduxSagaEffects.takeLatest(getType(setLanguage.invoke), settingsSaga.fetchTranslations));
    });
  });
});
