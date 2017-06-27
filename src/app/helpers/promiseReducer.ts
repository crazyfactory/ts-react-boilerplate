import {IAction, IState} from "../redux/modules/baseModule";

export interface IRequestType {
  PENDING: string;
  SUCCESS: string;
  FAILURE: string;
}

export default function promiseReducer<P>(actionType: IRequestType, state: IState<P>, action: IAction<P>): IState<P> {
  switch (action.type) {
    case actionType.PENDING:
      return {
        ...state,
        isFetching: true
      };

    case actionType.SUCCESS:
      return {
        ...state,
        isFetching: false,
        payload: action.payload
      };
    case actionType.FAILURE:
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
