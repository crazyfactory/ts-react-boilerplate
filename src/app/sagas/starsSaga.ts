import {call, takeLatest} from "redux-saga/effects";
import {LOAD_STARS, requestType} from "../redux/modules/starsModule";
import {dummyApi} from "./dummyApi";
import makeRequest from "./makeRequest";

export function* fetchStars(): any {
  yield call(makeRequest, requestType, dummyApi.getStars);
}

export function* watchStarsLoad(): any {
  yield takeLatest(LOAD_STARS, fetchStars);
}
