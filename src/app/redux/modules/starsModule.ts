import {IStars, IStarsAction} from "models/starsModel";
import promiseReducer from "../../helpers/promiseReducer";

/** Action Types */
export const STARS_REQUEST: string = "stars/STARS_REQUEST";
export const STARS_SUCCESS: string = "stars/STARS_SUCCESS";
export const STARS_FAILURE: string = "stars/STARS_FAILURE";

/** Initial State */
const initialState: IStars = {
  isFetching: false
};

/** Reducer */
export function starsReducer(state: IStars = initialState, action: IStarsAction): IStars {
  return promiseReducer<IStars, IStarsAction>("stars/STARS", state, action);
}
