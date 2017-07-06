// import { renderComponent } from "../helpers/TestHelper";
import {shallow} from "enzyme";
import * as React from "react";
import {HomePage} from "./HomePage";
describe("<HomePage />", () => {

  const component = shallow(<HomePage />);

  it("matches snapshot", () => {
    expect(component).toMatchSnapshot();
  });
});
