import {IAction, IBaseState} from "./baseModule";

export interface ICounterState extends IBaseState {
  count: number;
}

const initialState: ICounterState = {
  count: 0,
  error: "",
  loaded: false,
  pending: false
};

export const INCREMENT: string = "counter/INCREMENT";
export const DECREMENT: string = "counter/DECREMENT";

export function counterReducer(
  state: ICounterState = initialState,
  action: IAction<null, typeof INCREMENT> |
    IAction<null, typeof DECREMENT>
): ICounterState {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1
      };
    case DECREMENT:
      return {
        ...state,
        count: ((state.count - 1 > 0) ? state.count - 1 : 0)
      };
    default:
      return state;
  }
}

export function increment(): IAction<number, typeof INCREMENT> {
  return {
    type: INCREMENT
  };
}

export function decrement(): IAction<null, typeof DECREMENT> {
  return {
    type: DECREMENT
  };
}
