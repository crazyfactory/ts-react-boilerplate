import {IAction, IState} from "../redux/modules/baseModule";

export interface IPromiseActions {
  FULFILLED: string;
  PENDING: string;
  REJECTED: string;
}

export const promiseAction = (baseAction: string): IPromiseActions => {
  return {
    FULFILLED: baseAction + "_FULFILLED",
    PENDING: baseAction + "_PENDING",
    REJECTED: baseAction + "_REJECTED"
  };
};

// tslint:disable:max-line-length
export default function promiseReducer<P, M = {}>(baseAction: string, state: IState<P, M>, action: IAction<P, M>): IState<P, M> {
  switch (action.type) {
    case promiseAction(baseAction).PENDING:
      return {
        ...state,
        isFetching: true
      };

    case promiseAction(baseAction).FULFILLED:
      return {
        ...state,
        isFetching: false,
        payload: action.payload
      };
    case promiseAction(baseAction).REJECTED:
      return {
        ...state,
        error: true,
        isFetching: false,
        message: action.message
      };
    default:
      return state;
  }
}
