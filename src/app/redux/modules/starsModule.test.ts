import {STARS_REQUEST, starsReducer} from "./starsModule";

describe("Stars Reducer", () => {

  it("handles action of type STARS_REQUEST_PENDING", () => {
    const action = {
      type: STARS_REQUEST + "_PENDING"
    };
    const stateBefore = {};
    const stateAfter = {
      isFetching: true
    };
    expect(starsReducer(stateBefore, action)).toEqual(stateAfter);
  });

  it("handles action of type STARS_REQUEST_FULFILLED", () => {
    const action = {
      payload: {
        stargazers_count: 99
      },
      type: STARS_REQUEST + "_FULFILLED"
    };
    const stateBefore = {};
    const stateAfter = {
      isFetching: false,
      payload: {
        stargazers_count: 99
      }
    };
    expect(starsReducer(stateBefore, action)).toEqual(stateAfter);
  });

  it("handles action of type STARS_REQUEST_REJECTED", () => {
    const action = {
      type: STARS_REQUEST + "_REJECTED"
    };
    const stateBefore = {};
    const stateAfter = {
      error: true,
      isFetching: false
    };
    expect(starsReducer(stateBefore, action)).toEqual(stateAfter);
  });

  it("handles actions with unknown type", () => {
    const action = {
      type: ""
    };
    const stateBefore = {
      isFetching: false
    };
    const stateAfter = {
      isFetching: false
    };
    expect(starsReducer(stateBefore, action)).toEqual(stateAfter);
  });

});
