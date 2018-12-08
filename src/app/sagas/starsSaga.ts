import {call, CallEffect, ForkEffect, takeLatest} from "redux-saga/effects";
import {promiseAction} from "../helpers/promiseReducer";
import {LOAD_STARS} from "../redux/modules/starsModule";
import {dummyApi} from "./dummyApi";
import makeRequest from "./makeRequest";

export function* fetchStars(): IterableIterator<CallEffect> {
  yield call(makeRequest, promiseAction(LOAD_STARS), dummyApi.getStars);
}

export function* watchStarsLoad(): IterableIterator<ForkEffect> {
  yield takeLatest(LOAD_STARS, fetchStars);
}
