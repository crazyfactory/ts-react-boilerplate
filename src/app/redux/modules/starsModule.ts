import {ActionType, getType} from "typesafe-actions";
import {IBaseState} from "./baseModule";
import * as starsActionCreators from "./starsActionCreators";

export interface IStarsState extends IBaseState {
  count: number;
}

const initialState: IStarsState = {
  count: 0,
  error: "",
  loaded: false,
  pending: false
};

export function starsReducer(
  state: IStarsState = initialState,
  action: ActionType<typeof starsActionCreators>
): IStarsState {
  switch (action.type) {
    case getType(starsActionCreators.loadStarsCount.setPending):
      return {
        ...state,
        pending: true
      };
    case getType(starsActionCreators.loadStarsCount.setFulfilled):
      return {
        ...state,
        count: action.payload,
        error: "",
        loaded: true,
        pending: false
      };
    case getType(starsActionCreators.loadStarsCount.setRejected):
      return {
        ...state,
        error: action.message,
        loaded: true,
        pending: false
      };
    default:
      return state;
  }
}
