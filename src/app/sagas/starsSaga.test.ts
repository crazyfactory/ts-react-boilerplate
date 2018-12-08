import {call, takeLatest} from "redux-saga/effects";
import {promiseAction} from "../helpers/promiseReducer";
import {LOAD_STARS} from "../redux/modules/starsModule";
import {dummyApi} from "./dummyApi";
import makeRequest from "./makeRequest";
import {fetchStars, watchStarsLoad} from "./starsSaga";

describe("starsSaga", () => {
  describe("fetchStars", () => {
    const gen = fetchStars();

    it("must call makeRequest of api.getStars", () => {
      expect(gen.next().value).toEqual(call(makeRequest, promiseAction(LOAD_STARS), dummyApi.getStars));
    });

    it("must be done", () => {
      expect(gen.next()).toEqual({done: true, value: undefined});
    });
  });

  describe("watchStarsLoad", () => {
    const gen = watchStarsLoad();

    it("should watch for LOAD_STARS action", () => {
      expect(gen.next().value).toEqual(takeLatest(LOAD_STARS, fetchStars));
    });

    it("must be done", () => {
      expect(gen.next()).toEqual({done: true, value: undefined});
    });
  });
});
