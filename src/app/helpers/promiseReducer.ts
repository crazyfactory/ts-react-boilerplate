import IBaseAction from "../models/IBaseAction";

export default function promiseReducer<TState, TAction>(baseAction: string, state: TState, action: IBaseAction & TAction): TState {
  switch (action.type) {
    case baseAction + "_REQUEST":
      return Object.assign({}, state, {
        isFetching: true
      });

    case baseAction + "_SUCCESS":
      return Object.assign({}, state, {
        isFetching: false,
        payload: action.payload
      });

    case baseAction + "_FAILURE":
      return Object.assign({}, state, {
        error: true,
        isFetching: false,
        message: action.message
      });

    default:
      return state;
  }
}
