import { all, fork } from "redux-saga/effects";
import { watchLanguageSwitch } from "./languageSaga";
import { watchStarsLoad } from "./starsSaga";

export default function* rootSaga(): any {
  yield all([
    fork(watchStarsLoad),
    fork(watchLanguageSwitch)
  ]);
}
