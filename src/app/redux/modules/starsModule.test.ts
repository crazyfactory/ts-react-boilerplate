import {promiseAction} from "../../helpers/promiseReducer";
import {IAction, IState} from "./baseModule";
import {IStars, LOAD_STARS, loadStarsCount, starsReducer} from "./starsModule";

describe("starsModule", () => {
  describe("reducer", () => {
    it("returns initial state when state and action type are undefined", () => {
      const initialState: IState<IStars> = {
        isFetching: true,
        payload: {
          stargazers_count: -1
        }
      };
      expect(starsReducer(undefined, {type: undefined})).toEqual(initialState);
    });

    it("handles action of type LOAD_STARS", () => {
      const action = {type: LOAD_STARS};
      const stateBeforeAndAfter: IState<IStars> = {isFetching: false, payload: {stargazers_count: 100}};
      expect(starsReducer(stateBeforeAndAfter, action)).toEqual(stateBeforeAndAfter);
    });

    it("handles action of type LOAD_STARS_PENDING", () => {
      const action = {type: promiseAction(LOAD_STARS).PENDING};
      const stateBefore: IState<IStars> = {isFetching: false, payload: null};
      const stateAfter: IState<IStars> = {isFetching: true, payload: null};
      expect(starsReducer(stateBefore, action)).toEqual(stateAfter);
    });

    it("handles action of type LOAD_STARS_FULFILLED", () => {
      const action: IAction<IStars> = {
        payload: {
          stargazers_count: 99
        },
        type: promiseAction(LOAD_STARS).FULFILLED
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

    it("handles action of type LOAD_STARS_REJECTED", () => {
      const action: IAction<IStars> = {type: promiseAction(LOAD_STARS).REJECTED, message: "error!"};
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
        expect(loadStarsCount()).toEqual(expectedValue);
      });
    });
  });
});
