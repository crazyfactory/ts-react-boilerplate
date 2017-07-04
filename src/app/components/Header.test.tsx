import {shallow} from "enzyme";
import * as React from "react";
import configureRouter from "../routes/configureRouter";
import {Header, Styles} from "./Header";

describe("<Header />", () => {

  const component = shallow(<Header router={configureRouter(true)} />);

  it("Renders with correct style", () => {
    expect(component.find("nav")).toHaveClassName(Styles.nav);
  });

});
