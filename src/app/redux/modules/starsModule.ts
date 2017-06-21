import {IStars, IStarsAction} from "models/starsModel";
import promiseReducer, {IRequestType} from "../../helpers/promiseReducer";

export const LOAD_STARS: string = "stars/LOAD_STARS";
export const requestType: IRequestType = {
  FAILURE: "stars/FAILURE",
  PENDING: "stars/PENDING",
  SUCCESS: "stars/SUCCESS"
};

/** Initial State */
const initialState: IStars = {
  payload: null
};

/** Reducer */
export function starsReducer(state: IStars = initialState, action: IStarsAction): IStars {
  return promiseReducer<IStars, IStarsAction>(requestType, state, action);
}
