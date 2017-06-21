import {Promise} from "es6-promise";
import {call, put} from "redux-saga/effects";
import {IRequestType} from "../helpers/promiseReducer";

export default function* makeRequest(apiMethod: () => Promise<any>, actionType: IRequestType): any {
  try {
    const payload = yield call(apiMethod);
    yield put({type: actionType.SUCCESS, payload});
  } catch (e) {
    yield put({type: actionType.FAILURE, message: e.message});
  }
}
