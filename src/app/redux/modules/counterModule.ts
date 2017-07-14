import {IAction, IState} from "./baseModule";

export const INCREMENT: string = "counter/INCREMENT";
export const DECREMENT: string = "counter/DECREMENT";

export interface ICounter {
  count: number;
}

const initialState: IState<ICounter> = {
  isFetching: false,
  payload: {
    count: 0
  }
};

export function counterReducer(state: IState<ICounter> = initialState, action?: IAction<ICounter>): IState<ICounter> {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        payload: {
          count: state.payload.count + 1
        }
      };
    case DECREMENT:
      return {
        ...state,
        payload: {
          count: ((state.payload.count - 1 > 0) ? state.payload.count - 1 : 0)
        }
      };
    default:
      return state;
  }
}

export function increment(): IAction<ICounter> {
  return {
    type: INCREMENT
  };
}

export function decrement(): IAction<ICounter> {
  return {
    type: DECREMENT
  };
}
