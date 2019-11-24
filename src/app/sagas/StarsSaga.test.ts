jest.mock("./dummyApi");
import {runSaga} from "redux-saga";
import {dummyApi} from "./dummyApi";
import {StarsSaga} from "./StarsSaga";

describe("StarsSaga", () => {
  describe("fetchStarsCount", () => {
    it("gets stars count and sets fulfilled", () => {
      expect.assertions(1);
      const dispatched = [];
      (dummyApi as any).getStarsCount.mockResolvedValue(10);
      return runSaga(
        {
          dispatch: (action) => dispatched.push(action)
        },
        (new StarsSaga()).fetchStarsCount
      ).toPromise().then(() => {
        expect(dispatched).toEqual([
          {payload: null, type: "STARS/LOAD_STARS_COUNT_PENDING"},
          {payload: 10, type: "STARS/LOAD_STARS_COUNT_FULFILLED"}
        ]);
      });
    });

    it("gets rejected and sets rejected", () => {
      expect.assertions(1);
      const dispatched = [];
      (dummyApi as any).getStarsCount.mockRejectedValue("Error");
      return runSaga(
        {
          dispatch: (action) => dispatched.push(action)
        },
        (new StarsSaga()).fetchStarsCount
      ).toPromise().then(() => {
        expect(dispatched).toEqual([
          {payload: null, type: "STARS/LOAD_STARS_COUNT_PENDING"},
          {message: "Error", payload: null, type: "STARS/LOAD_STARS_COUNT_REJECTED"}
        ]);
      });
    });
  });
});
