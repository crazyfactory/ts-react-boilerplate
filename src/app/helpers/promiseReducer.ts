import IBaseAction from "../models/IBaseAction";

export interface IRequestType {
  PENDING: string;
  SUCCESS: string;
  FAILURE: string;
}

export default function promiseReducer<TState, TAction>(actionType: IRequestType, state: TState, action: IBaseAction & TAction): TState {
  switch (action.type) {
    case actionType.PENDING:
      return Object.assign({}, state, {
        isFetching: true
      });

    case actionType.SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        payload: action.payload
      });

    case actionType.FAILURE:
      return Object.assign({}, state, {
        error: true,
        isFetching: false,
        message: action.message
      });

    default:
      return state;
  }
}
