import IBaseAction from "../models/IBaseAction";

/**
 * @param name todo: change to a better name
 * @param state
 * @param action
 * @returns {any}
 */
export default function baseReducer<TState, TAction>(name: string, state: TState, action: IBaseAction & TAction): TState {
  switch (action.type) {
    case name + "_PENDING":
      return Object.assign({}, state, {
        isFetching: true
      });

    case name + "_FULFILLED":
      return Object.assign({}, state, {
        isFetching: false,
        payload: action.payload
      });

    case name + "_REJECTED":
      return Object.assign({}, state, {
        error: true,
        isFetching: false,
        payload: action.payload
      });

    default:
      return state;
  }
}