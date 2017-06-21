import {actionType, starsReducer} from "./starsModule";

describe("Stars Reducer", () => {

  it("handles action of type STARS_REQUEST", () => {
    const action = { type: actionType.PENDING };
    const stateBefore = {};
    const stateAfter = { payload: null };
    expect(starsReducer(stateBefore, action)).toEqual(stateAfter);
  });

  it("handles action of type STARS_SUCCESS", () => {
    const action = {
      payload: {
        stargazers_count: 99
      },
      type: actionType.SUCCESS
    };
    const stateBefore = {};
    const stateAfter = {
      payload: {
        stargazers_count: 99
      }
    };
    expect(starsReducer(stateBefore, action)).toEqual(stateAfter);
  });

  it("handles action of type STARS_FAILURE", () => {
    const action = { type: actionType.FAILURE };
    const stateBefore = {};
    const stateAfter = { error: true};
    expect(starsReducer(stateBefore, action)).toEqual(stateAfter);
  });

  it("handles actions with unknown type", () => {
    const action = { type: "" };
    const stateBefore = { payload: null };
    const stateAfter = { payload: null };
    expect(starsReducer(stateBefore, action)).toEqual(stateAfter);
  });

});
