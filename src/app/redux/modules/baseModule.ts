import {Action} from "redux";

export interface IAction<P, M = {}> extends Action {
  payload?: P;
  message?: string;
  meta?: M;
}

export interface IState<P, M = {}> {
  error?: boolean;
  isFetching?: boolean;
  message?: string;
  meta?: M;
  payload: P;
}

export interface IDispatchToProps {
  dispatch: (actionCreator: IAction<any, any>) => any;
}
