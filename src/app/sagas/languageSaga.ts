import {call, takeLatest} from "redux-saga/effects";

import {ILanguageAction, requestType, SWITCH_LANGUAGE} from "../redux/modules/languageModule";
import {dummyApi} from "./dummyApi";
import makeRequest from "./makeRequest";

export function* updateLanguage(action: ILanguageAction): any {
  yield call(makeRequest, dummyApi.getLanguageData, requestType, action.payload);
}

export function* watchLanguageSwitch(): any {
  yield takeLatest(SWITCH_LANGUAGE, updateLanguage);
}
