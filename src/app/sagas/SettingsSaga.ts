import autobind from "autobind-decorator";
import {call, CallEffect, ForkEffect, put, PutEffect, takeLatest} from "redux-saga/effects";
import {IAction} from "../redux/modules/baseModule";
import {setLanguage, TLanguage} from "../redux/modules/settingsModule";
import {BaseSaga} from "./BaseSaga";
import {dummyApi} from "./dummyApi";

export class SettingsSaga extends BaseSaga {
  @autobind
  public *fetchTranslations(action: IAction<TLanguage>): IterableIterator<CallEffect | PutEffect<any>> {
    try {
      yield put(setLanguage.setPending(null));
      const translations = yield call(dummyApi.getTranslations, action.payload);
      yield put(setLanguage.setFulfilled(translations));
    } catch (e) {
      yield put(setLanguage.setRejected(e.toString()));
    }
  }

  protected *registerListeners(): IterableIterator<ForkEffect> {
    yield takeLatest(setLanguage.actionTypes.INVOKED, this.fetchTranslations);
  }
}
