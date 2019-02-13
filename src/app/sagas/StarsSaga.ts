import autobind from "autobind-decorator";
import {call, CallEffect, ForkEffect, put, PutEffect, takeLatest} from "redux-saga/effects";
import {loadStarsCount} from "../redux/modules/starsModule";
import {BaseSaga} from "./BaseSaga";
import {dummyApi} from "./dummyApi";

export class StarsSaga extends BaseSaga {
  @autobind
  public *fetchStarsCount(): IterableIterator<CallEffect | PutEffect<any>> {
    try {
      yield put(loadStarsCount.setPending(null));
      const translations = yield call(dummyApi.getStarsCount);
      yield put(loadStarsCount.setFulfilled(translations));
    } catch (e) {
      yield put(loadStarsCount.setRejected(e.toString()));
    }
  }

  protected *registerListeners(): IterableIterator<ForkEffect> {
    yield takeLatest(loadStarsCount.actionTypes.INVOKED, this.fetchStarsCount);
  }
}
