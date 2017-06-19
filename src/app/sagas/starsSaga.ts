import {call, takeLatest} from "redux-saga/effects";
import {STARS_FAILURE, STARS_REQUEST, STARS_SUCCESS} from "../redux/modules/starsModule";
import makeRequest from "./makeRequest";
import TestApi from "./TestApi";

export function* fetchStars(): any {
  const api = new TestApi();
  yield call(makeRequest, api.getStars, STARS_SUCCESS, STARS_FAILURE);
}

export function* watchStarsLoad(): any {
  yield takeLatest(STARS_REQUEST, fetchStars);
}
