import { fork } from "redux-saga/effects";
import { watchStarsLoad } from "./stars";

export default function* rootSaga(): any {
  yield [
    fork(watchStarsLoad)
  ];
}
