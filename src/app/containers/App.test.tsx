import {shallow} from "enzyme";
import * as React from "react";
import { App, Styles } from "./App";

describe("<App />", () => {

  const component = shallow(<App />);

  it("Renders with correct style", () => {
    expect(component.is(`.${Styles.container}`)).toBeTruthy();
  });

});
