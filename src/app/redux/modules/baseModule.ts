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

export type IAsyncActionCreator<T extends string, P> = (payload: P) => IAction<P, T>;

export interface IAsyncActionsBuilder<
  T1 extends string,
  T2 extends string,
  T3 extends string,
  T4 extends string,
  P1,
  P2,
  P3,
  P4
> {
  invoke: IAsyncActionCreator<T1, P1>;
  setFulfilled: IAsyncActionCreator<T3, P3>;
  setPending: IAsyncActionCreator<T2, P2>;
  setRejected: IAsyncActionCreator<T4, P4>;
}

export interface IGetAsyncAction<T1 extends string, T2 extends string, T3 extends string, T4 extends string> {
  // tslint:disable-next-line:callable-types
  <P1, P2, P3, P4>(): IAsyncActionsBuilder<T1, T2, T3, T4, P1, P2, P3, P4>;
}

export function createAsyncActions<T1 extends string, T2 extends string, T3 extends string, T4 extends string>(
  baseType: T1,
  pendingType: T2,
  fulfilledType: T3,
  rejectedType: T4
): IGetAsyncAction<T1, T2, T3, T4> {

  function builder<P1, P2, P3, P4>(): IAsyncActionsBuilder<T1, T2, T3, T4, P1, P2, P3, P4> {
    return {
      invoke: (payload?: P1): IAction<P1, T1> => ({type: baseType, payload}),
      setFulfilled: (payload?: P3): IAction<P3, T3> => ({type: fulfilledType, payload}),
      setPending: (payload?: P2): IAction<P2, T2> => ({type:  pendingType, payload}),
      setRejected: (payload?: P4): IAction<P4, T4> => ({type: rejectedType as T4, payload})
    };
  }

  // tslint:disable-next-line:prefer-object-spread
  return Object.assign(builder, {});
}
