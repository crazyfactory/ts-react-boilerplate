import autobind from "autobind-decorator";
import {call, CallEffect, ForkEffect, put, PutEffect, takeLatest} from "redux-saga/effects";
import {getType} from "typesafe-actions";
import {setLanguage} from "../redux/modules/settingsActionCreators";
import {BaseSaga} from "./BaseSaga";
import {dummyApi} from "./dummyApi";

export class SettingsSaga extends BaseSaga {
  @autobind
  public *fetchTranslations(
    action: ReturnType<typeof setLanguage.invoke>
  ): IterableIterator<CallEffect | PutEffect<any>> {
    try {
      yield put(setLanguage.setPending(null));
      const translations = yield call(dummyApi.getTranslations, action.payload);
      yield put(setLanguage.setFulfilled(translations));
    } catch (e) {
      yield put(setLanguage.setRejected(null, e.toString()));
    }
  }

  protected *registerListeners(): IterableIterator<ForkEffect> {
    yield takeLatest(getType(setLanguage.invoke), this.fetchTranslations);
  }
}
