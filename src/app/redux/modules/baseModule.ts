import {Action} from "redux";

export interface IAction<P, T = string, M = string> extends Action<T> {
  payload?: P;
  message?: M;
}

export interface IBaseState {
  error: string;
  loaded: boolean;
  pending: boolean;
}

// trick compiler that they are literal types
export type INVOKED = "INVOKED";
export type PENDING = "PENDING";
export type FULFILLED = "FULFILLED";
export type REJECTED = "REJECTED";

export interface IPromiseActions {
  INVOKED: INVOKED;
  PENDING: PENDING;
  FULFILLED: FULFILLED;
  REJECTED: REJECTED;
}

export function getPromiseActionType(baseAction: string): IPromiseActions {
  return {
    FULFILLED: baseAction + "_FULFILLED" as FULFILLED,
    INVOKED: baseAction as INVOKED,
    PENDING: baseAction + "_PENDING" as PENDING,
    REJECTED: baseAction + "_REJECTED" as REJECTED
  };
}

export interface IActionCreators<I, P, F, R> {
  actionTypes: IPromiseActions;
  invoke: (payload: I) => IAction<I, INVOKED>;
  setPending: (payload: P) => IAction<P, PENDING>;
  setFulfilled: (payload: F) => IAction<F, FULFILLED>;
  setRejected: (payload: R) => IAction<null, REJECTED, R>;
}

export function getPromiseAction<I, P, F, R>(type: string): IActionCreators<I, P, F, R> {
  return {
    actionTypes: getPromiseActionType(type),
    invoke: (payload: I): IAction<I, INVOKED> => {
      return {type: type as INVOKED, payload};
    },
    setFulfilled: (payload: F): IAction<F, FULFILLED> => {
      return {type: getPromiseActionType(type).FULFILLED, payload};
    },
    setPending: (payload: P): IAction<P, PENDING> => {
      return {type: getPromiseActionType(type).PENDING, payload};
    },
    setRejected: (message: R): IAction<null, REJECTED, R> => {
      return {type: getPromiseActionType(type).REJECTED, message};
    }
  };
}
