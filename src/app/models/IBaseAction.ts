import {Action} from "redux";

interface IBaseAction extends Action {
  isFetching?: boolean;
  payload?: any;
  message?: string;
}
export default IBaseAction;
