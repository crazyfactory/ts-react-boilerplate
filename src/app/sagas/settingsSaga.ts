import {call, CallEffect, ForkEffect, takeLatest} from "redux-saga/effects";
import {promiseAction} from "../helpers/promiseReducer";
import {IAction} from "../redux/modules/baseModule";
import {CHANGE_LOCALE, IMeta as ISettingsMeta, ISettings} from "../redux/modules/settingsModule";
import {dummyApi} from "./dummyApi";
import makeRequest from "./makeRequest";

export function* fetchTranslations(action: IAction<ISettings, ISettingsMeta>): IterableIterator<CallEffect> {
  yield call(makeRequest, promiseAction(CHANGE_LOCALE), dummyApi.getTranslations, action.meta.locale);
}

export function* watchChangeLocale(): IterableIterator<ForkEffect> {
  yield takeLatest(CHANGE_LOCALE, fetchTranslations);
}
