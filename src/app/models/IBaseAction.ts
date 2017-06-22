import {Action} from "redux";

interface IBaseAction extends Action {
  payload?: any;
  message?: string;
}
export default IBaseAction;
