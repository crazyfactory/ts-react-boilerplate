import {decrement, increment} from "./counterActionCreators";
import {counterReducer, ICounterState} from "./counterModule";

describe("counterModule", () => {
  describe("reducer", () => {
    it("returns initial state when state and action type are undefined", () => {
      const initialState: ICounterState = {
        count: 0,
        error: "",
        loaded: false,
        pending: false
      };
      expect(counterReducer(undefined, {type: undefined})).toEqual(initialState);
    });

    it("handles action of type INCREMENT", () => {
      const state: ICounterState = {
        count: 0,
        error: "",
        loaded: false,
        pending: false
      };
      expect(counterReducer(state, increment())).toEqual({
        count: 1,
        error: "",
        loaded: false,
        pending: false
      });
    });

    it("handles action of type DECREMENT when count is more than 0", () => {
      const state: ICounterState = {
        count: 2,
        error: "",
        loaded: false,
        pending: false
      };
      expect(counterReducer(state, decrement())).toEqual({
        count: 1,
        error: "",
        loaded: false,
        pending: false
      });
    });

    it("handles action of type DECREMENT when count is 0", () => {
      const state: ICounterState = {
        count: 0,
        error: "",
        loaded: false,
        pending: false
      };
      expect(counterReducer(state, decrement())).toEqual({
        count: 0,
        error: "",
        loaded: false,
        pending: false
      });
    });

    it("handles actions with unknown type", () => {
      const state: ICounterState = {
        count: 10,
        error: "",
        loaded: false,
        pending: false
      };
      expect(counterReducer(state, {type: "unknown"} as any)).toBe(state);
    });
  });
});
