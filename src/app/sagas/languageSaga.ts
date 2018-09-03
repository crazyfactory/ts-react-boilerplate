import {call, CallEffect, ForkEffect, takeLatest} from "redux-saga/effects";
import {IAction} from "../redux/modules/baseModule";
import {ILanguage, requestType, SWITCH_LANGUAGE} from "../redux/modules/languageModule";
import {dummyApi} from "./dummyApi";
import makeRequest from "./makeRequest";

export function* updateLanguage(action: IAction<ILanguage>): IterableIterator<CallEffect> {
  yield call(makeRequest, requestType, dummyApi.getLanguageData, action.payload.locale);
}

export function* watchLanguageSwitch(): IterableIterator<ForkEffect> {
  yield takeLatest(SWITCH_LANGUAGE, updateLanguage);
}
