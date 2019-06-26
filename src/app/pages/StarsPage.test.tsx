import {shallow} from "enzyme";
import * as React from "react";
import {ISettingsState} from "../redux/modules/settingsModule";
import {loadStarsCount} from "../redux/modules/starsActionCreators";
import {IStarsState} from "../redux/modules/starsModule";
import {mapDispatchToProps, mapStateToProps, UnconnectedStarsPage} from "./StarsPage";

describe("<Stars />", () => {
  const translations = {
    fetchingStars: "Fetching Stars..."
  };

  it("maps state to props correctly", () => {
    const settings: ISettingsState = {
      error: "",
      language: "en",
      loaded: true,
      pending: false,
      translations: {"Fetching stars...": "Fetching Stars..."}
    };
    const stars: IStarsState = {
      count: 100,
      error: "",
      loaded: true,
      pending: false
    };
    const props = mapStateToProps({settings, stars});
    expect(props).toEqual({
      count: 100,
      error: "",
      loaded: true,
      pending: false,
      translations
    });
  });

  it("maps dispatch to props correctly", () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(dispatch).not.toHaveBeenCalledWith(loadStarsCount.invoke(null));
    props.loadStarsCount();
    expect(dispatch).toHaveBeenCalledWith(loadStarsCount.invoke(null));
  });

  it("dispatches loadStars action before rendering if loaded is false", () => {
    const loadStars = jest.fn();
    expect(loadStars).not.toHaveBeenCalled();
    shallow(
      <UnconnectedStarsPage
        count={0}
        error={""}
        loaded={false}
        loadStarsCount={loadStars}
        pending={false}
        translations={translations}
      />
    );
    expect(loadStars).toHaveBeenCalled();
  });

  it("does not dispatch loadStars action before rendering if loaded is true", () => {
    const loadStars = jest.fn();
    shallow(
      <UnconnectedStarsPage
        count={0}
        error={""}
        loaded={true}
        loadStarsCount={loadStars}
        pending={false}
        translations={translations}
      />
    );
    expect(loadStars).not.toHaveBeenCalled();
  });

  it("shows fetching if pending is true", () => {
    const wrapper = shallow(
      <UnconnectedStarsPage
        count={0}
        error={""}
        loaded={false}
        loadStarsCount={jest.fn()}
        pending={true}
        translations={translations}
      />
    );
    expect(wrapper.containsMatchingElement(<div>Fetching Stars...</div>)).toBeTruthy();
  });

  it("shows error if error is not empty", () => {
    const wrapper = shallow(
      <UnconnectedStarsPage
        count={0}
        error={"Error"}
        loaded={true}
        loadStarsCount={jest.fn()}
        pending={false}
        translations={translations}
      />
    );
    expect(wrapper.containsMatchingElement(<div>Error</div>)).toBeTruthy();
  });

  it("shows stars count", () => {
    const count = 5;
    const wrapper = shallow(
      <UnconnectedStarsPage
        count={count}
        error={""}
        loaded={true}
        loadStarsCount={jest.fn()}
        pending={false}
        translations={translations}
      />
    );
    expect(wrapper.containsMatchingElement(<div>{count}</div>)).toBeTruthy();
  });
});
