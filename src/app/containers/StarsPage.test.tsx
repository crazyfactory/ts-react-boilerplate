import {shallow} from "enzyme";
import * as React from "react";
import {IStarsState, loadStarsCount} from "../redux/modules/starsModule";
import {mapDispatchToProps, mapStateToProps, UnconnectedStars} from "./StarsPage";

describe("<Stars />", () => {
  it("maps state to props correctly", () => {
    const stars: IStarsState = {
      count: 100,
      error: "",
      loaded: true,
      pending: false
    };
    const props = mapStateToProps({stars});
    expect(props).toEqual({
      count: 100,
      error: "",
      loaded: true,
      pending: false
    });
  });

  it("maps dispatch to props correctly", () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.loadStarsCount();
    expect(dispatch).toHaveBeenCalledWith(loadStarsCount.invoke(null));
  });

  it("dispatches loadStars action before rendering if loaded is false", () => {
    const loadStars = jest.fn();
    expect(loadStars).not.toHaveBeenCalled();
    shallow(<UnconnectedStars count={0} error={""} loaded={false} loadStarsCount={loadStars} pending={false}/>);
    expect(loadStars).toHaveBeenCalled();
  });

  it("does not dispatch loadStars action before rendering if loaded is true", () => {
    const loadStars = jest.fn();
    shallow(<UnconnectedStars count={0} error={""} loaded={true} loadStarsCount={loadStars} pending={false}/>);
    expect(loadStars).not.toHaveBeenCalled();
  });

  it("shows fetching if pending is true", () => {
    const wrapper = shallow(
      <UnconnectedStars count={0} error={""} loaded={false} loadStarsCount={jest.fn()} pending={true}/>
    );
    expect(wrapper.containsMatchingElement(<div>Fetching stars...</div>)).toBeTruthy();
  });

  it("shows error if error is not empty", () => {
    const wrapper = shallow(
      <UnconnectedStars count={0} error={"an error"} loaded={true} loadStarsCount={jest.fn()} pending={false}/>
    );
    expect(wrapper.containsMatchingElement(<div>an error</div>)).toBeTruthy();
  });

  it("shows stars count", () => {
    const count = 5;
    const wrapper = shallow(
      <UnconnectedStars count={count} error={""} loaded={true} loadStarsCount={jest.fn()} pending={false}/>
    );
    expect(wrapper.containsMatchingElement(<div>{count}</div>)).toBeTruthy();
  });
});
