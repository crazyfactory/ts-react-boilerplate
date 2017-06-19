import {put, takeLatest} from "redux-saga/effects";
import TestApi from "./TestApi";

function* fetchStarsAction(): any {
  const api = new TestApi();
  yield put({type: "stars/GET_REQUEST", payload: api.getStars()});
}

function* fetchStars(): any {
  yield takeLatest("stars/PAGE_LOAD", fetchStarsAction);
}

export default fetchStars;
