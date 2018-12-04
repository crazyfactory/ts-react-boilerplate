import {call, CallEffect, ForkEffect, put, PutEffect, takeLatest} from "redux-saga/effects";
import {IAction} from "../redux/modules/baseModule";
import {changeLanguage} from "../redux/modules/settingsModule";
import {dummyApi} from "./dummyApi";

export function* fetchTranslations(action: IAction<string>): IterableIterator<CallEffect | PutEffect<any>> {
  try {
    yield put(changeLanguage.setPending(null));
    const translations = yield call(dummyApi.getTranslations, action.payload);
    yield put(changeLanguage.setFulfilled(translations));
  } catch (e) {
    yield put(changeLanguage.setRejected(e.toString()));
  }
}

export function* watchChangeLocale(): IterableIterator<ForkEffect> {
  yield takeLatest(changeLanguage.actionTypes.INVOKED, fetchTranslations);
}
