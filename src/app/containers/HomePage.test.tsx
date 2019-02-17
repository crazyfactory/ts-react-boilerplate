import {shallow} from "enzyme";
import * as React from "react";
import {ISettingsState} from "../redux/modules/settingsModule";
import {mapStateToProps, UnconnectedHomePage} from "./HomePage";
describe("<HomePage />", () => {
  const translations = {
    hello: "Hello!"
  };

  it("maps state to props correctly", () => {
    const settings: ISettingsState = {
      error: "",
      language: "en",
      loaded: true,
      pending: false,
      translations: {Hello: "Hello!"}
    };
    const props = mapStateToProps({settings});
    expect(props).toEqual({
      translations: {
        hello: "Hello!"
      }
    });
  });

  it("says hello", () => {
    const wrapper = shallow(<UnconnectedHomePage translations={translations}/>);
    expect(wrapper.find("p")).toHaveText("Hello!");
  });
});
