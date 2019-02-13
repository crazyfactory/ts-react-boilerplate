import {shallow} from "enzyme";
import * as React from "react";
import {HomePage} from "./HomePage";
describe("<HomePage />", () => {
  it("says hello", () => {
    const wrapper = shallow(<HomePage/>);
    expect(wrapper.find("p")).toHaveText("Hello");
  });
});
