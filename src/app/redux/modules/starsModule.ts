import {IStars, IStarsAction} from "models/starsModel";
import promiseReducer from "../../helpers/promiseReducer";

/** Action Types */
export const STARS_LOAD: string = "stars/STARS_LOAD";
export const STARS_REQUEST: string = "stars/STARS_REQUEST";

/** Initial State */
const initialState: IStars = {
  isFetching: false
};

/** Reducer */
export function starsReducer(state: IStars = initialState, action: IStarsAction): IStars {
  return promiseReducer<IStars, IStarsAction>(STARS_REQUEST, state, action);
}
