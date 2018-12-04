import * as PromiseReducer from "../../helpers/promiseReducer";
import {IAction, IState} from "./baseModule";
import {CHANGE_LANGUAGE, invokeChangeLanguage, IMeta, ISettings, settingsReducer} from "./settingsModule";

describe("languageModule", () => {
  describe("reducer", () => {
    it("returns state object with new meta", () => {
      const state: IState<ISettings, IMeta> = {
        isFetching: false,
        meta: {
          currency: "USD",
          locale: "en-US"
        },
        payload: {
          translations: {}
        }
      };
      const action: IAction<ISettings, IMeta> = {
        meta: {
          locale: "de"
        },
        type: CHANGE_LANGUAGE
      };
      expect(settingsReducer(state, action)).toEqual({
        isFetching: false,
        meta: {
          currency: "USD",
          locale: "de"
        },
        payload: {
          translations: {}
        }
      });
    });

    it("calls promiseReducer with correct arguments", () => {
      const state: IState<ISettings, IMeta> = {
        isFetching: false,
        meta: {
          currency: "USD",
          locale: "en-US"
        },
        payload: {
          translations: {a: "a", b: "b"}
        }
      };
      const spiedFn = jest.spyOn(PromiseReducer, "default");
      spiedFn.mockClear();
      expect(spiedFn).not.toHaveBeenCalled();
      settingsReducer(state, {type: "some type"});
      expect(spiedFn).toHaveBeenCalledWith(CHANGE_LANGUAGE, state, {type: "some type"});
    });

    it("has default initialState", () => {
      const initialState: IState<ISettings, IMeta> = {
        isFetching: false,
        meta: {
          currency: "EUR",
          locale: "en-US" // window.navigator.settings in jest is set to en-US
        },
        payload: {
          translations: {}
        }
      };

      const spiedFn = jest.spyOn(PromiseReducer, "default");
      spiedFn.mockClear();
      expect(spiedFn).not.toHaveBeenCalled();
      settingsReducer(undefined, {type: "some type"});
      expect(spiedFn).toHaveBeenLastCalledWith(CHANGE_LANGUAGE, initialState, {type: "some type"});
    });
  });

  describe("action creator", () => {
    describe("fetchTranslations()", () => {
      it("creates correct action", () => {
        const expected: IAction<ISettings, IMeta> = {
          meta: {
            locale: "de"
          },
          type: CHANGE_LANGUAGE
        };
        expect(invokeChangeLanguage("de")).toEqual(expected);
      });
    });
  });
});
