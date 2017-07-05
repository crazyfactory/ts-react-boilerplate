import {shallow} from "enzyme";
import * as React from "react";
import {Header, Styles} from "./Header";

describe("<Header />", () => {
  const component = shallow(<Header />);

  it("Renders with correct style", () => {
    expect(component.find("nav")).toHaveClassName(Styles.nav);
  });

});
