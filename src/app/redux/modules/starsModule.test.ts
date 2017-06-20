import {STARS_FAILURE, STARS_REQUEST, STARS_SUCCESS, starsReducer} from "./starsModule";

describe("Stars Reducer", () => {

  it("handles action of type STARS_REQUEST", () => {
    const action = { type: STARS_REQUEST };
    const stateBefore = {};
    const stateAfter = { isFetching: true };
    expect(starsReducer(stateBefore, action)).toEqual(stateAfter);
  });

  it("handles action of type STARS_SUCCESS", () => {
    const action = {
      payload: {
        stargazers_count: 99
      },
      type: STARS_SUCCESS
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

  it("handles action of type STARS_FAILURE", () => {
    const action = { type: STARS_FAILURE };
    const stateBefore = {};
    const stateAfter = { error: true, isFetching: false };
    expect(starsReducer(stateBefore, action)).toEqual(stateAfter);
  });

  it("handles actions with unknown type", () => {
    const action = { type: "" };
    const stateBefore = { isFetching: false };
    const stateAfter = { isFetching: false };
    expect(starsReducer(stateBefore, action)).toEqual(stateAfter);
  });

});
