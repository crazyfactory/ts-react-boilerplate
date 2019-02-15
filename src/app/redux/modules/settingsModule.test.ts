import {setLanguage} from "./settingsActionCreators";
import {ISettingsState, settingsReducer} from "./settingsModule";

describe("settingsModule", () => {
  describe("reducer", () => {
    describe("returns correct state", () => {
      it("returns initial state when state and action type are undefined", () => {
        const initialState: ISettingsState = {
          error: "",
          language: "en",
          loaded: false,
          pending: false,
          translations: {}
        };
        expect(settingsReducer(undefined, {type: undefined} as any)).toEqual(initialState);
      });

      it("handle invoke action", () => {
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

      it("handle pending action", () => {
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

      it("handle fulfilled action", () => {
        const state: ISettingsState = {
          error: "",
          language: "de",
          loaded: false,
          pending: false,
          translations: {}
        };
        expect(settingsReducer(state, setLanguage.setFulfilled({Hello: "Hallo"}))).toEqual({
          error: "",
          language: "de",
          loaded: false,
          pending: true,
          translations: {Hello: "Hallo"}
        });
      });

      it("handle rejected action", () => {
        const state: ISettingsState = {
          error: "",
          language: "de",
          loaded: false,
          pending: false,
          translations: {}
        };
        expect(settingsReducer(state, setLanguage.setRejected(null))).toEqual({
          error: "",
          language: "de",
          loaded: false,
          pending: true,
          translations: {Hello: "Hallo"}
        });
      });

      it("when action.type is unknown", () => {
        const stateBefore: ISettingsState = {
          error: "",
          language: "en",
          pending: false,
          translations: {Hi: "Hi"}
        };

        const stateAfter = settingsReducer(stateBefore, {type: "Foo" as PENDING});
        expect(stateAfter).toBe(stateBefore);
      });
    });
  });
});
