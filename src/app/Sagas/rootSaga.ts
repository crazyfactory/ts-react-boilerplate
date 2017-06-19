import { fork } from "redux-saga/effects";
import fetchStars from "./fetchStars";

export default function* rootSaga(): any {
  yield [
    fork(fetchStars)
  ];
}
