import {IAction, IState} from "./baseModule";
import {counterReducer, DECREMENT, decrement, ICounter, INCREMENT, increment} from "./counterModule";

describe("counterModule", () => {
  describe("reducer", () => {
    const state: IState<ICounter> = {isFetching: false, payload: {count: 10}};

    it("returns initial state when state and action type are undefined", () => {
      const initialState: IState<ICounter> = {
        isFetching: false,
        payload: {
          count: 0
        }
      };
      expect(counterReducer(undefined, {type: undefined})).toEqual(initialState);
    });

    it("handles action of type INCREMENT", () => {
      const action: IAction<ICounter> = {type: INCREMENT};
      expect(counterReducer(state, action)).toEqual({
        isFetching: false,
        payload: {count: state.payload.count + 1}
      });
    });

    it("handles action of type DECREMENT when count is more than 1", () => {
      const action: IAction<ICounter> = {type: DECREMENT};
      expect(counterReducer(state, action)).toEqual({
        isFetching: false,
        payload: {count: state.payload.count - 1}
      });
    });

    it("handles action of type DECREMENT when count is 1", () => {
      const stateLessThanOne: IState<ICounter> = {isFetching: false, payload: {count: 1}};
      const action: IAction<ICounter> = {type: DECREMENT};
      expect(counterReducer(stateLessThanOne, action)).toEqual({
        isFetching: false,
        payload: {count: stateLessThanOne.payload.count - 1}
      });
    });

    it("handles actions with unknown type", () => {
      expect(counterReducer(state, {type: ""})).toEqual({
        isFetching: false,
        payload: {count: state.payload.count}
      });
    });
  });

  describe("action creator", () => {
    describe("increment()", () => {
      it("creates correct action", () => {
        const expectedValue: IAction<ICounter> = {
          type: INCREMENT
        };
        expect(increment()).toEqual(expectedValue);
      });
    });

    describe("decrement()", () => {
      it("creates correct action", () => {
        const expectedValue: IAction<ICounter> = {
          type: DECREMENT
        };
        expect(decrement()).toEqual(expectedValue);
      });
    });
  });
});
