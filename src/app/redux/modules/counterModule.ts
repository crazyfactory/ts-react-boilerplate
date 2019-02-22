import {ActionType, getType} from "typesafe-actions";
import {IBaseState} from "./baseModule";
import * as counterActionCreators from "./counterActionCreators";

export interface ICounterState extends IBaseState {
  count: number;
}

const initialState: ICounterState = {
  count: 0,
  error: "",
  loaded: false,
  pending: false
};

export function counterReducer(
  state: ICounterState = initialState,
  action: ActionType<typeof counterActionCreators>
): ICounterState {
  switch (action.type) {
    case getType(counterActionCreators.increment):
      return {
        ...state,
        count: state.count + 1
      };
    case getType(counterActionCreators.decrement):
      return {
        ...state,
        count: ((state.count - 1 > 0) ? state.count - 1 : 0)
      };
    default:
      return state;
  }
}
