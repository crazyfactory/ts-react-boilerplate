import {IAction, IState} from "./baseModule";
import * as counter from "./counterModule";
import {ICounter} from "./counterModule";

describe("Counter Reducer", () => {
    const state: IState<ICounter> = {isFetching: false, payload: {count: 10}};

    it("handles action of type INCREMENT", () => {
      const action: IAction<ICounter> = {type: counter.INCREMENT};
      expect(counter.counterReducer(state, action)).toEqual({isFetching: false, payload: {count: state.payload.count + 1}});
    });

    it("handles action of type DECREMENT", () => {
      const action: IAction<ICounter> = {type: counter.DECREMENT};
      expect(counter.counterReducer(state, action)).toEqual({isFetching: false, payload: {count: state.payload.count - 1}});
    });

    it("handles actions with unknown type", () => {
      expect(counter.counterReducer(state, {type: ""})).toEqual({isFetching: false, payload: {count: state.payload.count}});
    });
});
