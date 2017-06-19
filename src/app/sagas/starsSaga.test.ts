import {call, takeLatest} from "redux-saga/effects";
import {STARS_FAILURE, STARS_REQUEST, STARS_SUCCESS} from "../redux/modules/starsModule";
import makeRequest from "./makeRequest";
import {fetchStars, watchStarsLoad} from "./starsSaga";
import TestApi from "./TestApi";

describe("starsSaga", () => {
  describe("fetchStars", () => {
    const gen = fetchStars();

    it("must call makeRequest of api.getStars", () => {
      const api = new TestApi();
      expect(gen.next().value).toEqual(call(makeRequest, api.getStars, STARS_SUCCESS, STARS_FAILURE));
    });

    it("must be done", () => {
      expect(gen.next()).toEqual({done: true, value: undefined});
    });
  });

  describe("watchStarsLoad", () => {
    const gen = watchStarsLoad();

    it("must call takeLatest of STARS_REQUEST", () => {
      expect(gen.next().value).toEqual(takeLatest(STARS_REQUEST, fetchStars));
    });

    it("must be done", () => {
      expect(gen.next()).toEqual({done: true, value: undefined});
    });
  });
});
