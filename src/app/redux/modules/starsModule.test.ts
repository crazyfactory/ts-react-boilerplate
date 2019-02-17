import {loadStarsCount} from "./starsActionCreators";
import {IStarsState, starsReducer} from "./starsModule";

describe("starsModule", () => {
  describe("reducer", () => {
    it("returns initial state when state and action type are undefined", () => {
      const initialState: IStarsState = {
        count: 0,
        error: "",
        loaded: false,
        pending: false
      };
      expect(starsReducer(undefined, {type: undefined})).toEqual(initialState);
    });

    it("handles pending action", () => {
      const state: IStarsState = {
        count: 0,
        error: "",
        loaded: false,
        pending: false
      };
      expect(starsReducer(state, loadStarsCount.setPending(null))).toEqual({
        count: 0,
        error: "",
        loaded: false,
        pending: true
      });
    });

    it("handles fulfilled action", () => {
      const state: IStarsState = {
        count: 0,
        error: "",
        loaded: false,
        pending: true
      };
      expect(starsReducer(state, loadStarsCount.setFulfilled(10))).toEqual({
        count: 10,
        error: "",
        loaded: true,
        pending: false
      });
    });

    it("handles rejected action", () => {
      const state: IStarsState = {
        count: 0,
        error: "",
        loaded: false,
        pending: true
      };
      expect(starsReducer(state, loadStarsCount.setRejected(null, "Error"))).toEqual({
        count: 0,
        error: "Error",
        loaded: true,
        pending: false
      });
    });

    it("handles actions with unknown type", () => {
      const state: IStarsState = {
        count: 10,
        error: "",
        loaded: true,
        pending: false
      };
      expect(starsReducer(state, {type: "unknown"} as any)).toBe(state);
    });
  });
});
