import {IStars, IStarsAction} from "models/starsModel";
import promiseReducer, {IRequestType} from "../../helpers/promiseReducer";

export const actionType: IRequestType = {
  FAILURE: "STARS_FAILURE",
  REQUEST: "STARS_REQUEST",
  SUCCESS: "STARS_SUCCESS"
};

/** Initial State */
const initialState: IStars = {
  payload: null
};

/** Reducer */
export function starsReducer(state: IStars = initialState, action: IStarsAction): IStars {
  return promiseReducer<IStars, IStarsAction>(actionType, state, action);
}
