import {call, takeLatest} from "redux-saga/effects";
import {LOAD_STARS, requestType} from "../redux/modules/starsModule";
import {dummyApi} from "./dummyApi";
import makeRequest from "./makeRequest";
import {fetchStars, watchStarsLoad} from "./starsSaga";

describe("starsSaga", () => {
  describe("fetchStars", () => {
    const gen = fetchStars();

    it("must call makeRequest of api.getStars", () => {
      expect(gen.next().value).toEqual(call(makeRequest, dummyApi.getStars, requestType));
    });

    it("must be done", () => {
      expect(gen.next()).toEqual({done: true, value: undefined});
    });
  });

  describe("watchStarsLoad", () => {
    const gen = watchStarsLoad();

    it("must call takeLatest of STARS_REQUEST", () => {
      expect(gen.next().value).toEqual(takeLatest(LOAD_STARS, fetchStars));
    });

    it("must be done", () => {
      expect(gen.next()).toEqual({done: true, value: undefined});
    });
  });
});
