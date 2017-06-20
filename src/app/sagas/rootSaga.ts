import { all, fork } from "redux-saga/effects";
import { watchStarsLoad } from "./starsSaga";

export default function* rootSaga(): any {
  yield all([
    fork(watchStarsLoad)
  ]);
}
