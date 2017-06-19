import {Promise} from "es6-promise";
import {call, put} from "redux-saga/effects";

export default function* makeRequest(apiMethod: () => Promise<any>, actionSuccess: string, acctionFailure: string): any {
  try {
    const payload = yield call(apiMethod);
    yield put({type: actionSuccess, payload});
  } catch (e) {
    yield put({type: acctionFailure, message: e.message});
  }
}
