import {shallow} from "enzyme";
import * as React from "react";
import {AboutPage} from "./AboutPage";

describe("<AboutPage />", () => {

  const component = shallow(<AboutPage />);

  it("Renders header with text", () => {
    expect(component.find("h4")).toHaveText("About");
  });

});
