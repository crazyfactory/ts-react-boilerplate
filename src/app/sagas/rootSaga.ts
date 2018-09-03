import { all, AllEffect, fork } from "redux-saga/effects";
import { watchLanguageSwitch } from "./languageSaga";
import { watchStarsLoad } from "./starsSaga";

export default function* rootSaga(): IterableIterator<AllEffect> {
  yield all([
    fork(watchStarsLoad),
    fork(watchLanguageSwitch)
  ]);
}
