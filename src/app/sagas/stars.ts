import {put, takeLatest} from "redux-saga/effects";
import {STARS_LOAD, STARS_REQUEST} from "../redux/modules/starsModule";
import TestApi from "./TestApi";

export function* fetchStars(): any {
  const api = new TestApi();
  yield put({type: STARS_REQUEST, payload: api.getStars()});
}

export function* watchStarsLoad(): any {
  yield takeLatest(STARS_LOAD, fetchStars);
}
