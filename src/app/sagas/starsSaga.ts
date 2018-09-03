import {call, CallEffect, ForkEffect, takeLatest} from "redux-saga/effects";
import {LOAD_STARS, requestType} from "../redux/modules/starsModule";
import {dummyApi} from "./dummyApi";
import makeRequest from "./makeRequest";

export function* fetchStars(): IterableIterator<CallEffect> {
  yield call(makeRequest, requestType, dummyApi.getStars);
}

export function* watchStarsLoad(): IterableIterator<ForkEffect> {
  yield takeLatest(LOAD_STARS, fetchStars);
}
