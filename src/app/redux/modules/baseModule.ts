import {Action} from "redux";

interface IAction<P> extends Action {
  payload?: P;
  message?: string;
}

interface IState<P> {
  error?: boolean;
  isFetching: boolean;
  message?: string;
  payload: P;
}
export {IAction, IState};
