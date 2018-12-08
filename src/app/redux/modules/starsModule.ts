import promiseReducer from "../../helpers/promiseReducer";
import {IAction, IState} from "./baseModule";

export const LOAD_STARS: string = "stars/LOAD_STARS";

export interface IStars {
  stargazers_count: number;
}

const initialState: IState<IStars> = {
  isFetching: true,
  payload: {
    stargazers_count: -1
  }
};

export function starsReducer(state: IState<IStars> = initialState, action: IAction<IStars>): IState<IStars> {
  // an example how you can deal with action type other than requesting types in promiseReducer
  if (action.type === LOAD_STARS) {
    return state;
  }
  return promiseReducer<IStars>(LOAD_STARS, state, action);
}

export function loadStars(): IAction<IStars> {
  return {
    type: LOAD_STARS
  };
}
