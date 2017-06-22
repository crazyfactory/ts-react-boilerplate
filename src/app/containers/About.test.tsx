import {shallow} from "enzyme";
import * as React from "react";
import {About} from "./About";

describe("<About />", () => {

  const component = shallow(<About />);

  it("Renders header with text", () => {
    expect(component.find("FormattedMessage")).toHaveProp("id", "about");
  });

});
