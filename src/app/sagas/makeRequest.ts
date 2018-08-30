import {put} from "redux-saga/effects";
const {call} = require("redux-saga/effects");
import {IRequestType} from "../helpers/promiseReducer";

export default function* makeRequest(requestType: IRequestType, apiMethod: (payload: any) => Promise<any>, ...args: any[]): any {
  try {
    yield put({type: requestType.PENDING});
    const payload = yield call(apiMethod, ...args);
    yield put({type: requestType.SUCCESS, payload});
  } catch (e) {
    yield put({type: requestType.FAILURE, message: e.message});
  }
}
