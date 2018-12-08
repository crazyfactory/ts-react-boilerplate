import {runSaga} from "redux-saga";
import {takeLatest} from "redux-saga/effects";
import {changeLanguage} from "../redux/modules/settingsModule";
import {dummyApi} from "./dummyApi";
import {fetchTranslations, watchChangeLocale} from "./settingsSaga";

describe("SettingsSaga", () => {
  describe("fetchTranslations", () => {
    it("dispatches and calls correctly in case of success", () => {
      jest.spyOn(dummyApi, "getTranslations").mockImplementation(() => {
        return {hi: "Hallo"};
      });

      const dispatched = [];
      runSaga(
        {dispatch: (action) => dispatched.push(action)},
        fetchTranslations,
        {
          payload: "de-DE",
          type: changeLanguage.actionTypes.INVOKED
        }
      );

      expect(dispatched).toEqual([
        {
          payload: null,
          type: changeLanguage.actionTypes.PENDING
        },
        {
          payload: {hi: "Hallo"},
          type: changeLanguage.actionTypes.FULFILLED
        }
      ]);
      expect(dummyApi.getTranslations).toHaveBeenCalledWith("de-DE");
    });

    it("dispatches and calls correctly in case of error", () => {
      jest.spyOn(dummyApi, "getTranslations").mockImplementation(() => {
        throw new Error("Something wrong!");
      });

      const dispatched = [];
      runSaga(
        {dispatch: (action) => dispatched.push(action)},
        fetchTranslations,
        {
          payload: "de-DE",
          type: changeLanguage.actionTypes.INVOKED
        }
      );

      expect(dispatched).toEqual([
        {
          payload: null,
          type: changeLanguage.actionTypes.PENDING
        },
        {
          message: "Error: Something wrong!",
          type: changeLanguage.actionTypes.REJECTED
        }
      ]);
      expect(dummyApi.getTranslations).toHaveBeenCalledWith("de-DE");
    });
  });

  describe("watchChangeLocale", () => {
    const gen = watchChangeLocale();
    it("should watch for CHANGE_LANGUAGE action", () => {
      expect(gen.next().value).toEqual(takeLatest(changeLanguage.actionTypes.INVOKED, fetchTranslations));
    });

    it("must be done", () => {
      expect(gen.next()).toEqual({done: true, value: undefined});
    });
  });
});
