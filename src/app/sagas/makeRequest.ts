import {Promise} from "es6-promise";
import {put} from "redux-saga/effects";
const { call } = require("redux-saga/effects");
import {IRequestType} from "../helpers/promiseReducer";

export default function* makeRequest(apiMethod: (payload: any) => Promise<any>, requestType: IRequestType, ...args: any[]): any {
  try {
    yield put({type: requestType.PENDING});
    const payload = yield call(apiMethod, ...args);
    yield put({type: requestType.SUCCESS, payload});
  } catch (e) {
    yield put({type: requestType.FAILURE, message: e.message});
  }
}
