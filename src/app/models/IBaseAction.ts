import {Action} from "redux";

interface IBaseAction extends Action {
  payload?: any;
}
export default IBaseAction;
