import {shallow} from "enzyme";
import * as React from "react";
import {renderComponent} from "../helpers/TestHelper";
import {IStore} from "../redux/IStore";
import {IAction} from "../redux/modules/baseModule";
import {IStars, LOAD_STARS} from "../redux/modules/starsModule";
import {Stars, UnconnectedStars} from "./Stars";

describe("<Stars />", () => {
  it("renders stars", () => {
    const state: Partial<IStore> = {
      stars: {
        isFetching: false,
        payload: {
          stargazers_count: 61
        }
      }
    };

    const component = renderComponent(Stars, state);
    expect(component.find("div")).toHaveText("61");
  });

  it("renders fetching", () => {
    const state: Partial<IStore> = {
      stars: {
        isFetching: true,
        payload: {
          stargazers_count: -1
        }
      }
    };

    const component = renderComponent(Stars, state);
    expect(component.find("div")).toHaveText("Fetching Stars..");
  });

  it("dispatches LOAD_STARS action before rendering if stargazers_count === -1", () => {
    const dispatch = jest.fn();
    const expectedValue: IAction<IStars> = {
      type: LOAD_STARS
    };
    expect(dispatch).not.toHaveBeenCalled();
    shallow(<UnconnectedStars dispatch={dispatch} isFetching={false} stargazers_count={-1}/>);
    expect(dispatch).toHaveBeenCalledWith(expectedValue);
  });

  it("does not dispatch LOAD_STARS action before rendering if stargazers_count !== -1", () => {
    const dispatch = jest.fn();
    shallow(<UnconnectedStars dispatch={dispatch} isFetching={false} stargazers_count={10}/>);
    expect(dispatch).not.toHaveBeenCalled();
  });
});
