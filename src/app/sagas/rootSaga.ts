import {all, AllEffect, fork} from "redux-saga/effects";
import {watchChangeLocale} from "./settingsSaga";
import {watchStarsLoad} from "./starsSaga";

export default function* rootSaga(): IterableIterator<AllEffect> {
  yield all([
    fork(watchChangeLocale),
    fork(watchStarsLoad)
  ]);
}
