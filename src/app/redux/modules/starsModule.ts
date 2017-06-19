import {IStars, IStarsAction} from "models/starsModel";
import baseReducer from "../../helpers/baseReducer";

/** Action Types */
export const GET_REQUEST: string = "stars/GET_REQUEST";

/** Initial State */
const initialState: IStars = {
  isFetching: false
};

/** Reducer */
export function starsReducer(state: IStars = initialState, action: IStarsAction): IStars {
  return baseReducer<IStars, IStarsAction>("stars/GET_REQUEST", state, action);
}
