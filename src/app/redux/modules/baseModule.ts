import {Action} from "redux";

export interface IAction<P> extends Action {
  payload?: P;
  message?: string;
}

export interface IState<P> {
  error?: boolean;
  isFetching?: boolean;
  message?: string;
  payload: P;
}

export interface IDispatchToProps {
  dispatch: (actionCreator: IAction<any>) => any;
}
