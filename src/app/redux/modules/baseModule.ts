import {Action} from "redux";

export interface IAction<P, T = string, M = string> extends Action<T> {
  message?: M;
  payload?: P;
}

export interface IBaseState {
  error: string;
  loaded: boolean;
  pending: boolean;
}

export type TAsyncActionCreator<T extends string, P> = (payload: P) => IAction<P, T>;
export type TRejectedActionCreator<T extends string, P> = (payload: P, message: string) => IAction<P, T>;

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
  invoke: TAsyncActionCreator<T1, P1>;
  setFulfilled: TAsyncActionCreator<T3, P3>;
  setPending: TAsyncActionCreator<T2, P2>;
  setRejected: TRejectedActionCreator<T4, P4>;
}

export type TGetAsyncAction<T1 extends string, T2 extends string, T3 extends string, T4 extends string> =
  <P1, P2, P3, P4>() => IAsyncActionsBuilder<T1, T2, T3, T4, P1, P2, P3, P4>;

export function createAsyncActions<T1 extends string, T2 extends string, T3 extends string, T4 extends string>(
  baseType: T1,
  pendingType: T2,
  fulfilledType: T3,
  rejectedType: T4
): TGetAsyncAction<T1, T2, T3, T4> {

  function builder<P1, P2, P3, P4>(): IAsyncActionsBuilder<T1, T2, T3, T4, P1, P2, P3, P4> {
    const invokeActionCreator = (payload: P1): IAction<P1, T1> => ({type: baseType, payload});
    invokeActionCreator.getType = () => baseType;

    const fulfilledActionCreator = (payload: P3): IAction<P3, T3> => ({type: fulfilledType, payload});
    fulfilledActionCreator.getType = () => fulfilledType;

    const pendingActionCreator = (payload: P2): IAction<P2, T2> => ({type: pendingType, payload});
    pendingActionCreator.getType = () => pendingType;

    const rejectedActionCreator = (payload: P4, message: string): IAction<P4, T4> => (
      {type: rejectedType, message, payload}
    );
    rejectedActionCreator.getType = () => rejectedType;

    return {
      invoke: invokeActionCreator,
      setFulfilled: fulfilledActionCreator,
      setPending: pendingActionCreator,
      setRejected: rejectedActionCreator
    };
  }

  // tslint:disable-next-line:prefer-object-spread
  return Object.assign(builder, {});
}
