import {call, takeLatest} from "redux-saga/effects";

import {ILanguageAction, requestType, SWITCH_LANGUAGE} from "../redux/modules/languageModule";
import {dummyApi} from "./dummyApi";
import makeRequest from "./makeRequest";

export function* fetchStars(action: ILanguageAction): any {
  yield call(makeRequest, dummyApi.getLanguageData.bind(null, action.payload), requestType);
}

export function* watchLanguageSwitch(): any {
  yield takeLatest(SWITCH_LANGUAGE, fetchStars);
}
