import {IAction, IState} from "./baseModule";

export const INCREMENT: string = "counter/INCREMENT";
export const DECREMENT: string = "counter/DECREMENT";

export interface ICounter {
  count: number;
}

/** Counter: Initial State */
const initialState: IState<ICounter> = {
  isFetching: false,
  payload: {
    count: 0
  }
};

/** Reducer: CounterReducer */
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
