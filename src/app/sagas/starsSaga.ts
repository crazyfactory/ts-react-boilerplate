import {call, takeLatest} from "redux-saga/effects";
import {actionType} from "../redux/modules/starsModule";
import {dummyApi} from "./dummyApi";
import makeRequest from "./makeRequest";

export function* fetchStars(): any {
  yield call(makeRequest, dummyApi.getStars, actionType);
}

export function* watchStarsLoad(): any {
  yield takeLatest(actionType.REQUEST, fetchStars);
}
