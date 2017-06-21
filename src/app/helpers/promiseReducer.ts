import IBaseAction from "../models/IBaseAction";

export interface IRequestType {
  REQUEST: string;
  SUCCESS: string;
  FAILURE: string;
}

export default function promiseReducer<TState, TAction>(actionType: IRequestType, state: TState, action: IBaseAction & TAction): TState {
  switch (action.type) {
    case actionType.REQUEST:
      return Object.assign({}, state, {
        payload: null
      });

    case actionType.SUCCESS:
      return Object.assign({}, state, {
        payload: action.payload
      });

    case actionType.FAILURE:
      return Object.assign({}, state, {
        error: true,
        message: action.message
      });

    default:
      return state;
  }
}
