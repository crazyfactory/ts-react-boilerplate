import {IAction, IState} from "./baseModule";
import {IStars, LOAD_STARS, loadStars, requestType, starsReducer} from "./starsModule";

describe("starsModule", () => {
  describe("reducer", () => {
    it("returns initial state with default language", () => {
      const initialState: IState<IStars> = {
        isFetching: true,
        payload: {
          stargazers_count: -1
        }
      };
      expect(starsReducer(undefined, {type: undefined})).toEqual(initialState);
    });

    it("handles action of type STARS_REQUEST", () => {
      const action = {type: requestType.PENDING};
      const stateBefore: IState<IStars> = {isFetching: false, payload: null};
      const stateAfter: IState<IStars> = {isFetching: true, payload: null};
      expect(starsReducer(stateBefore, action)).toEqual(stateAfter);
    });

    it("handles action of type STARS_SUCCESS", () => {
      const action: IAction<IStars> = {
        payload: {
          stargazers_count: 99
        },
        type: requestType.SUCCESS
      };
      const stateBefore: IState<IStars> = {isFetching: true, payload: null};
      const stateAfter: IState<IStars> = {
        isFetching: false,
        payload: {
          stargazers_count: 99
        }
      };
      expect(starsReducer(stateBefore, action)).toEqual(stateAfter);
    });

    it("handles action of type STARS_FAILURE", () => {
      const action: IAction<IStars> = {type: requestType.FAILURE, message: "error!"};
      const stateBefore: IState<IStars> = {isFetching: true, payload: null};
      const stateAfter: IState<IStars> = {error: true, isFetching: false, message: "error!", payload: null};
      expect(starsReducer(stateBefore, action)).toEqual(stateAfter);
    });

    it("handles actions with unknown type", () => {
      const action: IAction<IStars> = {type: ""};
      const stateBefore: IState<IStars> = {isFetching: false, payload: null};
      const stateAfter: IState<IStars> = {isFetching: false, payload: null};
      expect(starsReducer(stateBefore, action)).toEqual(stateAfter);
    });
  });

  describe("action creator", () => {
    describe("loadStars()", () => {
      it("creates correct action", () => {
        const expectedValue: IAction<IStars> = {
          type: LOAD_STARS
        };
        expect(loadStars()).toEqual(expectedValue);
      });
    });
  });
});
