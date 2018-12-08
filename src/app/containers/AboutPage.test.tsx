import {shallow} from "enzyme";
import * as React from "react";
import {invokeChangeLanguage, ISettingsState} from "../redux/modules/settingsModule";
import {mapDispatchToProps, mapStateToProps, UnconnectedAbout} from "./AboutPage";

/* tslint:disable:no-empty jsx-no-lambda */
describe("<AboutPage />", () => {
  const settings: ISettingsState = {
    error: "",
    language: "en-US",
    pending: false,
    translations: {"about.us": "About Us", "about.change": "Change", "current.language": "Current Language"}
  };

  const translations = {
    aboutUs: "About Us",
    change: "Change",
    currentLanguage: "Current Language"
  };

  it("maps state to props correctly", () => {
    const props = mapStateToProps({settings});
    expect(props.language).toEqual("en-US");
  });

  it("maps dispatch to props correctly", () => {
    const mockFn = jest.fn();
    const props = mapDispatchToProps(mockFn);
    expect(mockFn).not.toHaveBeenCalled();
    props.invokeChangeLanguage("de-DE");
    expect(mockFn).toHaveBeenCalledWith(invokeChangeLanguage("de-DE"));
  });

  it("calls invokeChangeLanguage() when button is clicked", () => {
    const mockFn = jest.fn();
    const shallowComponent = shallow(
      <UnconnectedAbout invokeChangeLanguage={mockFn} language="" translations={translations}/>
    );

    expect(shallowComponent.find("button")).toBeDefined();
    expect(mockFn).not.toHaveBeenCalled();
    shallowComponent.find("button").simulate("click");
    expect(mockFn).toHaveBeenCalled();
  });
});
