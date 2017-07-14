import {call, takeLatest} from "redux-saga/effects";
import {IAction} from "../redux/modules/baseModule";
import {ILanguage, requestType, SWITCH_LANGUAGE} from "../redux/modules/languageModule";
import {dummyApi} from "./dummyApi";
import makeRequest from "./makeRequest";

export function* updateLanguage(action: IAction<ILanguage>): any {
  yield call(makeRequest, requestType, dummyApi.getLanguageData, action.payload.locale);
}

export function* watchLanguageSwitch(): any {
  yield takeLatest(SWITCH_LANGUAGE, updateLanguage);
}
