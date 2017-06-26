import {shallow} from "enzyme";
import * as React from "react";
import {renderComponent} from "../helpers/TestHelper";
import {SWITCH_LANGUAGE} from "../redux/modules/languageModule";
import {About, UnconnectedAbout} from "./About";

describe("<About />", () => {

  const component = renderComponent(About, {language: {payload: {locale: "en"}}});

  it("Renders header with text", () => {
    expect(component.find("h4 FormattedMessage")).toHaveProp("id", "about.us");
  });

  it("Calls switchLanguage() when button is clicked", () => {
    const dispatch = jest.fn();
    const spy = jest.spyOn(UnconnectedAbout.prototype, "switchLanguage");
    const shallowComponent = shallow(<UnconnectedAbout dispatch={dispatch}/>);

    expect(shallowComponent.find("button")).toBeDefined();
    expect(spy).not.toHaveBeenCalled();
    shallowComponent.find("button").simulate("click");
    expect(spy).toHaveBeenCalled();
  });

  it("switchLanguage() dispatches SWITCH_LANGUAGE action to en-GB", () => {
    const dispatch = jest.fn();
    const shallowComponent = shallow(<UnconnectedAbout dispatch={dispatch} />);

    expect(dispatch).not.toHaveBeenCalled();
    (shallowComponent as any).instance().switchLanguage();
    expect(dispatch).toHaveBeenCalledWith({
      payload: "en-GB",
      type: SWITCH_LANGUAGE
    });
  });

  it("switchLanguage() dispatches SWITCH_LANGUAGE action to de", () => {
    const dispatch = jest.fn();
    const shallowComponent = shallow(<UnconnectedAbout dispatch={dispatch} locale="en-GB"/>);

    expect(dispatch).not.toHaveBeenCalled();
    (shallowComponent as any).instance().switchLanguage();
    expect(dispatch).toHaveBeenCalledWith({
      payload: "de",
      type: SWITCH_LANGUAGE
    });
  });

});
