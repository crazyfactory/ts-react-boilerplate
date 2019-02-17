import {setLanguage} from "./settingsActionCreators";
import {ISettingsState, settingsReducer} from "./settingsModule";

describe("settingsModule", () => {
  describe("reducer", () => {
    it("returns initial state when state and action type are undefined", () => {
      const initialState: ISettingsState = {
        error: "",
        language: "en",
        loaded: false,
        pending: false,
        translations: {}
      };
      expect(settingsReducer(undefined, {type: undefined})).toEqual(initialState);
    });

    it("handles invoke action", () => {
      const state: ISettingsState = {
        error: "",
        language: "en",
        loaded: false,
        pending: false,
        translations: {}
      };
      expect(settingsReducer(state, setLanguage.invoke("de"))).toEqual({
        error: "",
        language: "de",
        loaded: false,
        pending: false,
        translations: {}
      });
    });

    it("handles pending action", () => {
      const state: ISettingsState = {
        error: "",
        language: "en",
        loaded: false,
        pending: false,
        translations: {}
      };
      expect(settingsReducer(state, setLanguage.setPending(null))).toEqual({
        error: "",
        language: "en",
        loaded: false,
        pending: true,
        translations: {}
      });
    });

    it("handles fulfilled action", () => {
      const state: ISettingsState = {
        error: "",
        language: "de",
        loaded: false,
        pending: true,
        translations: {}
      };
      expect(settingsReducer(state, setLanguage.setFulfilled({Hello: "Hallo"}))).toEqual({
        error: "",
        language: "de",
        loaded: true,
        pending: false,
        translations: {Hello: "Hallo"}
      });
    });

    it("handles rejected action", () => {
      const state: ISettingsState = {
        error: "",
        language: "de",
        loaded: false,
        pending: true,
        translations: {}
      };
      expect(settingsReducer(state, setLanguage.setRejected(null, "Error"))).toEqual({
        error: "Error",
        language: "de",
        loaded: true,
        pending: false,
        translations: {}
      });
    });

    it("handles actions with unknown type", () => {
      const state: ISettingsState = {
        error: "",
        language: "en",
        loaded: false,
        pending: false,
        translations: {Hello: "Hallo"}
      };
      expect(settingsReducer(state, {type: "unknown"} as any)).toBe(state);
    });
  });
});
