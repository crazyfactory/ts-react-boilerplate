import {Action} from "redux";
import {call, CallEffect, put, PutEffect} from "redux-saga/effects";
import {IRequestType} from "../helpers/promiseReducer";

export default function* makeRequest(requestType: IRequestType, apiMethod: (payload: any) => Promise<any>, ...args: any[]): IterableIterator<PutEffect<Action> | CallEffect> {
  try {
    yield put({type: requestType.PENDING});
    const [arg0, arg1, arg2, arg3, arg4, arg5, ...rest] = args; // we do this because of redux saga typing limitation
    const payload = yield call(apiMethod, arg0, arg1, arg2, arg3, arg4, arg5, ...rest);
    yield put({type: requestType.SUCCESS, payload});
  } catch (e) {
    yield put({type: requestType.FAILURE, message: e.message});
  }
}
