import {all, AllEffect} from "redux-saga/effects";
import {SettingsSaga} from "./SettingsSaga";
import {StarsSaga} from "./StarsSaga";

export default function* rootSaga(): IterableIterator<AllEffect<any>> {
  yield all([
    (new SettingsSaga()).watch(),
    (new StarsSaga()).watch()
  ]);
}
