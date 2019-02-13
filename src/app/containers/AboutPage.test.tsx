import {shallow} from "enzyme";
import * as React from "react";
import {ISettingsState, setLanguage as setLanguageActionCreator} from "../redux/modules/settingsModule";
import {mapDispatchToProps, mapStateToProps, UnconnectedAbout} from "./AboutPage";

/* tslint:disable:no-empty jsx-no-lambda */
describe("<AboutPage />", () => {
  const settings: ISettingsState = {
    error: "",
    language: "en",
    loaded: true,
    pending: false,
    translations: {"About us": "About Us", "Change language": "Change", "Current language": "Current Language"}
  };

  const translations = {
    aboutUs: "About Us",
    change: "Change",
    currentLanguage: "Current Language"
  };

  it("maps state to props correctly", () => {
    const props = mapStateToProps({settings});
    expect(props.language).toBe("en");
    expect(props.translations).toEqual(translations);
  });

  it("maps dispatch to props correctly", () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(dispatch).not.toHaveBeenCalled();
    props.setLanguage("de");
    expect(dispatch).toHaveBeenCalledWith(setLanguageActionCreator.invoke("de"));
  });

  it("calls setLanguage() to de", () => {
    const setLanguage = jest.fn();
    const wrapper = shallow(
      <UnconnectedAbout setLanguage={setLanguage} language="en" translations={translations}/>
    );
    expect(wrapper.find("button")).toBeDefined();
    expect(setLanguage).not.toHaveBeenCalled();
    wrapper.find("button").simulate("click");
    expect(setLanguage).toHaveBeenCalledWith("de");
  });

  it("calls setLanguage() to en", () => {
    const setLanguage = jest.fn();
    const wrapper = shallow(
      <UnconnectedAbout setLanguage={setLanguage} language="de" translations={translations}/>
    );
    expect(wrapper.find("button")).toBeDefined();
    expect(setLanguage).not.toHaveBeenCalled();
    wrapper.find("button").simulate("click");
    expect(setLanguage).toHaveBeenCalledWith("en");
  });
});
