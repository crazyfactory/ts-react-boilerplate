import {FULFILLED, getPromiseAction, IAction, IBaseState, PENDING, REJECTED} from "./baseModule";

export interface IStarsState extends IBaseState {
  count: number;
}

const initialState: IStarsState = {
  count: 0,
  error: "",
  loaded: false,
  pending: false
};

export const loadStarsCount = getPromiseAction<null, null, number, null>("STARS/LOAD_STARS_COUNT");

export function starsReducer(
  state: IStarsState = initialState,
  action: IAction<null, PENDING> |
    IAction<number, FULFILLED> |
    IAction<null, REJECTED>
): IStarsState {
  switch (action.type) {
    case loadStarsCount.actionTypes.PENDING:
      return {
        ...state,
        pending: true
      };
    case loadStarsCount.actionTypes.FULFILLED:
      return {
        ...state,
        count: action.payload,
        error: "",
        loaded: true,
        pending: false
      };
    case loadStarsCount.actionTypes.REJECTED:
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
