import {call, takeLatest} from "redux-saga/effects";
import {actionType} from "../redux/modules/starsModule";
import makeRequest from "./makeRequest";
import TestApi from "./TestApi";

export function* fetchStars(): any {
  const api = new TestApi();
  yield call(makeRequest, api.getStars, actionType);
}

export function* watchStarsLoad(): any {
  yield takeLatest(actionType.REQUEST, fetchStars);
}
