import {all, AllEffect, fork} from "redux-saga/effects";
import {watchChangeLocale} from "./settingsSaga";

export default function* rootSaga(): IterableIterator<AllEffect> {
  yield all([
    fork(watchChangeLocale)
  ]);
}
