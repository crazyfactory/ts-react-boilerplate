import autobind from "autobind-decorator";
import {call, CallEffect, ForkEffect, put, PutEffect, takeLatest} from "redux-saga/effects";
import {getType} from "typesafe-actions";
import {loadStarsCount} from "../redux/modules/starsActionCreators";
import {BaseSaga} from "./BaseSaga";
import {dummyApi} from "./dummyApi";

export class StarsSaga extends BaseSaga {
  @autobind
  public *fetchStarsCount(): IterableIterator<CallEffect | PutEffect<any>> {
    try {
      yield put(loadStarsCount.setPending(null));
      const count = yield call(dummyApi.getStarsCount);
      yield put(loadStarsCount.setFulfilled(count));
    } catch (e) {
      yield put(loadStarsCount.setRejected(null, e.toString()));
    }
  }

  protected *registerListeners(): IterableIterator<ForkEffect> {
    yield takeLatest(getType(loadStarsCount.invoke), this.fetchStarsCount);
  }
}
