import {shallow} from "enzyme";
import * as React from "react";
import {Header} from "./Header";

describe("<Header />", () => {
  const component = shallow(<Header />, {context: {router: {}}});

  it("matches snapshot", () => {
    expect(component).toMatchSnapshot();
  });
});
