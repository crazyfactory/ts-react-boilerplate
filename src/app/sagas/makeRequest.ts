import {Promise} from "es6-promise";
import {call, put} from "redux-saga/effects";
import {IRequestType} from "../helpers/promiseReducer";

export default function* makeRequest(apiMethod: () => Promise<any>, requestType: IRequestType): any {
  try {
    yield put({type: requestType.PENDING});
    const payload = yield call(apiMethod);
    yield put({type: requestType.SUCCESS, payload});
  } catch (e) {
    yield put({type: requestType.FAILURE, message: e.message});
  }
}
