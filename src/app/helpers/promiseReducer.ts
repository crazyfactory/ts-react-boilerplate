import IBaseAction from "../models/IBaseAction";

export default function promiseReducer<TState, TAction>(baseAction: string, state: TState, action: IBaseAction & TAction): TState {
  switch (action.type) {
    case baseAction + "_PENDING":
      return Object.assign({}, state, {
        isFetching: true
      });

    case baseAction + "_FULFILLED":
      return Object.assign({}, state, {
        isFetching: false,
        payload: action.payload
      });

    case baseAction + "_REJECTED":
      return Object.assign({}, state, {
        error: true,
        isFetching: false,
        payload: action.payload
      });

    default:
      return state;
  }
}
